import { ReadabilityData } from "./summary";

const fleschLincaidLevelToGrade = (fleschLincaidIndex: number) => {
  if (fleschLincaidIndex >= 90) return "5th grade";
  if (fleschLincaidIndex >= 80) return "6th grade";
  if (fleschLincaidIndex >= 70) return "7th grade";
  if (fleschLincaidIndex >= 60) return "8th & 9th grade";
  if (fleschLincaidIndex >= 50) return "10th to 12th grade";
  if (fleschLincaidIndex >= 30) return "College";
  if (fleschLincaidIndex >= 10) return "College graduate";
  return "Professional";
};

export const calculateFleschLincaidIndex = ({
  sentences,
  syllables,
  words,
}: ReadabilityData) => {
  const indexResult =
    0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;

  return {
    label: fleschLincaidLevelToGrade(indexResult),
    value: indexResult,
  };
};
