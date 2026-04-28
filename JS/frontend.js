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

  responseDiv.classList.remove('hidden');
  const esteUrat = cenzura(ideaTitle.value, ideaDesc.value);

  if(esteUrat){
    responseEl.textContent = 'Aveti un cuvant urat'; 
    closeBtn.onclick = function() {
      responseDiv.classList.add('hidden');
    };
    return 0;
  } else {
      console.log("merge spre executie")
      responseEl.textContent = 'Se încarcă...'; // show while waiting

      // const response = await fetch('http://localhost:3000/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ title: ideaTitle.value, description: ideaDesc.value }), // ← send it here
      // });

      // const data = await response.json();
      // console.log(data.reply); // AI's response  
      // responseEl.textContent = data.reply;
      closeBtn.onclick = function() {
        doRedirectFromForm(ideaForm);
      };
  }
})


