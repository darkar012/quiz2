class tarea {
  constructor(nuevaTarea) {
    this.t = nuevaTarea;
    this.component = document.createElement("div");
    this.id = "";
    this.fecha = "";
    this.content = "";
  }

  render = () => {
    /* let x;
    let y;*/

    if (this.t.tipo === "toDo") {
      this.component.className = "colTarea";
    } else if (this.t.tipo === "doing") {
      this.component.className = "colTareaD";
    } else {
      this.component.className = "colTareaDo";
    }
let divbtn = document.createElement("div");
divbtn.className = "divbtn";

    let erasebtn = document.createElement("button");
    erasebtn.className = "erase";
    erasebtn.innerHTML = '<i class="far fa-minus-square fa-lg"></i>';

    let imageDrag = document.createElement("div");
    imageDrag.className = "imageDrag";
    imageDrag.innerHTML = '<i class="fas fa-grip-lines fa-lg"></i>';

    let col = document.createElement("div");
    col.className = "col";

    let fechaCont = document.createElement("div");
    fechaCont.className = "fechaCont";
    fechaCont.innerHTML = this.t.fecha;

    let tareaCont = document.createElement("div");
    tareaCont.className = "tareaCont";
    tareaCont.innerHTML = this.t.tarea;

    this.component.appendChild(imageDrag);
    col.appendChild(fechaCont);
    col.appendChild(tareaCont);
    this.component.appendChild(col);
    divbtn.appendChild(erasebtn);
    this.component.appendChild(divbtn);

erasebtn.addEventListener("click", ()=>{
  database.ref("Quiz2/toDo/" + this.t.id).remove();
  database.ref("Quiz2/doing/" + this.t.id).remove();
  database.ref("Quiz2/done/" + this.t.id).remove();
});

    return this.component;
  };

  setId = (f) => {
    let r = f.split(",");
    this.id = r[0];
    this.fecha = r[1];
    this.content = r[2];
  };

  position = () => {
    let posicion = document.getElementById(this.id).getBoundingClientRect();
    let tipo1 = "toDo";
    let tipo2 = "doing";
    let tipo3 = "done";

    console.log(posicion.left);

    if (posicion.left > 500 && posicion.left < 900) {
      let referencia = database.ref("Quiz2/doing/" + this.id);
      let nuevaTarea = {
        id: referencia.key,
        tarea: this.content,
        fecha: this.fecha,
        tipo: tipo2,
      };
      referencia.set(nuevaTarea);

      database.ref("Quiz2/toDo/" + this.id).remove();
      database.ref("Quiz2/done/" + this.id).remove();
    } else if (posicion.left < 350) {
      let referencia = database.ref("Quiz2/toDo/" + this.id);
      let nuevaTarea = {
        id: referencia.key,
        tarea: this.content,
        fecha: this.fecha,
        tipo: tipo1,
      };
      referencia.set(nuevaTarea);

      database.ref("Quiz2/done/" + this.id).remove();
      database.ref("Quiz2/doing/" + this.id).remove();

    } else if (posicion.left > 900) {
      let referencia = database.ref("Quiz2/done/" + this.id);
      let nuevaTarea = {
        id: referencia.key,
        tarea: this.content,
        fecha: this.fecha,
        tipo: tipo3,
      };
      referencia.set(nuevaTarea);

      database.ref("Quiz2/doing/" + this.id).remove();
      database.ref("Quiz2/toDo/" + this.id).remove();
    }
  };
}

getId = () => {
  let gg = this.t.id;
  return gg;
};
