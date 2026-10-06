function convertToInternational(phoneNumber) {
  let number = phoneNumber.toString().trim();

  number = number.replace(/[^0-9]/g, "");

  if (number.startsWith("0")) {
    number = "251" + number.slice(1);
  } else if (number.startsWith("251")) {
    return number;
  } else if (number.startsWith("+251")) {
    number = number.replace("+", "");
  } else if (number.startsWith("9") && number.length === 9) {
    number = "251" + number;
  }

  return number;
}

module.exports = {
  convertToInternational,
};
