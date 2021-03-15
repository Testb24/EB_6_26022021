"use.strict";

fetch("./folder.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data){
        let id = find_photographer(data.photographers);
        build_collection(id, data.media);
    });

function find_photographer(photographers) {
    let params = new URLSearchParams(document.location.search.substring(1));
    let photographe = params.get("photographe");

    for (i=0;i<photographers.length;i++) {

        if (photographers[i].id == photographe) {
            // console.log(photographers[i]);
            build_top(photographers[i]);
            return photographers[i].id
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

function build_collection(id,media) {

    console.log("aaa");
    console.log(id);
    console.log(media);

    for (var i = 0;media.length;i++){
        if (media[i].photographerId == id){
            build_picture(media[i]);
        }
    }
};

function build_picture(picture) {
 
    var a, b, c, c0, c1, c10, c11;

    a = document.createElement("DIV");
    a.setAttribute("class", "container_carte_photo");

    b = document.createElement("DIV");
    setAttributes(b, {"class":"square_photo","style":"background-image: url('/Sample_Photos//MimiKeel.jpg')"});

    c = document.createElement("DIV");
    c.setAttribute("class","photo_txt");

    c0 = document.createElement("P");
    c0.innerHTML = 
    c1 = document.createElement("DIV");

    c10 = document.createElement("P");
    c11 = document.createElement("P");

    c1.appendChild(c10);
    c1.appendChild(c11);
    c.appendChild(c0);
    c.appendChild(c1);
    a.appendChild(b);
    a.appendChild(c);

    const base = document.getElementById("collection_photos");
    base.appendChild(a);

    console.log(a);

};


{/* <div class="container_carte_photo">A
    <div class="square_photo" B
        style="background-image: url('/Sample_Photos/Photographers_ID_Photos/MimiKeel.jpg')">
    </div>
    <div class="photo_txt"> C
        <p>Solitude</p>     C0
        <div>            C1
            <p>70 €</p>    C10
            <p>12 <3</p>   C11
        </div>
    </div>
</div> */}