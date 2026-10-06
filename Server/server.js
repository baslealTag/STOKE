require("dotenv").config();
const express = require("express");
const app = express();
const xss = require("xss");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const rateLimitMiddleware = require("./middlewares/rateMiddleware");

const { invalid_input_main } = require("./utils/responseLang");

process.env.TZ = "Africa/Addis_Ababa";
const NODE_ENV = process.env.NODE_ENV || "development";

const BODY_LIMIT = "1000mb";
const PARAM_LIMIT = 1_000_000;

const allowedOrigins = [
  `${process.env.FRONT_END_HOST}`,
  `${process.env.FRONT_END_HOSTWW}`,
  `${process.env.FRONT_END_HOST_CUS}`,
  `${process.env.FRONT_END_HOSTWW_CUS}`,
  `http://localhost:5174`,
];

app.disable("x-powered-by");
app.set("trust proxy", 1);

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   if (NODE_ENV === "production" && !req.secure) {
//     return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
//   }
//   next();
// });

const cspDirectives = {
  useDefaults: true,
  directives: {
    "default-src": ["'self'"],
    "script-src": ["'self'"],
    "style-src": ["'self'", "'unsafe-inline'"],

    // NOTE: CSP here still uses env allowedOrigins (kept as-is)
    "img-src": ["'self'", ...allowedOrigins],
    "font-src": ["'self'", "https:", "data:"],
    "connect-src": ["'self'", ...allowedOrigins, "wss:", "https:"],
    "frame-src": allowedOrigins.length ? allowedOrigins : ["'self'"],
    "frame-ancestors": ["'self'", ...allowedOrigins],

    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
  },
};

app.use(
  helmet({
    contentSecurityPolicy: cspDirectives,
    hsts: {
      maxAge: 60 * 60 * 24 * 365,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: false,
    noSniff: true,
    referrerPolicy: { policy: "no-referrer" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  }),
);

app.use((_, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use(express.static("Media"));
app.use("/Media/", express.static("Media"));
app.use(
  express.json({
    limit: BODY_LIMIT,
    strict: true,
    inflate: true,
    type: "application/json",
  }),
);
app.use(
  express.urlencoded({
    limit: BODY_LIMIT,
    extended: true,
    parameterLimit: PARAM_LIMIT,
    inflate: true,
  }),
);

const PORT = process.env.PORT;

connectDB();

const xssFilter = new xss.FilterXSS({
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style", "iframe", "object", "embed"],
});

function deepSanitize(input) {
  if (input == null) return input;
  if (typeof input === "string") {
    const normalized = input.normalize("NFKC").trim();
    return xssFilter.process(normalized);
  }
  if (Array.isArray(input)) return input.map(deepSanitize);
  if (typeof input === "object") {
    const out = {};
    for (const [k, v] of Object.entries(input)) out[k] = deepSanitize(v);
    return out;
  }
  return input;
}

function sanitizeIncomingPayload(req, res, next) {
  try {
    if (req.body) req.body = deepSanitize(req.body);
    if (req.query) req.query = deepSanitize(req.query);
    if (req.params) req.params = deepSanitize(req.params);
    next();
  } catch (e) {
    return res.status(400).json(invalid_input_main);
  }
}

app.use(sanitizeIncomingPayload);

app.use(rateLimitMiddleware);

// ── Active Routes ────────────────────────────────────────────────────────────
app.use("/stoke_api/user_api", require("./routes/User/UserRoutes"));
app.use("/stoke_api/group_api", require("./routes/Group/GroupRoutes"));
app.use("/stoke_api/perm_api", require("./routes/Permission/PermissionRoutes"));
app.use(
  "/stoke_api/permcategory_api",
  require("./routes/PermissionCategory/PermissionCategoryRoutes"),
);

app.use("/stoke_api/audit_api", require("./routes/Audit/AuditLogRoutes"));
app.use(
  "/stoke_api/product_category",
  require("./routes/PermissionCategory/PermissionCategoryRoutes"),
);

app.use(
  "/stoke_api/weight_type",
  require("./routes/WeightType/WeightTypeRoute"),
);
app.use("/stoke_api/warehouse", require("./routes/wareHouse/WarfeHouseRouter"));
app.use("/stoke_api/supplier", require("./routes/Supplier/SupplierRouter"));
app.use("/stoke_api/stoke", require("./routes/Stoke/StokeRouter"));

app.use("/stoke/api", require("./routes/Product/ProductRoute"));
app.use((req, res) => {
  return res.status(404).json({
    Message_en: "The requested route is not found.",
    Message_am: "የተጠየቀው አድራሻ (Route) አልተገኘም።",
  });
});

require("./utils/Schedulers");

mongoose.connection.once("open", () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database connected successfully.");
  } catch (error) {
    console.log(error?.message);
  }
});
