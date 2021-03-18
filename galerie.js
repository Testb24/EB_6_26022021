const media = document.getElementsByClassName("clickable_galerie");
const media_array = Object.values(media);

media_array.forEach(elt => {
    elt.addEventListener("click", open_galerie)
});

//Ouvre la galerie
function open_galerie() {
    this.

    build_picture_galerie(photographer_id, id)
};

//Construit la photo/vidéo demandée
function build_picture_galerie(photographer_id, id) {
    fetch()
}



fetch("./folder.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        let tag = find_tag();
        if (tag != false) {
            active_tag(tag.toLowerCase());
        }
        index(data.photographers, tag);
        
    });