"use.strict";

fetch("./folder.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        index(data.photographers);
    });

function index(photographers) {
    const number_photographer = photographers.length;
    for (i=0;i<number_photographer;i++) {
        // console.log(photographers[i]);
        create_carte_photographe(photographers[i]);
    }
};

function create_carte_photographe(photographe) {
    let a,b,b0,b1,c,c0,c1,c2,d,d0;
    a = document.createElement("DIV");
    a.setAttribute("class","container_ALL");

    b = document.createElement("A");
    b.setAttribute("class","under_part_img");
    b.setAttribute("href","");
    setAttributes(b,{"class": "under_part_img", "href": "page_2.html?photographe="+photographe.id})

    b0 = document.createElement("DIV");
    setAttributes(b0,{"class": "square","style": "background-image: url('Sample_Photos/Photographers_ID_Photos/"+photographe.portrait+"')"});
    b1 = document.createElement("H2");
    b1.setAttribute("class", "index_photographe");
    b1.innerHTML = photographe.name;
    b.appendChild(b0);
    b.appendChild(b1);

    c = document.createElement("DIV");
    c.setAttribute("class","under_part_txt");
    c0 = document.createElement("H3");
    c0.innerHTML = photographe.city +", "+photographe.country;    
    c1 = document.createElement("p");
    c1.innerHTML = photographe.tagline;    
    c2 = document.createElement("p");
    c2.setAttribute("class", "price");
    c2.innerHTML = photographe.price+"€/jour";
    c.appendChild(c0);
    c.appendChild(c1);
    c.appendChild(c2);

    d = document.createElement("DIV");
    d.setAttribute("class","under_part_link");
    photographe.tags.forEach(element => {
        d0 = document.createElement("P");
        d0.setAttribute("class", "link");
        d0.innerHTML="#"+element;
        d.appendChild(d0);
    });

    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);
    // console.log(a);

    
    const placeto = document.getElementById("collection_photographes");
    if (placeto !== null){
    placeto.appendChild(a);
    }
};

function image() {

};

function setAttributes(el,attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}