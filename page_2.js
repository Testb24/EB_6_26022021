"use.strict";

fetch("./folder.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        find_photographer(data.photographers);
    });

function find_photographer(photographers) {
    let params = new URLSearchParams(document.location.search.substring(1));
    let photographe = params.get("photographe");

    for (i=0;i<photographers.length;i++) {

        if (photographers[i].name == photographe) {
            // console.log(photographers[i]);
            build_top(photographers[i]);
            build_collection(photographers[i]);
        }

    }

};

// get_from_url();

// function get_from_url(url) {
//     let params = new URLSearchParams(document.location.search.substring(1));
//     let photographe = params.get("photographe"); // is the string "Jonathan"
//     console.log(photographe);

//     build_top(photographe);
//     build_collection(photographe);
// };


function build_top(photographe) {
    console.log(photographe);
    document.getElementById("name").innerHTML = photographe.name;
    document.getElementById("place").innerHTML = photographe.city + ", "+ photographe.country;
    document.getElementById("tagline").innerHTML = photographe.tagline;

    a = document.getElementById("filtres");
    photographe.tags.forEach(element => {
        a0 = document.createElement("P");
        a0.setAttribute("class", "link");
        a0.innerHTML="#"+element;
        a.appendChild(a0);
    });

    let pic = document.getElementById("picture");

    setAttributes(pic,{"class": "square_photographe","style": "background-image: url('Sample_Photos/Photographers_ID_Photos/"+photographe.portrait+"')"});
    
};

function build_collection(photographe) {

};
