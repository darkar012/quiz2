const database = firebase.database();
const newBtn = document.getElementById("nuevaTarea");
const newTarea = document.getElementById("descripcionTarea");
const tareas = document.getElementById("toDoContent");
const tareasDoing = document.getElementById("doingContent");
const tareasDone = document.getElementById("doneContent");
const toDo = document.getElementsByClassName("colTarea");
const doing = document.getElementsByClassName("colTareaD");
const done = document.getElementsByClassName("colTareaDo");


let valor;
let counter = 0;
let arrayt = [];
let arrayd = [];
let arraydo = [];


let chosen = false;

const register = () => {
  if (newTarea.value == "") {
    alert("Hay un campo vacio");
    return;
  }
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let fecha = null;

  if (month < 10) {
    fecha = `${day}-0${month}-${year}`;
  } else {
    fecha = `${day}-${month}-${year}`;
  }

  let tipo = "toDo";

  let referencia = database.ref("Quiz2/toDo").push();
  let nuevaTarea = {
    id: referencia.key,
    tarea: newTarea.value,
    fecha: fecha,
    tipo: tipo,
  };
  referencia.set(nuevaTarea);
  newTarea.value = "";
};

newBtn.addEventListener("click", register);

let col;
database.ref("Quiz2/toDo").on("value", function (data) {
  counter = 0;
  arrayt = [];
  tareas.innerHTML = "";
  data.forEach((nuevaTarea) => {
    valor = nuevaTarea.val();
    col = new tarea(valor);
    tareas.appendChild(col.render());
    arrayt.push(valor.id+", "+valor.fecha+", "+ valor.tarea);
  });
  for (let i = 0; i < toDo.length; i++) {
    let r = arrayt[0 + counter];
    let f = r.split(",");
    toDo[0 + counter].id = f[0];
    counter++;
    toDo[i].addEventListener("dragend", () => {
      col.setId(arrayt[i]);
      col.position();
    });
  }
});

database.ref("Quiz2/doing").on("value", function (data) {
  counter = 0;
  arrayd = [];
  tareasDoing.innerHTML = "";
  data.forEach((nuevaTarea) => {
    let valor = nuevaTarea.val();
    col = new tarea(valor);
    tareasDoing.appendChild(col.render());
    arrayd.push(valor.id+", "+valor.fecha+", "+ valor.tarea);
  });
  for (let i = 0; i < doing.length; i++) {
    let r = arrayd[0 + counter];
    let f = r.split(",");
    doing[0 + counter].id = f[0];
    counter++;
    doing[i].addEventListener("dragend", () => {
      col.setId(arrayd[i]);
      col.position();
    });
  }
});

database.ref("Quiz2/done").on("value", function (data) {
  counter = 0;
  arraydo = [];
  tareasDone.innerHTML = "";
  data.forEach((nuevaTarea) => {
    let valor = nuevaTarea.val();
    col = new tarea(valor);
    tareasDone.appendChild(col.render());
    arraydo.push(valor.id+", "+valor.fecha+", "+ valor.tarea);
  });
  for (let i = 0; i < done.length; i++) {
    let r = arraydo[0 + counter];
    let f = r.split(",");
    done[0 + counter].id = f[0];
    counter++;
    done[i].addEventListener("dragend", () => {
      col.setId(arraydo[i]);
      col.position();
    });
  }
});

Sortable.create(tareas, {
  group: {
    name: "lista-tareas",
  },
  animation: 300,
  easing: "cubic-bezier(0.5, 0, 0.75, 0)",
  handle: ".fas",
  chosenClass: "active",
});

Sortable.create(tareasDoing, {
  group: {
    name: "lista-tareas",
  },
  animation: 300,
  easing: "cubic-bezier(0.5, 0, 0.75, 0)",
  handle: ".fas",
  chosenClass: "active",
});

Sortable.create(tareasDone, {
  group: {
    name: "lista-tareas",
  },
  animation: 300,
  easing: "cubic-bezier(0.5, 0, 0.75, 0)",
  handle: ".fas",
  chosenClass: "active",
});
