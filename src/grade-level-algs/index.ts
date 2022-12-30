import { calculateGunningFogIndex } from "./grunning-frog";

export const calculateIndexes = (text: string) => {
  return [
    {
      name: "Gunning Fog Index",
      result: calculateGunningFogIndex(text),
    },
  ];
};
