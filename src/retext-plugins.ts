import equality from "retext-equality";
import indefiniteArticle from "retext-indefinite-article";
import sentenceSpacing from "retext-sentence-spacing";
import repeatedWords from "retext-repeated-words";
import profanities from "retext-profanities";
import passive from "retext-passive";
import intensify from "retext-intensify";
import readability from "retext-readability";
import overuse from "retext-overuse";
import simplify from "retext-simplify";
import assuming from "retext-assuming";
import usage from "retext-usage";

export const PLUGINS = [
  {
    name: "Intensify",
    settingsKey: "intensify",
    plugin: intensify,
    settings: false,
    defaultBackgroundColor: "#dd4339",
    defaultForegroundColor: "#002b36",
    label: "Weak words",
  },
  {
    name: "Passive voice",
    settingsKey: "passive",
    plugin: passive,
    settings: false,
    defaultBackgroundColor: "#af354b",
    defaultForegroundColor: "#002b36",
    label: "Passive voice",
  },
  {
    name: "Profanities",
    settingsKey: "profanities",
    plugin: profanities,
    settings: {
      sureness: 2,
    },
    defaultBackgroundColor: "#81275d",
    defaultForegroundColor: "#002b36",
    label: "Bad words or profanities",
  },
  {
    name: "Readability",
    settingsKey: "readability",
    plugin: readability,
    settings: {
      age: 18,
    },
    defaultBackgroundColor: "#704d71",
    defaultForegroundColor: "#002b36",
    label: "Readability",
  },
  {
    name: "Repeated words",
    settingsKey: "repeated-words",
    plugin: repeatedWords,
    settings: false,
    defaultBackgroundColor: "#5e7284",
    defaultForegroundColor: "#002b36",
    label: "Repeated words",
  },
  {
    name: "Sentence spacing",
    settingsKey: "sentence-spacing",
    plugin: sentenceSpacing,
    settings: false,
    defaultBackgroundColor: "#53825f",
    defaultForegroundColor: "#002b36",
    label: "Sentence spacing",
  },
  {
    name: "Indefinite article",
    settingsKey: "indefinite-article",
    plugin: indefiniteArticle,
    settings: false,
    defaultBackgroundColor: "#49913b",
    defaultForegroundColor: "#002b36",
    label: "Indefinite article",
  },
  {
    name: "Equality",
    settingsKey: "equality",
    plugin: equality,
    settings: false,
    defaultBackgroundColor: "#8bad36",
    defaultForegroundColor: "#002b36",
    label: "Equality",
  },
  {
    name: "Overuse",
    settingsKey: "overuse",
    plugin: overuse,
    settings: false,
    defaultBackgroundColor: "#F5B0CB55",
    defaultForegroundColor: "#000000",
    label: "Overuse",
  },
  {
    name: "Simplify",
    settingsKey: "simplify",
    plugin: simplify,
    settings: false,
    defaultBackgroundColor: "#F5B0CB55",
    defaultForegroundColor: "#000000",
    label: "Hard to read words",
  },
  {
    name: "Assuming",
    settingsKey: "assuming",
    plugin: assuming,
    settings: false,
    defaultBackgroundColor: "#F5B0CB55",
    defaultForegroundColor: "#000000",
    label: "Possibly wrong assumptions",
  },
  {
    name: "Usage",
    settingsKey: "usage",
    plugin: usage,
    settings: false,
    defaultBackgroundColor: "#F5B0CB55",
    defaultForegroundColor: "#000000",
    label: "Word that can be improved",
  },
] as const;
