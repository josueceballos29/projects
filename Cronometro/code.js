let timeStart, timeEnds, total, res;
const tiempo = document.querySelector('#tiempo')
let temporizador;
let seconds = 0;

document.querySelector('.start').addEventListener('click', ()=>{
	iniciarTemporizador();
	hideElements('.start');
	showElements('#addQuee','.stop');
})

let cont = 0;

document.querySelector('#addQuee').addEventListener('click',()=>{
	showElements('.colas');
	cont++;
	document.querySelector('#queeBody').innerHTML += `<p>${cont} - ${tiempo.innerText}</p>`
})

document.querySelector('.stop').addEventListener('click', ()=>{
	pararTemporizador();
	hideElements('.stop','#addQuee');
	showElements('.reiniciar');
})

document.querySelector('.reiniciar').addEventListener('click',()=>{
	showElements('.start');
	hideElements('.reiniciar','#addQuee','.colas');
	tiempo.innerText = '0.00';
	cont = 0;
	document.querySelector('#queeBody').innerHTML = '';
})

function hideElements (...selectores) {
	for (let selector of selectores){
		document.querySelector(selector).hidden = 'true';
	}
}

function showElements (...selectores) {
	for (let selector of selectores) {
		document.querySelector(selector).removeAttribute('hidden');
	}
}

function iniciarTemporizador (){
	timeStart = Date.now();
	
	temporizador = setInterval(()=>{
		timeEnds = Date.now();
		total = (timeEnds - timeStart) / 1000;
		seconds = total;
		total = total.toString().split('');
		total.pop();
		res = total.join('');
		tiempo.innerText = res;
	})

}

function pararTemporizador(){
	setTimeout(()=>{
		clearInterval(temporizador);
	})
}