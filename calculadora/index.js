const opcionElegida = document.querySelectorAll('.opcion')
const resultado = document.querySelector('.resultado');
let ceroPuesto = false;

opcionElegida.forEach(elegida => {
	elegida.addEventListener('click',()=>{		
		if (ceroPuesto == false) {
			resultado.innerText = '';
			ceroPuesto = true;
		}

		if (elegida.innerText == 'Borrar') {
			resultado.innerText = '';
		}
		else {
			resultado.innerText += elegida.innerText;
		}

		let suma = resultado.innerText.indexOf('+');
		let resta = resultado.innerText.indexOf('-');
		let multiplicacion = resultado.innerText.indexOf('*');
		let division = resultado.innerText.indexOf('/');
		let igual = resultado.innerText.indexOf('=');

		function declararNumeros(operador) {
			let numero1 = parseInt(resultado.innerText.substring(0,operador));
			let numero2 = parseInt(resultado.innerText.substring(operador+1,igual));
			return [numero1,numero2];	
		}
		function asignarNumeros (indiceOperacion) {
			let numeros = declararNumeros(indiceOperacion);
			num1 = parseInt(numeros[0]);
			num2 = parseInt(numeros[1]);
		}

		let total,num1,num2;

		// Añadiendo funcion para Sumar
		if (suma != -1 && igual != -1) {
				asignarNumeros(suma);
				total = num1 + num2;
				resultado.innerText = total;
		}
		// Añadiendo funcion para restar
		else if (resta != -1 && multiplicacion == -1) {
			if (igual != -1) {
				asignarNumeros(resta);
				total = num1 - num2;
				resultado.innerText = total;
			}
		}
		// Añadiendo funcion para Multiplicar
		else if (multiplicacion != -1 && igual != -1) {
				asignarNumeros(multiplicacion)
				total = num1 * num2;
				resultado.innerText = total;
		}
		// Añadiendo funcion para Dividir
		else if (division != -1 && resta == -1) {
			if (igual != -1) {
				asignarNumeros(division);
				total = num1 / num2;
				resultado.innerText = total;
			}
		}
	})
})