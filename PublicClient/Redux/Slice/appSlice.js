import { createSlice } from "@reduxjs/toolkit";

const loadThemeFromStorage = () => {
  try {
    const saved = localStorage.getItem("theme");

    return saved ? saved : "light";
  } catch {
    return "light";
  }
};

const loadLanguageFromStorage = () => {
  try {
    const saved = localStorage.getItem("language");

    return saved ? saved : "am";
  } catch {
    return "am";
  }
};

const initialState = {
  language: loadLanguageFromStorage(),
  theme: loadThemeFromStorage(),
  title: "Stoke",
};

const appSlice = createSlice({
  name: "APPSLICE",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload.language;
      localStorage.setItem("language", action.payload.language);
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
      localStorage.setItem("theme", action.payload.theme);
    },

    saveNavTitle: (state, action) => {
      state.title = action.payload.title;
    },
  },
});

export const appactions = appSlice.actions;

export default appSlice;
