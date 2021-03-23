//Options (boutons) de la galerie (close + outside / right / left)
const close_galerie = document.getElementById("close_galerie_button");
close_galerie.addEventListener("click", close);
const contain = document.getElementById("galerie_container");
contain.addEventListener("click", close);

const left_space = document.getElementById("left_space");
left_space.addEventListener("click", load_next_picture);

const right_space = document.getElementById("right_space");
right_space.addEventListener("click", load_next_picture);


//Charge le json
function launch_galerie() {
    let picture_id = this.id;

    open_galerie(picture_id);

};

//Affiche la galerie et charge les données ()
async function open_galerie(picture_id) {

    const data = await getData();
    const media = data.media;
    const photographers = data.photographers;

    const photographer_id = find_photographer(photographers, false);
    const picture = find_picture_data(picture_id, photographer_id, media);

    const galerie = document.getElementById("galerie");
    galerie.style.display = "block";

    build_media_galerie(picture, photographer_id);
};

//Construit la photo/vidéo demandée
function build_media_galerie(picture, photographer_id) {

    const picture_place = document.getElementById("pic");
    const video_place = document.getElementById("video");

    if (picture.image !== undefined) {

        video_place.style.display = "none";
        picture_place.style.display = "block";
        picture_place.setAttribute("src", "Sample_Photos/" + photographer_id + "/" + picture.image);

    } else if (picture.video !== undefined) {

        picture_place.style.display = "none";
        video_place.style.display = "block";
        video_place.setAttribute("src", "Sample_Photos/" + photographer_id + "/" + picture.video);

    }

    let url = window.location.origin + window.location.pathname + "?photographe=" + photographer_id + "&id=" + picture.id;
    window.history.pushState({ info: "add_pic_id" }, '', url);

}

function find_picture_data(picture_id, photographer_id, media) {

    media = media.filter(item => item.photographerId == photographer_id);

    for (var i = 0; i < media.length; i++) {
        if (media[i].id == picture_id) {
            return media[i];
        }
    }
}


function close() {
    const galerie = document.getElementById("galerie");

    if (this.id == "galerie_container" && event.target == this || this.id != "galerie_container") {
        galerie.style.display = "none";
    }

    let params = new URLSearchParams(document.location.search.substring(1));
    let photographer_id = params.get("photographe");

    let url = window.location.origin + window.location.pathname + "?photographe=" + photographer_id;
    window.history.pushState({ info: "add_pic_id" }, '', url);
}

async function load_next_picture() {

    if (this.id == "right_space" && event.target.id != "right_arrow" && event.target.id != "right_space") {
        return
    }

    var direction = this.id;

    let params = new URLSearchParams(document.location.search.substring(1));
    let photographe = params.get("photographe");
    let media_id = params.get("id");

    const data = await getData();
    let photographer_id = find_photographer(data.photographers, false);
    let media = data.media.filter(item => item.photographerId == photographer_id);

    let id_before, id_after;
    let i = 0;

    while (media_id != media[i].id && i < media.length - 1) {
        i++;
    }

    if (i == 0) {
        id_before = media[media.length-1].id;
        id_after = media[i + 1].id;
    } else if (i >= media.length-1) {
        id_before = media[i - 1].id;
        id_after = media[0].id;
    } else {
        id_before = media[i - 1].id;
        id_after = media[i + 1].id;
    }

    let picture;

    if (direction == "left_space") {
        picture = find_picture_data(id_before, photographer_id, media);

    } else if (direction == "right_space") {
        picture = find_picture_data(id_after, photographer_id, media);
    }

    build_media_galerie(picture, photographer_id);

}
// const data;
// const data = await getData();


function getData() {
    return new Promise((resolve, reject) => {
        fetch('./folder.json')
            .then(function (resp) {
                return resp.json();
            })
            .then(data => {
                let data_result = data;
                resolve(data_result);
            })
    })
}