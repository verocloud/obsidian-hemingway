import { syllable } from "syllable";
import { calculateFleschLincaidIndex } from "./flesch-lincaid";
import { calculateGunningFogIndex } from "./grunning-frog";
import { ReadabilityData } from "./summary";

const calculateData = (text: string) => {
  let totalSyllables = 0;
  const sentences = text.split(/[.?!]/).map((sentence) => sentence.trim());
  const words = text
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.replace(/[^a-zA-Z\-]/g, ""));

  const complexWords = words.filter((word) => {
    const syllableCount = syllable(word);
    totalSyllables += syllableCount;
    return syllableCount >= 3;
  });

  const readabilityData: ReadabilityData = {
    sentences: sentences.length,
    words: words.length,
    syllables: totalSyllables,
    complexWords: complexWords.length,
  };

  return readabilityData;
};

export const calculateIndexes = (text: string) => {
  const readabilityData: ReadabilityData = calculateData(text);

  return [
    {
      name: "Gunning Fog Index",
      result: calculateGunningFogIndex(readabilityData),
    },
    {
      name: "Flesch-Kincaid Grade Level",
      result: calculateFleschLincaidIndex(readabilityData),
    },
  ];
};
