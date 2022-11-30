import { StateField } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView } from "@codemirror/view";

import { unified } from "unified";
import english from "retext-english";
import equality from "retext-equality";
import indefiniteArticle from "retext-indefinite-article";
import syntaxMentions from "retext-syntax-mentions";
import sentenceSpacing from "retext-sentence-spacing";
import repeatedWords from "retext-repeated-words";
import quotes from "retext-quotes";
import profanities from "retext-profanities";
import passive from "retext-passive";
import intensify from "retext-intensify";
import readability from "retext-readability";
import stringify from "retext-stringify";
import { Summary, updateSummary } from "./bridge";

const classes = {
  "retext-intensify": "cm-rtx-intensify",
  "retext-passive": "cm-rtx-passive",
  "retext-profanities": "cm-rtx-profanities",
  "retext-readability": "cm-rtx-readability",
  "retext-repeated-words": "cm-rtx-repeated-words",
  "retext-sentence-spacing": "cm-rtx-sentence-spacing",
  "retext-indefinite-article": "cm-rtx-indefinite-article",
  "retext-equality": "cm-rtx-equality",
};

const initializeProcessor = () =>
  unified()
    .use(english)
    .use(passive)
    .use(readability, { age: 14 })
    .use(intensify)
    .use(equality)
    .use(indefiniteArticle)
    .use(syntaxMentions)
    .use(sentenceSpacing)
    .use(repeatedWords)
    .use(profanities, { sureness: 2 })
    .use(stringify);

let oldHightlights: DecorationSet | undefined = undefined;
export const errorHighlightPlugin = StateField.define<DecorationSet>({
  create: (_) => Decoration.none,
  update: function (highlights, tr) {
    if (oldHightlights) {
      highlights = oldHightlights;
      oldHightlights = undefined;
      return highlights;
    }

    const fullText = tr.newDoc.sliceString(0);
    const processor = initializeProcessor();

    highlights = highlights.map(tr.changes);
    const vfile = processor.processSync(fullText);
    const summary: Record<string, number> = {};

    for (let message of vfile.messages) {
      if (!message.source) continue;

      summary[message.source] = (summary[message.source] || 0) + 1;

      const begin = message.position?.start.offset || 0;
      const end = message.position?.end.offset || 0;

      highlights.between(begin, end, (from, to, value) => {});

      highlights = highlights.update({
        add: [
          Decoration.mark({
            class: classes[message.source as keyof typeof classes],
            attributes: { title: message.reason },
          }).range(begin, end),
        ],
      });
    }

    oldHightlights = highlights;

    const summaryArray = Object.entries(summary).map(([key, value]) => ({
      selector: classes[key as keyof typeof classes],
      count: value,
    }));
    updateSummary(summaryArray);
    return highlights;
  },
  provide: (f) => EditorView.decorations.from(f),
});
