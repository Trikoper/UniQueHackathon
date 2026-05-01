async function loadSugestii() {
  const container = document.getElementById('container');

const res = await fetch('http://localhost:3000/api/sugestii');
const sugestii = await res.json();

  container.innerHTML = sugestii.map(s => `
    <div class="idea-div" id="card-${s.id}">
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <button onclick="likesugestie(${s.id})">
        👍 <span id="likes-${s.id}">${s.likes}</span>
      </button>
    </div>
  `).join('');
}

async function likesugestie(id) {
  await fetch(`/api/sugestii/${id}/like`, { method: 'POST' });
  const span = document.getElementById(`likes-${id}`);
  span.textContent = parseInt(span.textContent) + 1;
}

loadSugestii();