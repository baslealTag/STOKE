// utils/multilingual.js

// ---------------------------------------------------------
// 1. Config
// ---------------------------------------------------------
const LANG_KEYS = ["en", "am"];

const LANG_LABELS = {
  en: { en: "English", am: "እንግሊዝኛ" },
  am: { en: "Amharic", am: "አማርኛ" },
};

const FIELD_LABELS = {
  companyName: { en: "Company name", am: "የኩባንያው ስም" },
  supplierAddress: { en: "Supplier address", am: "የአቅራቢው አድራሻ" },
};

// ---------------------------------------------------------
// 2. Extract multilingual values from form fields
//    Supports: nested, dot notation, bracket notation
// ---------------------------------------------------------
function extractMultilingual(fields, fieldName, langs = LANG_KEYS) {
  const result = {};

  for (const lang of langs) {
    if (
      lang === "__proto__" ||
      lang === "constructor" ||
      lang === "prototype"
    ) {
      continue;
    }

    const candidates = [
      fields?.[fieldName]?.[lang], // nested object
      fields?.[`${fieldName}.${lang}`], // dot notation
      fields?.[`${fieldName}[${lang}]`], // bracket notation
    ];

    const raw = candidates.find((c) => c !== undefined);
    const value = Array.isArray(raw) ? raw[0] : raw;

    if (typeof value === "string" && value.trim()) {
      result[lang] = value.trim();
    }
  }

  return result;
}

// ---------------------------------------------------------
// 3. Validate that all required languages are present
// ---------------------------------------------------------
function validateRequiredMultilingual(value, langs = LANG_KEYS) {
  const missing = langs.filter((l) => !value?.[l]);
  return { ok: missing.length === 0, missing };
}

// ---------------------------------------------------------
// 4. Merge existing multilingual with incoming (partial update)
// ---------------------------------------------------------
function mergeMultilingual(existing = {}, incoming = {}, langs = LANG_KEYS) {
  const merged = {};
  for (const lang of langs) {
    const next = incoming[lang] ?? existing?.[lang];
    if (typeof next === "string" && next.trim()) {
      merged[lang] = next.trim();
    }
  }
  return merged;
}

// ---------------------------------------------------------
// 5. Pretty label helpers
// ---------------------------------------------------------
function prettyLangList(langs, displayLang = "en") {
  return langs.map((l) => LANG_LABELS[l]?.[displayLang] || l).join(", ");
}

function multilingualMessage(field, missing, displayLang) {
  const label = FIELD_LABELS[field]?.[displayLang] || field;
  const langs = prettyLangList(missing, displayLang);

  if (displayLang === "am") {
    return `${label} በሚከተሉት ቋንቋዎች ያስፈልጋል፦ ${langs}።`;
  }
  return `${label} is required in: ${langs}.`;
}

// ---------------------------------------------------------
// 6. buildMultilingualError  ← THIS is the one you asked about
// ---------------------------------------------------------
function buildMultilingualError(field, missing) {
  return {
    field,
    missingLanguages: missing,
    Message_en: multilingualMessage(field, missing, "en"),
    Message_am: multilingualMessage(field, missing, "am"),
  };
}

// ---------------------------------------------------------
// 7. Exports
// ---------------------------------------------------------
module.exports = {
  LANG_KEYS,
  LANG_LABELS,
  FIELD_LABELS,
  extractMultilingual,
  validateRequiredMultilingual,
  mergeMultilingual,
  prettyLangList,
  multilingualMessage,
  buildMultilingualError,
};
