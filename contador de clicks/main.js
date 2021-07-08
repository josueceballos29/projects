const btnClicks = document.querySelector('.btn');
const resultado = document.querySelector('.resultado');
const modalBackground = document.querySelector('.background-modal');
const totalClicks = document.querySelector('.totalClicks');
const retry = document.querySelector('.modal-accept');
let contador = 0;
let total = 0;

// Modos
const modoActual = document.querySelector('.modo');
const opciones = document.querySelectorAll('.opcion');
const menu = document.querySelector('.menu');

// Eligiendo la opcion y actualizando el modo
opciones.forEach(opcion =>{
	opcion.addEventListener('click',()=>{
		modoActual.innerHTML = `Modo actual: <b>${opcion.innerHTML}</b>`;
	})
})

const mensajeModo = document.querySelector('.empieza');

btnClicks.addEventListener('click', ()=>{
	contador++;
	resultado.innerHTML = contador;
	let timeFinal = cambiarTemporizador(modoActual);
	
	if (contador == 1) {
		menu.setAttribute('hidden','true');
		mensajeModo.removeAttribute('hidden');

		setTimeout(()=>{
				total = calcularClicks(contador,timeFinal);
				abrirModal(totalClicks,total); // Dando el resultado total
		},timeFinal);
	}
}) 

retry.addEventListener('click',()=>{
	modalBackground.setAttribute('hidden','true');
	mensajeModo.setAttribute('hidden','true');
	contador = 0;
	resultado.innerHTML = contador;
	menu.removeAttribute('hidden');
})

const cambiarTemporizador = (mode) => {
	if (mode.innerText.toLowerCase() == 'modo actual: clicks en 10 segundos') {
		return 10000;
	} 
	else if (mode.innerText.toLowerCase() == 'modo actual: clicks en 5 segundos') {
		return 5000;
	} 
	else if (mode.innerText.toLowerCase() == 'modo actual: clicks en 60 segundos') {
		return 60000;
	}
}

const calcularClicks = (contador,time) =>{
		if (time == 10000) {
			return contador / 10;
		}
		else if (time == 5000) {
			return contador / 5;
		}
		else if (time == 60000) {
			return contador / 60;
		}
	}

const abrirModal = (adventencia,total) => {
	modalBackground.removeAttribute('hidden');
	adventencia.innerHTML = `${total} click/s`
}