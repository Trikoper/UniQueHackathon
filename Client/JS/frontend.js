import { doRedirectFromForm } from './mutPagDeLaAI.js'
import { cenzura } from './cenzura.js';
const ideaTitle = document.getElementById('title');
const ideaOption = document.getElementById('option');
const ideaDesc = document.getElementById('propunere');
const ideaForm = document.getElementById('form-sugestie');
const responseDiv = document.querySelector('.ai-response-div');
const responseEl = document.getElementById("response-area");
const closeBtn = document.getElementById('closeBtn');

const raspuns = ideaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titleText = ideaTitle.value.toLowerCase(); const descText = ideaDesc.value.toLowerCase(); const ideaType = ideaOption.value.toLowerCase();

  responseDiv.classList.remove('hidden');
  const esteUrat = cenzura(titleText, descText);

  if(esteUrat){
    responseEl.textContent = 'Aveti un cuvant urat'; 
    closeBtn.onclick = function() { responseDiv.classList.add('hidden'); };
    return 0;
  } else {
      console.log(`merge spre executie: ${titleText}, ${descText}, ${ideaType}`)
      responseEl.textContent = 'Se încarcă...'; 

      //vectorizare
      const vector = await fetch('http://localhost:3000/vectorize', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: titleText, 
          description: descText,
          ideaType : ideaType,
        })
      }); 

      

      //extragere din DB cele mai asemanatoare idei prin vectorizare

      //Trimitere la AI
      // const response = await fetch('http://localhost:3000/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     title: titleText, 
      //     description: descText,
      //     title1 : "Hackathon in Aprilie",
      //     description1: 'Recomand sa organizam un concurs pentru informaticieni si DJ la tema "AI"',
      //     title2 : 'Curs de gatit',
      //     description2: 'Cunosc o persoana care e un bucatar foarte bun ar putea tine un curs la universitatea noastra',
      //     title3 : 'Competitie sportiva',
      //     description3: 'O zi speciala pe toate universitatea cu competitii si jocuri vesele sportive',

      //   }), 
      // });

      // const data = await response.json();
      // const raspunsAI = data.reply;
      // console.log(data.reply); // AI's response  

      // if(raspunsAI == '1' || raspunsAI == 1){
      //   console.log("Idea dvs. este unica");
      //   responseEl.textContent = "Felicitari, idea dvs. a fost acceptata";
      //   closeBtn.onclick = function() {
      //     doRedirectFromForm(ideaForm);
      //   };
      // } else if (raspunsAI == '2' || raspunsAI == 2){
      //   console.log("Idea deja exista");
      //   responseEl.textContent = "Idea deja exista si a fost automat apreciata";
      //   closeBtn.onclick = function() {
      //     doRedirectFromForm(ideaForm);
      //   };
      //   //functie pentru aprecierea ideii deja existente
      // } else if (raspunsAI == '3' || raspunsAI == 3){
      //   console.log("Idea are cuvinte urate");
      //   responseEl.textContent = "Idea dvs. contine cuvinte urate";
      //   closeBtn.textContent = "Revenire la compunerea";
      //   closeBtn.onclick = function() {
      //     responseDiv.classList.add('hidden');
      //   };
      // } else if (raspunsAI == '4' || raspunsAI == 4){
      //   console.log("Idea este incompleta si nu are nicio valoare");
      //   responseEl.textContent = "Idea dvs. pare nefinisata";
      //   closeBtn.textContent = "Revenire la compunere";
      //   closeBtn.onclick = function() {
      //     responseDiv.classList.add('hidden');
      //   };
      // }
  }
})


