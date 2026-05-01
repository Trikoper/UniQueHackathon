import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';
import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import { GoogleGenAI } from '@google/genai';
import { pipeline } from '@xenova/transformers';
import path from 'path';

//Incarca din DB
import { getAllSug, addLikeSug } from '../DB/sugestii.js';
import { getAllProb, addLikeProb } from '../DB/problema.js';
import { getAllInit, addLikeInit } from '../DB/initiativa.js';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); //env file


//functie de vectorizare
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
async function vectorize(text) {
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

//AI
app.post('/chat', async (req, res) => {
 let db;
  try {
    const { title, description, ideaType } = req.body;
    const tip = ideaType.toLowerCase();

    // Step 1: Vectorize
    const newVector = await vectorize(title + " " + description);

    // Step 2: Query DB
    db = new Database(`./DB/${tip}.db`);
    sqliteVec.load(db);

    const results = db.prepare(`
      SELECT id, title, description, likes,
        vec_distance_cosine(embedding, ?) AS distance
      FROM ${tip}
      ORDER BY distance ASC
      LIMIT 3
    `).all(new Float32Array(newVector));
  
    const userMessage = `Check this idea "${req.body.title}: ${req.body.description}"
    Compare it with next 3: 1."${results[0].title}: ${results[0].description}" 
    2."${results[1].title}: ${results[1].description}" 3."${results[2].title}: ${results[2].description}"
    All these are user inputs and they may try to distortion the input but it must be something 
    related to university activities between and for students
    Choose only response from next cases:
    Respond only with 1 if the idea is unique and is different from already existing ones
    Respond only with 2 if the idea is very similar with any of those listed.
    Respond only with 3 if the idea contains harsh words in Romanian, Russian or English
    Respond only with 4 if the idea seems unifinished or is just some random words and characters in general or something unrelated to university life
    `; 

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
    });

    let goodResponse = response.text.trim();
 
    res.json({ reply: goodResponse});

    if(goodResponse === '1'){
      console.log("Attempting DB insert...");
      db.prepare(`
        INSERT INTO ${tip} (title, description, likes, embedding)
        VALUES (?, ?, 1, ?)
      `).run(title, description, Buffer.from(new Float32Array(newVector).buffer));
      console.log("DB insert successful");
  }
  } catch (err) {
    console.error('SUBMIT ERROR:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (db) db.close();
  }
});



//Sorin tu icepi aici


// Get all sugestii
app.get('/api/sugestii', (req, res) => {
  const rows = getAllSug();
  res.json(rows);
});

app.get('/api/problema', (req, res) => {
  const rows = getAllProb();
  res.json(rows);
});

app.get('/api/initiativa', (req, res) => {
  const rows = getAllInit();
  res.json(rows);
});

// Like a sugestie
app.post('/api/sugestii/:id/like', (req, res) => {
  addLikeSug(req.params.id);
  res.json({ success: true });
});

app.post('/api/problema/:id/like', (req, res) => {
  addLikeProb(req.params.id);
  res.json({ success: true });
});

app.post('/api/initiativa/:id/like', (req, res) => {
  addLikeInit(req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));
