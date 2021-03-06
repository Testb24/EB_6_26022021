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
    let tag = this.innerHTML;
    tag = tag.replace('#', '');
    if (window.location.pathname.match("index.html") === null) {
        let urla = window.location.origin;
        for (var i = 0; i < window.location.pathname.split('/').length - 2; i++) {

            urla += "/" + window.location.pathname.split('/')[i + 1];
        }
        urla += "/index.html?tag=" + tag;

        window.location.href = urla;

    }

    fetch("./folder.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            if (active_tag(tag.toLowerCase())) {
                tag = false;
            };
            index(data.photographers, tag);
            // console.log("=============================================")
            // console.log("ancestorOrigins : " + window.location.ancestorOrigins);
            // console.log("href     : " + window.location.href);
            // console.log("protocol : " + window.location.protocol);
            // console.log("host     : " + window.location.host);
            // console.log("hostname : " + window.location.hostname);
            // console.log("port     : " + window.location.port);
            // console.log("pathname : " + window.location.pathname);
            // console.log("search   : " + window.location.search);
            // console.log("hash     : " + window.location.hash);
            // console.log("origin   : " + window.location.origin);


            window.history.pushState(window.location.origin + window.location.pathname, '', '?tag=' + tag);

        });

};

function active_tag(tag) {

    let no_tag = false;
    const tag1 = document.getElementsByClassName("link");
    const temp_tag1 = Object.values(tag1);

    for (var i = 0; i < temp_tag1.length; i++) {
        tag = tag.replace('#', '');
        let temp_tag_with = "#" + tag;

        if (temp_tag1[i].innerHTML.toLowerCase() == temp_tag_with ||
            temp_tag1[i].innerHTML.toLowerCase() + 's' == temp_tag_with ||
            temp_tag1[i].innerHTML.toLowerCase() == temp_tag_with + 's') {

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
        if (elt.innerHTML.toLowerCase() != "#" + tag &&
            elt.innerHTML.toLowerCase() != "#" + tag + 's' &&
            elt.innerHTML.toLowerCase() + 's' != "#" + tag) {
            elt.setAttribute("class", "link");
        }
    });

    return no_tag;
}

function index(photographers, tag) {
    const number_photographer = photographers.length;
    const placeto = document.getElementById("collection_photographes");
    if (placeto !== null) {
        placeto.innerHTML = "";
    }
    for (i = 0; i < number_photographer; i++) {
        if (tag != false) {
            tag = tag.replace('#', '');
            if (photographers[i].tags.includes(tag.toLowerCase())
                || photographers[i].tags.includes(tag.toLowerCase() + 's')
                || photographers[i].tags.includes(tag.substring(0, tag.length - 1).toLowerCase())) {
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


function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}