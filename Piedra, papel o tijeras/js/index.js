"use strict";
	
const retry = document.querySelector('.retry')
const opciones = document.querySelectorAll('.opcion');
const imgPlayer = document.getElementById('py1-img');
const imgComputer = document.getElementById('computer-img');
const winners = document.querySelector('.victory');

let ganadas = 0, perdidas = 0, jugadas = 0;
let termino = false;

opciones.forEach(item =>{
	item.addEventListener('click',()=>{
		if (!termino) {
			let arrayElementsShow = ['#py1-img','#computer-img','.pre-resultado'];
			showElements(...arrayElementsShow);
			// Obteniendo el valor de la imagen seleccionada e insertandola en el jugador
			let valor = item.getAttribute('src');
			let alt = item.getAttribute('alt')

			imgPlayer.setAttribute('src',valor);
			imgPlayer.setAttribute('alt',alt);
			changeImgComputer();
			
			// Obteniendo el valor de alt de la imagen del jugador y la computadora
			let altComputer = imgComputer.getAttribute('alt');
			let altPlayer = imgPlayer.getAttribute('alt');
			victory(altPlayer,altComputer);
		}
	})
})
// Cambiando una opcion aleatoria de la computadora 
function changeImgComputer() {
	let piedra = 'assets/images/piedra.png';
	let tijeras = 'assets/images/tijeras.png';
	let papel = 'assets/images/papel.png';

	let opc = 1 + Math.random()*300;
	opc = Math.floor(opc);
	
	if (opc <= 100) {
		imgComputer.setAttribute('src',piedra);
		imgComputer.setAttribute('alt','piedra');
	} 
	else if (opc > 100 && opc <= 200) {
		imgComputer.setAttribute('src',papel);
		imgComputer.setAttribute('alt','papel');
	} 
	else {
		imgComputer.setAttribute('src',tijeras);
		imgComputer.setAttribute('alt','tijeras');
	}
}

function victory(namePlayer,nameComputer) {
	// Winning player
	if (namePlayer == 'piedra' && nameComputer == 'tijeras') {
		ganadas++;
		jugadas++;
		retry.innerHTML = 'Tu ganas escogiendo Piedra en contra de Tijeras';
	}
	else if (namePlayer == 'tijeras' && nameComputer == 'papel') {
		ganadas++;
		jugadas++;
		retry.innerHTML = 'Tu ganas escogiendo Tijeras en contra de Papel';
	} 
	else if (namePlayer == 'papel' && nameComputer == 'piedra') {
		ganadas++;
		jugadas++;
		retry.innerHTML = 'Tu ganas escogiendo Papel en contra de Piedra';
	}

	// Lousing player
	if (nameComputer == 'piedra' && namePlayer == 'tijeras') {
		perdidas++;
		jugadas++;
		retry.innerHTML = 'La computadora gana escogiendo Piedra en contra de Tijeras';
	}
	else if (nameComputer == 'papel' && namePlayer == 'piedra') {
		perdidas++;
		jugadas++;
		retry.innerHTML = 'La computadora gana escogiendo Papel en contra de Piedra';
	} 
	else if (nameComputer == 'tijeras' && namePlayer == 'papel') {
		perdidas++;
		jugadas++;
		retry.innerHTML = 'La computadora gana escogiendo Tijeras en contra de Papel';
	}
	if (nameComputer == namePlayer) {
		retry.innerHTML = '¡EMPATE!';
	}
	if (jugadas == 3) {
		winners.innerHTML = `Ganadas: ${ganadas}. Perdidas: ${perdidas}`;
		termino = true, jugadas = 0, ganadas = 0, perdidas = 0;
		
		let arrayElementsShow = ['#try-new','#resultado','.retry-container','.show'];
		showElements(...arrayElementsShow);
	}
}

document.getElementById('try-new').addEventListener('click',()=>{
	termino = false;
	let arrayElementsHide = ['#try-new','#py1-img','#computer-img','.show','.pre-resultado','#resultado'];
	hideElements(...arrayElementsHide);
	window.scroll(0,0);
})

function showElements(...selectores) {
	for(let selector of selectores){
		document.querySelector(selector).removeAttribute('hidden');
	}
}

function hideElements(...selectores){
	for (let selector of selectores){
		document.querySelector(selector).hidden = 'true';
	}
}