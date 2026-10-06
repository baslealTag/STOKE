const crypto = require("crypto");

const hash = (secret, value) =>
  crypto
    .createHmac("sha256", secret)
    .update(String(value || ""))
    .digest("hex");

function fingerprintUA(req) {
  const ua = req.headers["user-agent"] || "unknown";
  return ua;
}

function labelDevice(ua = "") {
  if (/iphone|ipad|ios/i.test(ua)) return "iOS device";
  if (/android/i.test(ua)) return "Android device";
  if (/windows/i.test(ua)) return "Windows";
  if (/macintosh|mac os/i.test(ua)) return "macOS";
  return "Unknown device";
}

function getClientIP(req) {
  return req.ip || req.connection?.remoteAddress || "0.0.0.0";
}

function sessionHashes(req) {
  const secret = process.env.SESSION_HASH_SECRET || "dev-secret";
  const ua = fingerprintUA(req);
  const ip = getClientIP(req);
  return {
    uaRaw: ua,
    ipRaw: ip,
    uaHash: hash(secret, ua),
    ipHash:
      process.env.BIND_IP_STRICT === "true"
        ? hash(secret, ip)
        : hash(secret, "no-bind"),
  };
}

module.exports = { sessionHashes, labelDevice, fingerprintUA, getClientIP };