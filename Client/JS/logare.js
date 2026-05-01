const eroare = document.querySelector("#error");
const input = document.querySelector("#login");
const form = document.querySelector("#form");

form.addEventListener("submit", event => {
    event.preventDefault();
    const email = input.value;
    validare(email);
});

function validare(email) {
    const regex = /^[a-z]{2,20}\.[a-z]{2,20}@usm\.md$/;

    if (regex.test(email)) {
        window.location.replace("../HTML/sugestii.html");
    } else {
        eroare.style.display = "block";
        input.value = "";
    }
}