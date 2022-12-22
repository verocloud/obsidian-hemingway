import equality from "retext-equality";
import indefiniteArticle from "retext-indefinite-article";
import sentenceSpacing from "retext-sentence-spacing";
import repeatedWords from "retext-repeated-words";
import profanities from "retext-profanities";
import passive from "retext-passive";
import intensify from "retext-intensify";
import readability from "retext-readability";

export const PLUGINS = [
  {
    colorName: "Intesify colors",
    colorDescription: "Set the background and foreground colors for intensify",
    toggleName: "Intensify",
    toggleDescription: "Enable or disable the intensify filter",
    settingsKey: "intensify",
    messageSource: "retext-intensify",
    cssClass: "cm-rtx-intensify",
    plugin: intensify,
    settings: false,
    defaultBackgroundColor: "#246A7355",
    defaultForegroundColor: "#fff",
    label: "Weak words",
  },
  {
    colorName: "Passive colors",
    colorDescription: "Set the background and foreground colors for passive",
    toggleName: "Passive",
    toggleDescription: "Enable or disable the passive voice filter",
    settingsKey: "passive",
    messageSource: "retext-passive",
    cssClass: "cm-rtx-passive",
    plugin: passive,
    settings: false,
    defaultBackgroundColor: "#2AFC9855",
    defaultForegroundColor: "#000",
    label: "Passive voice",
  },
  {
    colorName: "Profanities colors",
    colorDescription:
      "Set the background and foreground colors for profanities",

    toggleName: "Profanities",
    toggleDescription: "Enable or disable the profanities filter",
    settingsKey: "profanities",
    messageSource: "retext-profanities",
    cssClass: "cm-rtx-profanities",
    plugin: profanities,
    settings: {
      sureness: 2,
    },
    defaultBackgroundColor: "#C4A29E55",
    defaultForegroundColor: "#000000",
    label: "Bad words or profanities",
  },
  {
    colorName: "Readability colors",
    colorDescription:
      "Set the background and foreground colors for readability",
    toggleName: "Readability",
    toggleDescription: "Enable or disable the readability filter",
    settingsKey: "readability",
    messageSource: "retext-readability",
    cssClass: "cm-rtx-readability",
    plugin: readability,
    settings: {
      age: 18,
    },
    defaultBackgroundColor: "#B68CB855",
    defaultForegroundColor: "#000000",
    label: "Readability",
  },
  {
    colorName: "Repeated words colors",
    colorDescription:
      "Set the background and foreground colors for repeated words",

    toggleName: "Repeated words",
    toggleDescription: "Enable or disable the repeated words filter",
    settingsKey: "repeated-words",
    messageSource: "retext-repeated-words",
    cssClass: "cm-rtx-repeated-words",
    plugin: repeatedWords,
    settings: false,
    defaultBackgroundColor: "#F038FF55",
    defaultForegroundColor: "#000000",
    label: "Repeated words",
  },
  {
    colorName: "Sentence spacing colors",
    colorDescription:
      "Set the background and foreground colors for sentence spacing",
    toggleName: "Sentence spacing",
    toggleDescription: "Enable or disable the sentence spacing filter",
    settingsKey: "sentence-spacing",
    messageSource: "retext-sentence-spacing",
    cssClass: "cm-rtx-sentence-spacing",
    plugin: sentenceSpacing,
    settings: false,
    defaultBackgroundColor: "#C6CCB255",
    defaultForegroundColor: "#000000",
    label: "Sentence spacing",
  },
  {
    colorName: "Indefinite article colors",
    colorDescription:
      "Set the background and foreground colors for indefinite article",
    toggleName: "Indefinite article",
    toggleDescription: "Enable or disable the indefinite article filter",
    settingsKey: "indefinite-article",
    messageSource: "retext-indefinite-article",
    cssClass: "cm-rtx-indefinite-article",
    plugin: indefiniteArticle,
    settings: false,
    defaultBackgroundColor: "#F5B0CB55",
    defaultForegroundColor: "#000000",
    label: "Indefinite article",
  },
  {
    colorName: "Equality colors",
    colorDescription: "Set the background and foreground colors for equality",
    toggleName: "Equality",
    toggleDescription: "Enable or disable the equality filter",
    settingsKey: "equality",
    messageSource: "retext-equality",
    cssClass: "cm-rtx-equality",
    plugin: equality,
    settings: false,
    defaultBackgroundColor: "#F5B0CB55",
    defaultForegroundColor: "#000000",
    label: "Equality",
  },
] as const;
