class tarea {
  constructor(nuevaTarea) {
    this.t = nuevaTarea;
    this.component = document.createElement("div");
    this.id = "rr";
  }

  render = () => {
    /* let x;
    let y;*/

    this.component.className = "colTarea";

    let imageDrag = document.createElement("div");
    imageDrag.className = "imageDrag";
    imageDrag.innerHTML = '<i class="fas fa-grip-lines"></i>';

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

    /*const body = document.getElementById("body");

    body.addEventListener("drag", (e) => {
      x = e.offsetX;
      y = e.offsetY;
    });

    body.addEventListener("mouseup", (e) => {
      x = e.offsetX;
      y = e.offsetY;
      console.log(x + ", " + y);
    });

    body.addEventListener("dragend", (e) => {
      console.log(x + ",(dragged) " + y);
    });
*/

    return this.component;
  };

  position = () => {
    let posicion = this.component.getBoundingClientRect();
    let tipo1 = "toDo";
    let tipo2 = "doing";
    let tipo3 = "done";

    console.log("ya"+this.id);

    if (this.id === this.t.id) {
      if (
        (posicion.left > 350 &&
          posicion.left < 600 &&
          this.t.tipo === "toDo") ||
        (posicion.left > 350 && posicion.left < 600 && this.t.tipo === "done")
      ) {
        let referencia = database.ref("Quiz2/doing").push();
        let nuevaTarea = {
          id: referencia.key,
          tarea: this.t.tarea,
          fecha: this.t.fecha,
          tipo: tipo2,
        };
        referencia.set(nuevaTarea);

        database.ref("Quiz2/toDo/" + this.t.id).remove();
        database.ref("Quiz2/done/" + this.t.id).remove();
      } else if (
        (posicion.left < 350 && this.t.tipo === "doing") ||
        (posicion.left < 350 && this.t.tipo === "done")
      ) {
        let referencia = database.ref("Quiz2/toDo").push();
        let nuevaTarea = {
          id: referencia.key,
          tarea: this.t.tarea,
          fecha: this.t.fecha,
          tipo: tipo1,
        };
        referencia.set(nuevaTarea);

        database.ref("Quiz2/done/" + this.t.id).remove();
        database.ref("Quiz2/toDo/" + this.t.id).remove();
      } else if (
        (posicion.left > 500 && this.t.tipo === "doing") ||
        (posicion.left > 500 && this.t.tipo === "toDo")
      ) {
        let referencia = database.ref("Quiz2/done").push();
        let nuevaTarea = {
          id: referencia.key,
          tarea: this.t.tarea,
          fecha: this.t.fecha,
          tipo: tipo3,
        };
        referencia.set(nuevaTarea);

        database.ref("Quiz2/doing/" + this.t.id).remove();
        database.ref("Quiz2/toDo/" + this.t.id).remove();
      }
    }
  };

  getId = () => {
    let gg = this.t.id;
    return gg;
  };

  setId = (f) => {
    this.id = f;
  };
}
