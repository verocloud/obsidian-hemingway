import { syllable } from "syllable";

const gunningLevelToGrade = (gunningFogIndex: number) => {
  if (gunningFogIndex >= 17) return "College graduate";
  if (gunningFogIndex >= 16) return "College senior";
  if (gunningFogIndex >= 15) return "College junior";
  if (gunningFogIndex >= 14) return "College sophomore";
  if (gunningFogIndex >= 13) return "College freshman";
  if (gunningFogIndex >= 12) return "High school senior";
  if (gunningFogIndex >= 11) return "High school junior";
  if (gunningFogIndex >= 10) return "High school sophomore";
  if (gunningFogIndex >= 9) return "High school freshman";
  if (gunningFogIndex >= 8) return "Eighth grade";
  if (gunningFogIndex >= 7) return "Seventh grade";
  if (gunningFogIndex >= 6) return "Sixth grade";
  return "Fifth grade or lower";
};

export const calculateGunningFogIndex = (text: string) => {
  const words = text
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.replace(/[^a-zA-Z\-]/g, ""));

  const sentences = text.split(/[.?!]/).map((sentence) => sentence.trim());

  const averageSentenceLength = words.length / sentences.length;

  const complexWords = words.filter((word) => syllable(word) >= 3);

  const indexResult =
    (averageSentenceLength + 100 * (complexWords.length / words.length)) * 0.4;

  return gunningLevelToGrade(indexResult);
};
