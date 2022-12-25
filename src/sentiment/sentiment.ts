import { polarity } from "polarity";

const getWords = (content: string) => {
  const words = content
    .split(/[\s.,/#!$%^&*;:{}=\-_`~()]/)
    .filter((word) => word.length > 0);

  return words;
};

export const getSentiment = (content: string) => {
  const words = getWords(content);

  const { polarity: sentiment } = polarity(words);

  return sentiment;
};
