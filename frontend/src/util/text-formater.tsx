export const textFormatter = (text: string) => {
  return text.replace(/\*(?!\s)/g, "").replace(/(?<!\S)\*(?!\S)/g, "");
};
