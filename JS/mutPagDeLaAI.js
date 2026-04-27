export function doRedirectFromForm(form) {
    const optionValue = document.querySelector("#option").value;
    const titleValue = document.querySelector("#title").value;
    const propunereValue = document.querySelector("#propunere").value;

    const dateNoi = {
        titlu: titleValue,
        text: propunereValue,
        data: new Date().toLocaleDateString('ro-RO')
    };

    let storageKey = "";
    let redirectUrl = "";

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
}

export function redirectToPost(form) {
    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            doRedirectFromForm(form);
        });
    }
}