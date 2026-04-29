 import { pipeline } from '@xenova/transformers';
 // Compare two vectors → number between 0 and 1
    function cosineSimilarity(a, b) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (magA * magB);
    }

export async function textToVector(idea, desc){
    let text = idea.toLowerCase() + " " + desc.toLowerCase();
    const a = await vectorize(text);
    return cosineSimilarity(a, a);
}
// --- Test it ---
const a = await vectorize('Hackathon in April about AI for CS students, 3 days long');
const b = await vectorize('Coding competition this spring focused on AI, open to developers, runs for 3 days');
const c = await vectorize('Recipe for chocolate cake');
const d = await vectorize('Chocolate cake recipe');

console.log(cosineSimilarity(a, b)); // → ~0.91 (similar)
console.log(cosineSimilarity(a, c)); // → ~0.21 (different)
console.log(cosineSimilarity(c, d));