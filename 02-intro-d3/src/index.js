import {select} from "d3-selection";

// C'est ici que vous allez écrire les premières lignes avec d3.js!
const cercle1 = select('body')
.append("svg")
.attr("width", "1000px")
.attr("height", "400px")
.append("circle")
.attr("cx", "50px")
.attr("cy", "50px")
.attr("r", "40px")
.attr("id", "premierCercle");

const cercle2 = select("svg")
.append("circle")
.attr("cx", "150px")
.attr("cy", "150px")
.attr("r", "40px")
.attr("id", "deuxiemeCercle");

const cercle3 = select("svg")
.append("circle")
.attr("cx", "250px")
.attr("cy", "250px")
.attr("r", "40px")
.attr("id", "troisiemeCercle")
//évènement quand on clique sur le 3ème cercle ça alligne les autres.
.on('click', function () {
cercle1.attr("cx", "400px");
cercle2.attr("cx", "400px");
cercle3.attr("cx", "400px");
});

//Changer la couleur du deuxieme cercle déplacer vers la droite le 1er et 2ème cercle vers la droite.
cercle2.attr("fill", "green")
.attr("cx", "200px");

cercle1.attr("cx", "100px");

//tableaux hauteurs rectangles
const hauteurRectangles = [20, 5, 25, 8, 15];

select("body")
.append("svg")
.attr("width", "1000px")
.attr("height", "1000px")
.attr("id", "graphique");

select("#graphique")
.selectAll("rect")
.data(hauteurRectangles)
.join(enter => enter
    .append("rect")
    .attr("width", "20px")
    .attr("height", d => d)
    .attr("x", (d, i) => i*25)
    .attr("y", d=> 25-d)
    );