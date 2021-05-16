const database = firebase.database();
const newBtn = document.getElementById("nuevaTarea");
const newTarea = document.getElementById("descripcionTarea");
const tareas = document.getElementById("toDoContent");
const tareasDoing = document.getElementById("doingContent");
const tareasDone = document.getElementById("doneContent");
const body = document.getElementsByClassName("colTarea");

let col;
let valor;

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

let counter = 0;

database.ref("Quiz2/toDo").on("value", function (data) {
  tareas.innerHTML = "";
  data.forEach((nuevaTarea) => {
    valor = nuevaTarea.val();
    col = new tarea(valor);
    tareas.appendChild(col.render());
    
    for (let i = 0; i < body.length; i++) {
      let variable = body[i].id === valor.id;
      if (variable == false) {

      }
    }
  });
});

database.ref("Quiz2/doing").on("value", function (data) {
  tareasDoing.innerHTML = "";
  data.forEach((nuevaTarea) => {
    let valor = nuevaTarea.val();
    col = new tarea(valor);
    tareasDoing.appendChild(col.render());
  });
});

database.ref("Quiz2/done").on("value", function (data) {
  tareasDone.innerHTML = "";
  data.forEach((nuevaTarea) => {
    let valor = nuevaTarea.val();
    col = new tarea(valor);
    tareasDone.appendChild(col.render());
  });
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
