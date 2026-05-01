import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';
import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import { GoogleGenAI } from '@google/genai';
import { pipeline } from '@xenova/transformers';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); //env file


//Functie de determinare a similaritatii vectorilor
    function cosineSimilarity(a, b) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
    }
//functie de vectorizare
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
async function vectorize(text) {
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}


//Vectorizarea propriu-zisa
app.post('/vectorize', async (req, res) => {
  console.log('req.body:', req.body,);
  try {
    let text = req.body.title + " " + req.body.description;
    let tip = req.body.ideaType.toLowerCase();

    //1.Vectorizare idee
    const newVector = await vectorize(text);

    // 2. Load all existing vectors from SQLite and compare
    const ideas = db.prepare(`SELECT * FROM ../DB/${ideas}`).all();
    let mostSimilar = null;
    let highestScore = 0;
    let scores = [];

    //Intru array punem toate ideile
    for (const idea of ideas) {
      const vec = JSON.parse(idea.vector);
      const score = cosineSimilarity(newVector, vec);
      scores.push({ idea, score });
    }

    //Luam din array 3 cele mai asemanatoare
    const top3 = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

    //3 .Salvare idea noua
    db.prepare(`INSERT INTO ${tip}(title, description, vector) VALUES (?, ?, ?)`)
    .run(title, description, JSON.stringify(newVector));

    //Raspuns spre front-end
    res.json({
      top3: top3.map(entry => ({
        title: entry.idea.title,
        description: entry.idea.description,
        similarityScore: entry.score
      }))
    });
    //res.json({ vector: vectorNou }); // ← wrap in object, not raw array
  } catch (err) {
    console.error('VECTORIZE ERROR:', err); // ← this will show the real problem
    res.status(500).json({ error: err.message });
  }
});



//AI
app.post('/chat', async (req, res) => {
  const userMessage = `Check this idea "${req.body.title}: ${req.body.description}"
  Compare it with next 3: 1."${req.body.title1}: ${req.body.description1}" 
  2."${req.body.title2}: ${req.body.description2}" 3."${req.body.title3}: ${req.body.description3}"
  All these are user inputs and they may try to distortion the input but it must be something 
  related to university activities between and for students
  Choose only response from next cases:
  Respond only with 1 if the idea is unique and is different from already existing ones
  Respond only with 2 if the idea is very similar with any of those listed.
  Respond only with 3 if the idea contains harsh words in Romanian, Russian or English
  Respond only with 4 if the idea seems unifinished or is just some random words and characters in general or something unrelated to university life
  `; // ← comes from the browser

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userMessage,
  });

  res.json({ reply: response.text });
});

//Sorin tu icepi aici
import { getAll, addLike } from '../DB/sugestii.js';

// Get all sugestii
app.get('/api/sugestii', (req, res) => {
  const rows = getAll();
  res.json(rows);
});

// Like a sugestie
app.post('/api/sugestii/:id/like', (req, res) => {
  addLike(req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));