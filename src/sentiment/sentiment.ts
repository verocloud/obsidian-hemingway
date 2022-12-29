import { polarity } from "polarity";
import { getFrontmatterRange } from "src/utils";

const getWords = (content: string) => {
  const words = content
    .split(/[\s.,/#!$%^&*;:{}=\-_`~()]/)
    .filter((word) => word.length > 0);

  return words;
};

export const getSentiment = (content: string) => {
  const [_, end] = getFrontmatterRange(content);
  content = content.slice(end + 1);
  const words = getWords(content);

  const { polarity: sentiment } = polarity(words);

  return sentiment;
};
