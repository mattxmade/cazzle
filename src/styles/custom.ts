type Index = { [index: number]: string };

const options: Index = {
  0: "0",
  1: "0.44rem",
  2: "0.67rem",
  3: "1rem",
  4: "1.5rem",
  5: "2.25rem",
  6: "3.38rem",
  7: "5.06rem",
  8: "20%",
  9: "50%",
  10: "100%",
};

const getValue = ({ value, fallback }: { value: number; fallback: string }) =>
  value <= 10 ? options[value] : fallback;

const fallbackRem = (value: number) =>
  getValue({ value, fallback: value + "rem" });

const fallbackPercentage = (value: number) =>
  getValue({ value, fallback: "100%" });

export const customTheme = {
  breakpoints: {
    "1024": 1024,
  },

  fontColor: {
    light: {
      main: "black",
      shade: "darkslategrey",
      faded: "darkcyan",
    },
    dark: {
      main: "white",
      secondary: "ivory",
      shade: "whitesmoke",
      faded: "darkslategrey",
    },
  },
  backgroundColor: {
    main: "#60a5fa",
    extended: "lavender",
    placeholder: { primary: "#dedee3", secondary: "#f2f3f4" },
    panel: "lightgrey",
    popup: "darkslategrey",
    search: {
      filtersBar: "#627e95",
      main: "#e9e9eb",
      input: "white",
    },
    dashboard: {
      main: "#f5f5f5",
    },
  },
  border: {
    defaultRadius: "0.2rem",
    radius: fallbackPercentage,
    placeholder: "1px dashed #dedee2",
  },
  gap: fallbackRem,
  spacing: fallbackRem,
  padding: fallbackRem,
};

export const ImageListItemStyle = {
  width: 75,
  minHeight: 75,
  display: "grid",
  overflow: "hidden",
  borderRadius: "0.2rem",
  backgroundColor: "lavender",
  ":hover": { cursor: "pointer" },
};
