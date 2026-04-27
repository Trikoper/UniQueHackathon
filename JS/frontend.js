import {redirectToPost, doRedirectFromForm} from './mutPagDeLaAI.js'
const ideaTitle = document.getElementById('title');
const ideaOption = document.getElementById('option');
const ideaDesc = document.getElementById('propunere');
const ideaForm = document.getElementById('form-sugestie');
const responseDiv = document.querySelector('.ai-response-div');
const responseEl = document.getElementById("response-area");
const closeBtn = document.getElementById('closeBtn');


ideaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  responseDiv.classList.remove('hidden');
  responseEl.textContent = 'Se încarcă...'; // show while waiting

  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: ideaTitle.value, description: ideaDesc.value }), // ← send it here
  });

  const data = await response.json();
  console.log(data.reply); // AI's response  
  responseEl.textContent = data.reply;
})

closeBtn.onclick = function() {
  doRedirectFromForm(ideaForm);
};
