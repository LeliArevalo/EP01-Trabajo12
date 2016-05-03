window.onload = function()
{
	var ancho = window.innerWidth;
	var alto = window.innerHeight;
	var lienzo = new THREE.WebGLRenderer({alpha: true});
	var planetas= [{tamano 	: 3.4,
								 imagen	: 'img/mercurio.jpg',
								 x : -250,
								 objeto:0
								},
								{	tamano 	:8.4,
									imagen	: 'img/venus.jpg',
									x : -150,
									objeto:0
								},
								{	tamano 	: 8.9,
									imagen	: 'img/tierra.jpg',
									x : -30,
									objeto:0
								},
								{	tamano 	: 4.7,
									imagen	: 'img/marte.jpg',
									x : 90,
									objeto:0
								}
							];
	lienzo.setSize(ancho, alto);
	document.body.appendChild(lienzo.domElement);
	var escena 		  = new THREE.Scene,
		tamanoJupiter = 300;
	var crearPlaneta = function(data)
	{
		var geometria = new THREE.SphereGeometry(data.tamano,data.tamano,data.tamano);
		var textura = THREE.ImageUtils.loadTexture(data.imagen);
		var material = new THREE.MeshBasicMaterial( { map: textura } );
		return new THREE.Mesh(geometria, material);
	};

	var jupiter = crearPlaneta({
									tamano 	: tamanoJupiter,
									imagen	: 'img/jupiter.jpg'
							  }),
		escalaJupiter = true;


	escena.add(jupiter);

	for (var i = 0; i < planetas.length; i++) {
		planetas[i].objeto =	crearPlaneta({
											tamano:tamanoJupiter*(planetas[i].tamano/100),
											imagen:planetas[i].imagen});
		planetas[i].objeto.position.x=planetas[i].x;
			escena.add(planetas[i].objeto);
	}

	var camara = new THREE.PerspectiveCamera(50,(ancho / alto),0.1, 10000);
	camara.position.y = 160;
	camara.position.z = 400;
	camara.lookAt(jupiter.position);
	jupiter.position.x =500;
	escena.add(camara);
	function renderizar()
	{
		jupiter.rotation.y += 0.001;
		for (var i = 0; i < planetas.length; i++) {
			planetas[i].objeto.rotation.y += 0.01;
		}

		lienzo.render(escena, camara);
		requestAnimationFrame(renderizar);
	}
	renderizar();
};
