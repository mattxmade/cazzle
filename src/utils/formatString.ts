const formatString = (text: string, process: "uppercase" | "lowercase") =>
  process === "uppercase"
    ? text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase()
    : text.toLowerCase();

export default formatString;
