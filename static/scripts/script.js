

function index() {
	console.log("index");
}


function procedures() {
	console.log("procedures");
}


function news() {

	// Hacer que el alto de las noticias aumente entre mas texto tengan.


	// Vars
	let deleteMode = false;
	let newsWrapper = document.getElementById("news-wrapper");
	let news = [...document.getElementsByClassName("new")];


	// Add colors to the images
	(() => {
		const colors = ["#8AFF80", "#FFCA80", "#FF80BF", "#9580FF", "#FF9580", "#FFFF80"];
		const images = [...document.getElementsByClassName("new-image")];

		images.forEach((image) => {
			image.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		});
	})();


	// Add event listener to the delete button
	document.getElementById("delete-new-button").addEventListener("click", (event) => {
		deleteMode = !deleteMode;

		news.forEach((newElement) => {
			newElement.style.border = deleteMode ? "1px solid red": "none";
		});
	});

	// Event listener to delete a new
	news.forEach((newElement) => {
		newElement.addEventListener("click", (event) => {
			if (deleteMode) {

				// Delete new from the database
				// TODO: Migrar esto a fetch o algo asi

				let title = newElement.children[1].children[0].children[0].innerHTML;
				let content = newElement.children[1].children[1].children[0].innerHTML;

				const xhttp = new XMLHttpRequest();
				
				xhttp.onload = function () {
					if (this.status == 200) {
						newElement.remove();
					} else {
						console.log(this.responseText);
					}
				}

				xhttp.open("POST", "/api/news/delete/");
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send("title=" + title + "&content=" + content);
			}
		});
	});
	
}


function createNews() {
	const sendButton = document.getElementById("create-new-submit");

	sendButton.addEventListener("click", (event) => {
		let title = document.getElementById("create-new-title-input").value;
		let content = document.getElementById("create-new-content-input").value;

		const xhttp = new XMLHttpRequest();

		xhttp.onload = function () {

			// Idea: Mostrar una notificacion como un pop-pup desde el lateral derecho diciendo que se creo la noticia
			// Desabilitar el boton de enviar noticia hasta que se muestra la notificacion para evitar subirla 2 veces
			// Debe ser claro que el boton no puede pulsarse otra vez mientras se espera por la respuesta del servidor

			if (this.status == 200) {
				console.log("Noticia creada");
			} else {
				console.log(this.responseText);
			}
		}

		xhttp.open("POST", "/api/news/create/");
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("title=" + title + "&content=" + content);


		// Desactivar el boton de enviar para que no se dupliquen las noticias
		sendButton.style.pointerEvents = "none";

		// Redireccionar automaticamente
		setTimeout(() => {
			window.location.href = "/noticias/";
		}, "500");
	});
}



(() => {
	// Main function

	switch (window.location.pathname) {
		case "/":
			index();
			break;
		
		case "/tramites/":
			procedures();
			break;

		case "/noticias/":
			news()
			break;

		case "/noticias/crear/":
			createNews();
			break;

	}

})();
