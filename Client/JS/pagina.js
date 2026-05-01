const form = document.querySelector("#form-sugestie");
const container = document.querySelector("#container");

// --- 1. LOGICA PENTRU FORMULAR (Salvare) ---
if (form) {
    form.addEventListener("submit", event => {
        event.preventDefault();

        const optionValue = document.querySelector("#option").value; 
        const titleValue = document.querySelector("#title").value;
        const propunereValue = document.querySelector("#propunere").value;

        const dateNoi = {
            titlu: titleValue,
            text: propunereValue,
            data: new Date().toLocaleDateString('ro-RO') // Adăugăm și data automat
        };

        let storageKey = "";
        let redirectUrl = "";

        // Verificăm opțiunea selectată în formular
        if (optionValue === "problema") {
            storageKey = "lista_probleme";
            redirectUrl = "probleme.html";
        } else if (optionValue === "initiativa") {
            storageKey = "lista_initiative";
            redirectUrl = "initiative.html";
        } else {
            storageKey = "lista_sugestii";
            redirectUrl = "sugestii.html";
        }

        let listaExistenta = JSON.parse(localStorage.getItem(storageKey) || "[]");
        listaExistenta.push(dateNoi);
        localStorage.setItem(storageKey, JSON.stringify(listaExistenta));

        window.location.href = redirectUrl;
    });
}

// --- 2. LOGICA PENTRU AFIȘARE (Probleme / Initiative / Sugestii) ---
if (container && !form) {
    let storageKey = "";
    const paginaCurenta = window.location.pathname;

    // Detectăm ce listă trebuie să încărcăm în funcție de fișierul HTML deschis
    if (paginaCurenta.includes("probleme.html")) {
        storageKey = "lista_probleme";
    } else if (paginaCurenta.includes("initiative.html")) {
        storageKey = "lista_initiative";
    } else if (paginaCurenta.includes("sugestii.html")) {
        storageKey = "lista_sugestii";
    }

    if (storageKey) {
        const dateSalvate = JSON.parse(localStorage.getItem(storageKey) || "[]");

        dateSalvate.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("idea-div"); // Folosim clasa ta din CSS pentru design consistent
            
            div.innerHTML = `
                <h2>${item.titlu}</h2><hr>
                <p>${item.text}</p>
                <div class="idea-source">
                    <p>Propus de: Student</p>
                    <p>Date of creation: ${item.data}</p>
                </div>
                <div class="user-action">
                    <button class="fa" style="font-size:22px">&#xf087</button>
                    <span>0</span>
                </div>
            `;
            container.prepend(div);
        });
    }
}