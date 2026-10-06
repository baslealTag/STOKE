const multilingualRequired = {
  en: { type: String, required: true, trim: true },
  am: { type: String, required: true, trim: true },
};

const multilingualOptional = {
  en: { type: String, required: false, trim: true },
  am: { type: String, required: false, trim: true },
};

module.exports = { multilingualRequired, multilingualOptional };
