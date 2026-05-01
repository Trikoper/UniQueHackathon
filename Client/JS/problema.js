async function loadProblema() {
  const container = document.getElementById('container');

const res = await fetch('http://localhost:3000/api/problema');
const problema = await res.json();

  container.innerHTML = problema.map(s => `
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
  await fetch(`/api/problema/${id}/like`, { method: 'POST' });
  const span = document.getElementById(`likes-${id}`);
  span.textContent = parseInt(span.textContent) + 1;
}

loadProblema();