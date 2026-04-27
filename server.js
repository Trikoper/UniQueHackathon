import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/chat', async (req, res) => {
  const userMessage = `What do you think about this title and description of the book I am reading right now? ${req.body.title}: ${req.body.description}. Do you know it? Respond in 3 propositions`; // ← comes from the browser

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userMessage,
  });

  res.json({ reply: response.text });
});

app.listen(3000, () => console.log('Server running on port 3000'));