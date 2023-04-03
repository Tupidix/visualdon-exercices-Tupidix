import { json } from "d3-fetch";
import { select } from "d3-selection";
//URL posts: https://jsonplaceholder.typicode.com/posts
//URL utilisateurs: https://jsonplaceholder.typicode.com/users

let tableauPost = [];

let utilisateursInfo = [];

let tableauNombrePostUtilisateurs = [];

json("https://jsonplaceholder.typicode.com/users").then(function (data) {
	console.log(data);
	json("https://jsonplaceholder.typicode.com/posts").then(function (dataPost) {
		console.log(dataPost);
		tableauPost = dataPost;
		let nbrPost = 0;

		data.forEach((numero) => {
			const idUtilisateur = numero.id;
			let tableauPostUtilisateur = [];
			tableauPost.forEach((element) => {
				if (idUtilisateur == element.userId) {
					tableauPostUtilisateur.push(`'${element.title}'`);
				}
			});
			nbrPost = tableauPostUtilisateur.length;
			tableauNombrePostUtilisateurs.push(nbrPost);
			const bloc = `{
			nom_utilisateur: '${numero.name}',
			ville: '${numero.address.city}',
			nom_companie: '${numero.company.name}',
			titres_posts: [${tableauPostUtilisateur}]
		  }`;
			//console.log(bloc);
			utilisateursInfo.push(bloc);
		});
		console.log(utilisateursInfo);
		console.log(tableauNombrePostUtilisateurs);

		data.forEach((numero) => {
			let i = 0;
			let nbrPoste = tableauNombrePostUtilisateurs[i];
			select("body")
				.append("p")
				.text(`${numero.username} a posté ${nbrPoste} posts`);
			i = i + 1;
		});

		let textMax = "";
		let idUtilisateurMaxText = 0;

		dataPost.forEach((post) => {
			if (textMax == "") {
				textMax = post.body;
			}
			if (textMax.length < post.body.length) {
				textMax = post.body;
				idUtilisateurMaxText = post.userId;
			}
		});
		console.log(idUtilisateurMaxText);
		console.log(textMax);

		select("body")
			.append("p")
			.text(
				`${data[idUtilisateurMaxText - 1].username} a écrit le plus long post`
			);

		select("body")
			.append("div")
			.attr("width", "1500px")
			.attr("height", "290px")
			.attr("id", "graphique");
		console.log(data.length);

		select("body")
			.append("div")
			.attr("width", "1500px")
			.attr("id", "zoneGraphique")
			.style("display", "flex");
		console.log(data.length);

		data.forEach((personne) => {
			select("#zoneGraphique")
				.append("g")
				.attr("id", `group${personne.id}`)
				.style("margin", "20px")
				.append("svg")
				.attr("id", `svg${personne.id}`)
				.attr("width", "125px")
				.attr("height", "300px");
		});

		data.forEach((personne) => {
			select(`#svg${personne.id}`)
				.selectAll("rect")
				.data(tableauNombrePostUtilisateurs)
				.join((enter) =>
					enter
						.append("rect")
						.attr("id", `rect${personne.id}`)
						.attr("width", "125px")
						.attr("height", (d) => d * 20)
						.attr("x", (d, i) => i * 120)
						.attr("y", (d) => 100 - d)
						.attr("id", (d, i) => `rect${i + 1}`)
				);
			select(`#group${personne.id}`)
				.append("p")
				.text(`${personne.username}`)
				.style("text-align", "center");

			select(`#texteGraphique`)
				.style("display", "flex")
				.append("p")
				.style("width", "115px")
				.style("text-align", "center")
				.text(`${personne.username}`);
		});
	});
});
