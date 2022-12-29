export const getFrontmatterRange = (text: string) => {
  text = text.trim();
  const begin = text.indexOf("---");
  let end = text.indexOf("---", begin + 3);

  while (end !== -1 && text[end - 1] !== "\n" && text[end + 4] !== "\n") {
    end = text.indexOf("---", end + 3);
  }

  if (end === -1 && begin === 0) return [begin, text.length];
  else if (begin !== 0 || end === -1) return [-1, -1];

  return [begin, end];
};
