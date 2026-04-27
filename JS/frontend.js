const ideaTitle = document.getElementById('idea_title');
const ideaDesc = document.getElementById('idea_desc');
const ideaForm = document.querySelector('form');
const responseEl = document.getElementById('ai_response');

ideaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

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
