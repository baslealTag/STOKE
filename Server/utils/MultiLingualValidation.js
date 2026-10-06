const DEFAULT_LANGS = ["en", "am"];

const isValidString = (str) => typeof str === "string" && str.trim().length > 0;

const parseMultilingual = (raw) => {
  if (raw === undefined || raw === null || raw === "") return null;
  if (typeof raw === "object") return raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return typeof parsed === "object" && parsed !== null ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
};

const normalizeRequiredMultilingual = (raw, langs = DEFAULT_LANGS) => {
  const parsed = parseMultilingual(raw);
  if (!parsed) return { ok: false, missingLang: null };
  const normalized = {};
  for (const lang of langs) {
    const val = parsed[lang];
    if (!isValidString(val)) return { ok: false, missingLang: lang };
    normalized[lang] = val.trim();
  }
  return { ok: true, value: normalized };
};

const normalizeOptionalMultilingual = (raw, langs = DEFAULT_LANGS) => {
  if (raw === undefined || raw === null || raw === "") {
    return { ok: true, value: undefined };
  }
  const parsed = parseMultilingual(raw);
  if (!parsed) return { ok: false, missingLang: null };
  const normalized = {};
  for (const lang of langs) {
    const val = parsed[lang];
    if (isValidString(val)) normalized[lang] = val.trim();
  }
  return Object.keys(normalized).length > 0
    ? { ok: true, value: normalized }
    : { ok: false, missingLang: null };
};

module.exports = {
  DEFAULT_LANGS,
  isValidString,
  parseMultilingual,
  normalizeRequiredMultilingual,
  normalizeOptionalMultilingual,
};
