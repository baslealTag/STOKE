const multilingualRequired = {
  am: { type: String, required: true, trim: true }, // Amharic
  en: { type: String, required: true, trim: true }, // English
  or: { type: String, required: true, trim: true }, // Afaan Oromo
  ti: { type: String, required: true, trim: true }, // Tigrigna
  so: { type: String, required: true, trim: true }, // Af-Somali
  aa: { type: String, required: true, trim: true }, // Afaregna
};

const multilingualOptional = {
  am: { type: String, required: false, trim: true }, // Amharic
  en: { type: String, required: false, trim: true }, // English
  or: { type: String, required: false, trim: true }, // Afaan Oromo
  ti: { type: String, required: false, trim: true }, // Tigrigna
  so: { type: String, required: false, trim: true }, // Af-Somali
  aa: { type: String, required: false, trim: true }, // Afaregna
};

module.exports = {
  multilingualRequired,
  multilingualOptional,
};
