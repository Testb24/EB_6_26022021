const media = document.getElementsByClassName("active_tag");
const media_array = Object.values(media);

media_array.forEach(elt => {
    elt.addEventListener("click", galerie)
});


function galerie() {

};