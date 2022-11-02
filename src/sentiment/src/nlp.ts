// @ts-ignore
import aposToLexForm from "apos-to-lex-form";
import { WordTokenizer, SentimentAnalyzer, PorterStemmer } from "natural";


// @ts-ignore
import SpellCorrector from "spelling-corrector";
import * as stopword from 'stopword'



const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();


const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");

export function getSentiment(str: string): -1 | 0 | 1 {
  if (!str.trim()) {
    return 0;
  }

  const lexed = aposToLexForm(str)
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, "");
   const { removeStopwords, eng, fra } = require('stopword')
  const tokenized = tokenizer.tokenize(lexed);

  const fixedSpelling = tokenized.map((word) => spellCorrector.correct(word));

  const stopWordsRemoved = stopword.removeStopwords(fixedSpelling);

  const analyzed = analyzer.getSentiment(stopWordsRemoved);
  if (analyzed >= 1) return 1; // positive
  if (analyzed === 0) return 0;
  return -1;
  console.log(analyzed)

  return 0;
}
console.log(getSentiment('This was very challenging course for me.I felt you needed a strong knowledge base of financial statements to really understand what triggers potential fraud, deception. I think I will need to re-review the course material to reinforce the concepts. Thanks!'))
console.log(getSentiment('we jog everyday'))