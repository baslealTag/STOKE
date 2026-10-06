// utils/dateUtils.js (NEW)
const ethiopianDate = require("ethiopian-date");

function formatEthiopianDate(gregorianDate) {
  try {
    const date = new Date(gregorianDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const etDate = ethiopianDate.toEthiopian(year, month, day);
    return `${etDate[2].toString().padStart(2, "0")}/${etDate[1].toString().padStart(2, "0")}/${etDate[0]}`;
  } catch (e) {
    return new Date(gregorianDate).toISOString().split("T")[0];
  }
}

function currentDateFormated() {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day?.toString().padStart(2, "0")}/${month?.toString()?.padStart(2, "0")}/${year}`;
  } catch (error) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day?.toString().padStart(2, "0")}/${month?.toString()?.padStart(2, "0")}/${year}`;
  }
}

module.exports = { formatEthiopianDate, currentDateFormated };
