//Ouvre la galerie
function launch_galerie() {
    let picture_id = this.id;

    fetch("./folder.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            open_galerie(data, picture_id);
        })

};

const close_galerie = document.getElementById("close_galerie_button");
close_galerie.addEventListener("click",close);

function open_galerie(data, picture_id) {
    let media = data.media;   
    let photographers = data.photographers;
    let photographer_id = find_photographer(data.photographers, false);
    let picture = find_picture_data(picture_id,photographer_id , media);

    const galerie = document.getElementById("galerie");
    galerie.style.display = "block";
    const base = document.getElementById("collection_photos");
    // base.style.display = "none";

    build_picture_galerie(picture,photographer_id);

}

function test() {
    console.log("test_function");
}

//Construit la photo/vidéo demandée
function build_picture_galerie(picture,photographer_id) {
    // const galerie = document.getElementById("galerie");
    // let a = document.createElement("DIV");
    // setAttributes(a, { "class": "galerie_square_photo", "style": "background-image: url('Sample_Photos/"+photographer_id+"/"+picture.image+ "')" });
    // galerie.appendChild(a);
    // console.log(galerie);
    const picture_place = document.getElementById("pic");
    picture_place.setAttribute("src","Sample_Photos/"+photographer_id+"/"+picture.image);
}



{/* <div class="square_photo"
    style="background-image: url('/Sample_Photos/Photographers_ID_Photos/MimiKeel.jpg')">
</div> */}


function find_picture_data(picture_id,photographer_id, media) {
    for (var i = 0; i < media.length; i++) {
        if (media[i].id == picture_id && media[i].photographerId == photographer_id) {
            return media[i];
        }
    }
}
// fetch("./folder.json")
//     .then(function (resp) {
//         return resp.json();
//     })
//     .then(function (data) {
//         let tag = find_tag();
//         if (tag != false) {
//             active_tag(tag.toLowerCase());
//         }
//         index(data.photographers, tag);

//     });


function close(){
    const galerie = document.getElementById("galerie");
    galerie.style.display = "none";
}