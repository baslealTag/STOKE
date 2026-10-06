const AuditLog = require("../models/Audit/AuditLogModel");

const xss = require("xss");
const formidable = require("formidable");
const { StatusCodes } = require("http-status-codes");
const responselanguage = require("../utils/responseLang");

const ONE_GB = 1024 * 1024 * 1024;
const PARAM_LIMIT = 1_000_000;

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

  if (Array.isArray(input)) {
    return input.map(deepSanitize);
  }

  if (typeof input === "object") {
    const out = {};
    for (const [k, v] of Object.entries(input)) {
      out[k] = deepSanitize(v);
    }
    return out;
  }

  return input;
}

function sanitizeFields(fields, sensitiveKeys = ["password"]) {
  if (!fields || typeof fields !== "object") return fields;
  const sanitized = { ...fields };

  sensitiveKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(sanitized, key)) {
      sanitized[key] = "";
    }
  });
  return sanitized;
}

function logRequest(req, res, fields, files = null) {
  const user = req?.user ? req?.user?.id : null;
  const ipAddress = req?.ip;
  const action = `Method: ${req?.method}, Original-URL: ${req?.originalUrl}`;
  const params = req?.params ? JSON.stringify(req?.params) : null;
  const details = JSON.stringify({ fields, files });
  const requestPath = req?.path;

  const logEntry = new AuditLog({
    user_id: user,
    action,
    params,
    details,
    ipAddress,
    requestPath,
  });

  logEntry.save().catch((error) => {
    console.error("Audit log save error:", error);
  });
}

const auditLogMiddleware = (req, res, next) => {
  if (req?.method === "GET" || req?.path === "/nfd_api/user_api/login_user") {
    return next();
  }

  const logCompletion = () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const sanitizedBody = req?.formFields
        ? sanitizeFields(req?.formFields)
        : sanitizeFields(req?.body);
      const files = req?.formFiles || null;
      logRequest(req, res, sanitizedBody, files);
    }
  };

  if (
    req?.headers["content-type"]?.includes("multipart/form-data") ||
    req?.headers["Content-Type"]?.includes("multipart/form-data")
  ) {
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
      allowEmptyFiles: true,
      maxFileSize: ONE_GB, // per file
      maxTotalFileSize: ONE_GB, // total
      maxFields: PARAM_LIMIT, // max non-file fields
      maxFieldsSize: ONE_GB,
      maxFieldSize: ONE_GB,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(responselanguage?.data_parsing_error);
      }

      req.formFields = fields;
      req.formFiles = files;

      const hasFields =
        req.formFields &&
        ((Array.isArray(req.formFields) && req.formFields.length > 0) ||
          (typeof req.formFields === "object" &&
            Object.keys(req.formFields).length > 0) ||
          (typeof req.formFields === "string" &&
            req.formFields.trim().length > 0));

      if (hasFields) {
        try {
          req.formFields = deepSanitize(req.formFields);
        } catch (_) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(responselanguage?.invalid_request);
        }
      }

      res.on("finish", logCompletion);
      next();
    });
  } else {
    res.on("finish", logCompletion);
    next();
  }
};

module.exports = auditLogMiddleware;
