import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import { GoogleGenAI } from '@google/genai';
import { pipeline } from '@xenova/transformers';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); //env file

// //vectorizare
// const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
// async function vectorize(text) {
//   const output = await extractor(text, { pooling: 'mean', normalize: true });
//   return Array.from(output.data);
// }

//AI
app.post('/chat', async (req, res) => {
  const userMessage = `Check this idea ${req.body.title}: ${req.body.description}.
  Compare it with next 3: 1.${req.body.title1}: ${req.body.description1}. 
  2.${req.body.title2}: ${req.body.description2} 3.${req.body.title3}: ${req.body.description3}
  Choose only response from next cases:
  Respond only with 1 if the idea is unique and is different from already existing ones
  Respond only with 2 if the idea is very similar with any of those listed.
  Respond only with 3 if the idea contains harsh words in Romanian, Russian or English
  Respond only with 4 if the idea seems unifinished or is just some random words and characters in general
  `; // ← comes from the browser

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userMessage,
  });

  res.json({ reply: response.text });
});

app.listen(3000, () => console.log('Server running on port 3000'));