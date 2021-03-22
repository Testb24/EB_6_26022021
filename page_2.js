"use.strict";

fetch("./folder.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        let id = find_photographer(data.photographers, true);
        build_collection(id, data.media);
    });

function find_photographer(photographers, top) {
    let params = new URLSearchParams(document.location.search.substring(1));
    let photographe = params.get("photographe");

    for (i = 0; i < photographers.length; i++) {

        if (photographers[i].id == photographe) {

            if (top) {
                build_top(photographers[i]);
            }
            return photographers[i].id
        }

    }

};

// get_from_url();

// function get_from_url(url) {
//     let params = new URLSearchParams(document.location.search.substring(1));
//     let photographe = params.get("photographe"); // is the string "Jonathan"

//     build_top(photographe);
//     build_collection(photographe);
// };


function build_top(photographe) {
    document.getElementById("name").innerHTML = photographe.name;
    document.getElementById("place").innerHTML = photographe.city + ", " + photographe.country;
    document.getElementById("tagline").innerHTML = photographe.tagline;

    a = document.getElementById("filtres");
    photographe.tags.forEach(element => {
        a0 = document.createElement("P");
        a0.setAttribute("class", "link");
        a0.innerHTML = "#" + element;
        a.appendChild(a0);
    });

    const tag_2 = document.getElementsByClassName("link");
    const temp_tag = Object.values(tag_2);
    temp_tag.forEach(link => {
        link.addEventListener("click", reload);
    });

    let pic = document.getElementById("picture");

    setAttributes(pic, { "class": "square_photographe", "style": "background-image: url('Sample_Photos/Photographers_ID_Photos/" + photographe.portrait + "')" });

};

function build_collection(id, media) {

    for (var i = 0; i < media.length; i++) {
        if (media[i].photographerId == id) {
            build_picture(id, media[i]);
        }
    }
};

function build_picture(id, picture) {

    var link, title, type;

    if (picture.image !== undefined) {
        var temp = clean_name_plus_type(picture.image);
        link = picture.image;
    } else if (picture.video !== undefined) {
        var temp = clean_name_plus_type(picture.video);
        link = picture.video;
    }

    if (temp != false) {
        title = temp[0];
        type = temp[1];
    } else {
        alert("erreur media" + picture.id)
    }

    var a, b, c, c0, c1, c10, c11;

    a = document.createElement("DIV");
    a.setAttribute("class", "container_carte_photo");

    let indice = "";
    if (id == 930) {
        indice = "2";
    }

    if (type == "photo") {
        b = document.createElement("DIV");
        b.id = picture.id;
        // console.log(picture.id);
        // console.log(b.id);
        setAttributes(b, { "class": "square_photo galerie_onclick", "style": "background-image: url('Sample_Photos/" + id + "/" + indice + link + "')" });
    } else if (type == "video") {
        // b = document.createElement("DIV");
        // b.setAttribute("class","square_photo");
        b = document.createElement("VIDEO");
        b.id = picture.id;
        // console.log(b);
        // console.log(b.id);
        setAttributes(b, { "class": "square_video galerie_onclick", "src": "Sample_Photos/" + id + "/" + link + "", "controls": "" });
        // b.appendChild(b0);
    }

    c = document.createElement("DIV");
    c.setAttribute("class", "photo_txt");

    c0 = document.createElement("P");
    c0.innerHTML = title;
    c1 = document.createElement("DIV");

    c10 = document.createElement("P");
    c10.innerHTML = picture.price + " €";
    c11 = document.createElement("P");
    c11.innerHTML = picture.likes + " hearts";

    c1.appendChild(c10);
    c1.appendChild(c11);
    c.appendChild(c0);
    c.appendChild(c1);
    a.appendChild(b);
    a.appendChild(c);

    const base = document.getElementById("collection_photos");
    base.appendChild(a);

    const media = document.getElementsByClassName("galerie_onclick");
    const media_array = Object.values(media);

    media_array.forEach(elt => {
        elt.addEventListener("click", launch_galerie);
    });

};

function clean_name_plus_type(title) {

    var type;

    if (title.match(".mp4")) {
        type = "video";
        title = title.substring(title.indexOf('_') + 1);
        title = title.replaceAll("_", " ");
        title = title.substring(0, title.indexOf('.mp4'));
        title = add_space(title);
    } else if (title.match(".jpg")) {
        type = "photo"
        title = title.substring(title.indexOf('_') + 1);
        title = title.replaceAll("_", " ");
        title = title.substring(0, title.indexOf('.jpg'));
        title = add_space(title);
    } else { type = false }

    return [title, type];
}



function add_space(title) {
    const regexp = /\S[A-Z]/;
    if (title.match(regexp) !== null) {
        title.indexOf(title.match(regexp));
        var left = title.substring(0, title.indexOf(title.match(regexp)) + 1);
        var right = title.substring(title.indexOf(title.match(regexp)) + 1);
        title = left + ' ' + right;
        add_space(title);
    }
    return title
}