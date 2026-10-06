const { user_phone_format } = require("./responseLang");

function validateAndNormalizeEthiopianPhone(phone) {
  const regex = /^(\+251\d{9}|0\d{9})$/;

  const wrongPhoneMsg = user_phone_format(phone);

  if (!regex.test(phone)) {
    return {
      status: "error",
      wrongPhoneMsg,
    };
  }

  let normalized = phone;
  if (phone.startsWith("0")) {
    normalized = "+251" + phone.slice(1);
  }

  return { status: "success", normalized };
}

module.exports = { validateAndNormalizeEthiopianPhone };
