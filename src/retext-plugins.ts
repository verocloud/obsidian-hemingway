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
    name: "Intensify",
    settingsKey: "intensify",
    plugin: intensify,
    settings: false,
    defaultBackgroundColor: "#246A7355",
    defaultForegroundColor: "#fff",
    label: "Weak words",
  },
  {
    name: "Passive voice",
    settingsKey: "passive",
    plugin: passive,
    settings: false,
    defaultBackgroundColor: "#2AFC9855",
    defaultForegroundColor: "#000",
    label: "Passive voice",
  },
  {
    name: "Profanities",
    settingsKey: "profanities",
    plugin: profanities,
    settings: {
      sureness: 2,
    },
    defaultBackgroundColor: "#C4A29E55",
    defaultForegroundColor: "#000000",
    label: "Bad words or profanities",
  },
  {
    name: "Readability",
    settingsKey: "readability",
    plugin: readability,
    settings: {
      age: 18,
    },
    defaultBackgroundColor: "#B68CB855",
    defaultForegroundColor: "#000000",
    label: "Readability",
  },
  {
    name: "Repeated words",
    settingsKey: "repeated-words",
    plugin: repeatedWords,
    settings: false,
    defaultBackgroundColor: "#F038FF55",
    defaultForegroundColor: "#000000",
    label: "Repeated words",
  },
  {
    name: "Sentence spacing",
    settingsKey: "sentence-spacing",
    plugin: sentenceSpacing,
    settings: false,
    defaultBackgroundColor: "#C6CCB255",
    defaultForegroundColor: "#000000",
    label: "Sentence spacing",
  },
  {
    name: "Indefinite article",
    settingsKey: "indefinite-article",
    plugin: indefiniteArticle,
    settings: false,
    defaultBackgroundColor: "#F5B0CB55",
    defaultForegroundColor: "#000000",
    label: "Indefinite article",
  },
  {
    name: "Equality",
    settingsKey: "equality",
    plugin: equality,
    settings: false,
    defaultBackgroundColor: "#F5B0CB55",
    defaultForegroundColor: "#000000",
    label: "Equality",
  },
] as const;
