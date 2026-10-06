const ActiveSessionModel = require("../models/ActiveSession/ActiveSessionModel");

var cron = require("node-cron");

cron.schedule("*/15 * * * *", async () => {
  try {
    const now = new Date();

    await ActiveSessionModel.deleteMany({ expiresAt: { $lte: now } });

    console.log("Clearing of expired active session is done successfully.");
  } catch (error) {
    console.error("Error clearing models of active sessions: ", error?.message);
  }
});
