const btn_form = document.getElementById("btn_form");
const form_form = document.getElementById("form");
const header_form = document.getElementById("photographe_header");
const main_form = document.getElementById("photographe_main");
const close_form = document.getElementById("form_close");

btn_form.addEventListener("click", openform);
// close_form.addEventListener("click", closeform);

//Load the form
function openform() {
    form_form.style.display = "block";
    header_form.style.display ="none";
    main_form.style.display="none";
}

function closeform() {
    form_form.style.display = "none";
}