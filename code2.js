"use.strict";

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
console.log(window.location.origin);
console.log(window.location.pathname);

function find_tag() {
    let params_index = new URLSearchParams(document.location.search.substring(1));
    let tag_url = params_index.get("tag");
    if (tag_url === null || tag_url == "false") {
        tag_url = false;
    } else {
        tag_url = '#' + tag_url
    }
    return tag_url;
}
function reload() {
    var tag = this.innerHTML;

    // const tag = document.getElementsByClassName("link");
    // const temp_tag = Object.values(tag);
    // temp_tag.forEach(link => {
    //     link.addEventListener("click", active_tag)
    // });

    fetch("./folder.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            if (active_tag(tag.toLowerCase())) {
                tag = false;
            };
            index(data.photographers, tag);
            if (tag != false) {
                tag = tag.substring(1);
            }
            console.log(window.location.origin);
            console.log(window.location.pathname);
            console.log(window.location.origin + window.location.pathname);
            console.log("aaa");
            if (window.location.origin == "https://testb24.github.io") {
                console.log("bbb");
                var temp_url = window.location.origin + window.location.pathname;
                console.log(temp_url);
                window.history.pushState(temp_url, '', '?tag=' + tag);
            } else {
                window.history.pushState(window.location.origin + window.location.pathname, '', '/index.html?tag=' + tag);
            }
            // window.history.pushState("https://testb24.github.io/EB_6_26022021/index.html", '', '/index.html?tag=' + tag);
        });

};

function active_tag(tag) {
    let no_tag = false;

    const tag1 = document.getElementsByClassName("link");
    const temp_tag1 = Object.values(tag1);

    for (var i = 0; i < temp_tag1.length; i++) {
        if (temp_tag1[i].innerHTML.toLowerCase() == tag ||
            temp_tag1[i].innerHTML.toLowerCase() + 's' == tag ||
            temp_tag1[i].innerHTML.toLowerCase() == tag + 's') {
            if (!temp_tag1[i].classList.contains("active_tag")) {
                temp_tag1[i].setAttribute("class", "active_tag link");
            } else {
                temp_tag1[i].setAttribute("class", "link");
                no_tag = true;
            }

        }
    }

    const tag_actif = document.getElementsByClassName("active_tag");
    const temp_tag_actif = Object.values(tag_actif);

    temp_tag_actif.forEach(elt => {
        if (elt.innerHTML.toLowerCase() != tag &&
            elt.innerHTML.toLowerCase() != tag + 's' &&
            elt.innerHTML.toLowerCase() + 's' != tag)
            elt.setAttribute("class", "link");
    });

    return no_tag;
}


// const button_test = document.getElementsByClassName("button_lvl_selector");
// const temp = Object.values(button_test);

// temp.forEach(link => {
//     link.addEventListener("click", calcul)
// });



function index(photographers, tag) {
    const number_photographer = photographers.length;
    const placeto = document.getElementById("collection_photographes");
    if (placeto !== null) {
        placeto.innerHTML = "";
    }
    for (i = 0; i < number_photographer; i++) {
        if (tag != false) {
            var tag_temp = tag.substring(1);
            if (photographers[i].tags.includes(tag_temp.toLowerCase())
                || photographers[i].tags.includes(tag_temp.toLowerCase() + 's')
                || photographers[i].tags.includes(tag_temp.substring(0, tag_temp.length - 1).toLowerCase())) {
                create_carte_photographe(photographers[i]);
            }
        } else {
            create_carte_photographe(photographers[i]);
        }
    }
    const tag_2 = document.getElementsByClassName("link");
    const temp_tag = Object.values(tag_2);
    temp_tag.forEach(link => {
        link.addEventListener("click", reload)
    });
};

function create_carte_photographe(photographe) {
    let a, b, b0, b1, c, c0, c1, c2, d, d0;
    a = document.createElement("DIV");
    a.setAttribute("class", "container_ALL");

    b = document.createElement("A");
    b.setAttribute("class", "under_part_img");
    b.setAttribute("href", "");
    let indice = "";

    setAttributes(b, { "class": "under_part_img", "href": "page_2.html?photographe=" + photographe.id })

    b0 = document.createElement("DIV");
    setAttributes(b0, { "class": "square", "style": "background-image: url('Sample_Photos/Photographers_ID_Photos/" + photographe.portrait + "')" });
    b1 = document.createElement("H2");
    b1.setAttribute("class", "index_photographe");
    b1.innerHTML = photographe.name;
    b.appendChild(b0);
    b.appendChild(b1);

    c = document.createElement("DIV");
    c.setAttribute("class", "under_part_txt");
    c0 = document.createElement("H3");
    c0.innerHTML = photographe.city + ", " + photographe.country;
    c1 = document.createElement("p");
    c1.innerHTML = photographe.tagline;
    c2 = document.createElement("p");
    c2.setAttribute("class", "price");
    c2.innerHTML = photographe.price + "€/jour";
    c.appendChild(c0);
    c.appendChild(c1);
    c.appendChild(c2);

    d = document.createElement("DIV");
    d.setAttribute("class", "under_part_link");
    photographe.tags.forEach(element => {
        d0 = document.createElement("P");
        d0.setAttribute("class", "link");
        d0.innerHTML = "#" + element;
        d.appendChild(d0);
    });

    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);


    const placeto = document.getElementById("collection_photographes");
    if (placeto !== null) {
        // placeto.innerHTML = "";
        placeto.appendChild(a);
    }
};

function image() {

};

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}