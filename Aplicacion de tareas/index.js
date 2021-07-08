class Task {
	constructor(title,descripcion,date){
		let id = 1 + Math.random() * 99999999;
		id = Math.floor(id);
		this.id = id;
		this.title = title;
		this.description = descripcion;
		this.date = date;
	}
}

const titleTask = document.querySelector('#titleTask');
const descriptionTask = document.querySelector('#dct');
const taskBody = document.querySelector('.task-body');
const clearTask = document.querySelectorAll('.deleteTask');

let tasks = [];

/* Obteniendo el array vacio para almacenar a la tareas, si la respuesta es con 
un valor null (significa que nunca se ha insertado el array vacio) tiene que insertar
un nuevo array para almacenar la tareas */

let res = JSON.parse(localStorage.getItem('tasks'));

if (res == null) {
	localStorage.setItem('tasks',JSON.stringify(tasks));
}
else {
	addTask();
}

const buscador = document.querySelector('#buscador');
buscador.addEventListener('keyup',buscarTarea)

document.querySelector('#taskAddBtn').addEventListener('click',()=>{
	let errors = verificarDatos(titleTask.value.trim(),descriptionTask.value.trim());

	if (errors != '') {
		alert(errors);
	}
	else {
		let date = getDate();
		// Si no hay errores el usuario podra añadir su tarea
		addLocalStorage(titleTask.value.trim(),descriptionTask.value.trim(),date);
		titleTask.value = '', descriptionTask.value = '';
		addTask();
	}
})

function getDate() {
	let date = new Date();
	let horas = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	let dia = date.getDate();
	let mes = date.getMonth() + 1;
	let año = date.getFullYear();
	
	let dateFull = `${dia}-${mes}-${año} a las ${horas}`;
	return dateFull;
}

function addLocalStorage(title,descripcion,date) {
	let data = JSON.parse(localStorage.getItem('tasks'));
	data.push(new Task(title,descripcion,date));
	localStorage.setItem('tasks',JSON.stringify(data));
}

function verificarDatos(title,descripcion) {
	let errors = ''

	if (title == '' || descripcion == '') {
		errors = 'Faltan Datos necesarios';
	}

	return errors;
}

function addTask() {
	let data = JSON.parse(localStorage.getItem('tasks'));
	let codeHTML = '';

	/* Nota: En el contenedor de la tarea ("card") agregue un id del titulo de la tarea
	para cuando el usuario ingrese lo que quiere buscar y si concide con el id del contendor
	la pagina ira hasta donde el usuario le pidio */

	for (let i = data.length - 1; i >= 0; i--) {
		codeHTML+= `<div class="card ${data[i].id}" id="${data[i].title}">
					<div class="card-header">${data[i].title}</div>
					<div class="card-body">${data[i].description}</div>
					<div class="card-footer">
						<input type="button" value="Borrar" class="deleteTask">
						<p class="date">${data[i].date}</p>
					</div>
				</div>`
	}
	taskBody.innerHTML = codeHTML;

	/* Nota: Tuve que hacer otra funcion dentro de esta funcion para poder obtener
	en tiempo real todos los selectores de del boton para eliminar la tarea porque
	antes cuando se agregaba una tarea nueva y se queria elimnar no se podia, pero si las demas*/

	function buscarSelectores () {
		const selectores = document.querySelectorAll('.deleteTask');
		selectores.forEach(item => {
			item.addEventListener('click',()=>{
				deleteTask(item);
			})
		})
	}

	buscarSelectores();
}

function buscarTarea(event) {
	const anclas = document.querySelectorAll('.card');
	let key = event.key;

	if (key == 'Enter') {
		anclas.forEach(ancla => {
			let href = ancla.getAttribute('id');
			let res = buscador.value.toLowerCase().trim();
			res = res.split(' ');
			
			for (palabra of res) {
				if (href.toLowerCase().includes(palabra)) {
					window.location.href = `#${href}`;
					tareaEncontrada(ancla);
					break;
				}
			}
		})
	}
}

function deleteTask(item) {
	// Busco el contenedor padre del boton con la clase determinada
	let contenedor = item.closest('.card');
	let clase = contenedor.classList.item("1");
	let data = JSON.parse(localStorage.getItem('tasks'));
	let dat = [];
	// Eliminando la tarea seleccionada
	if (data.length > 0) {
		for (let d in data) {
			if (data[d].id != clase) {
				dat.push(data[d]);
			}
		}
	}
	taskBody.removeChild(contenedor);
	localStorage.setItem('tasks',JSON.stringify(dat));
}

function tareaEncontrada(cont) {
	cont.style.animation = 'beat 1s 3';
}