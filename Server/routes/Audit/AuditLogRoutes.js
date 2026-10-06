const express = require("express");
const router = express.Router();

const checkTokenExpiration  = require("../../middlewares/verifyToken");
const apiKeyMiddleware       = require("../../middlewares/checkKey");
const { checkOrPermissions } = require("../../middlewares/permissions");

const {
  getAuditLogs,
  getAuditLog,
  getAuditLogAnalytics,
} = require("../../controllers/AuditLog/AuditLogController");

// GET /nfd_api/audit_api/all  – paginated list of audit logs
router.get(
  "/all",
  apiKeyMiddleware("GET_AUDITLGS_API"),
  checkTokenExpiration,
  checkOrPermissions(["audit_view", "audit_admin"]),
  getAuditLogs
);

// GET /nfd_api/audit_api/analytics
router.get(
  "/analytics",
  apiKeyMiddleware("GET_AUDITLGS_API"),
  checkTokenExpiration,
  checkOrPermissions(["audit_analytics", "audit_admin"]),
  getAuditLogAnalytics
);

// GET /nfd_api/audit_api/:id  – single audit log entry
router.get(
  "/:id",
  apiKeyMiddleware("GET_AUDITLG_API"),
  checkTokenExpiration,
  checkOrPermissions(["audit_view", "audit_admin"]),
  getAuditLog
);

module.exports = router;
