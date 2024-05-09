class Vista {
  constructor() {
    this.stack = [];
  }

  /**
   *
   * @param {*} plantilla: Template con el contenido a mostrar
   * @param {*} destino : Area donde se cargara el template
   */

  avanzarPantalla(pantalla) {
    this.stack.push(pantalla);
    this.mostrarPlantilla();
  }

  retrocederPantalla() {
    if (this.stack.length > 1) {
      this.stack.pop();
      let pantalla = this.stack[this.stack.length - 1];
      this.mostrarPlantilla(pantalla);
    }
  }
  mostrarPlantilla(plantilla, destino) {
    let dest = document.getElementById(destino);
    dest.innerHTML = "";
    let template = document.getElementById(plantilla);
    if (template) {
      let clon = template.content.cloneNode(true);
      dest.appendChild(clon);
    }
  }
  limpiarArea(areaDeTrabajo) {
    document.getElementById(areaDeTrabajo).innerHTML = "";
  }

  /**
   * Lee el contenido de los inputs dentro de una etiqueta <form>
   * valida que existan datos en todos los campos
   * Los devuelve como un objeto al que incluye una bandera que indica si los datos son válidos
   * y un mensaje de error si no se ingresaron datos
   * @param {str} formulario: id del formulario a leer
   * @returns {obj} data: objeto con los datos del formulario
   */
  getForm(formulario) {
    let form = document.getElementById(formulario);
    let datos = new FormData(form);
    let data = {};
    data.ok = true; //Bandera para indicar si los datos son válidos
    data.msj = ""; //Mensaje de error si no se ingresaron datos
    datos.forEach((value, key) => {
      data[key] = value;
      if (value == "" || (form[key].tagName === "SELECT" && value == "0")) {
        data.ok = false;
        data.msj = "No hay datos en " + key;
        this.mostrarMensaje(false, data.msj);
      }
    });
    return data;
  }

  presentarProductos(caja, data) {
    let contenedor = document.getElementById(caja);
    contenedor.innerText = "";

    data.forEach((producto) => {
      //construir tarjeta
      let tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-1");

      let img = document.createElement("img");
      img.classList.add("imag-prod");
      img.src = producto.url_img;
      tarjeta.appendChild(img);

      let title1 = document.createElement("h2");
      title1.innerText = producto.nombre_prod;
      tarjeta.appendChild(title1);

      let precio = document.createElement("h5");
      precio.innerText = producto.precio_venta;
      tarjeta.appendChild(precio);

      let boton = document.createElement("button");
      boton.classList.add("btn-categ");
      boton.classList.add("btn-outlet");
      boton.innerText = "detalles";
      boton.setAttribute("data-id", producto.id_prod);
      tarjeta.appendChild(boton);

      //insertar la tarjeta
      contenedor.appendChild(tarjeta);
      
      boton.addEventListener("click", mostrarDetalleProducto);
    });
  }

  presentarUnProducto(destino, producto) {
    let dest = document.getElementById(destino);
    dest.innerHTML = "";

    let title1 = document.createElement("h2");
    title1.innerText = producto.nombre_prod;
    dest.appendChild(title1);
    
    let img = document.createElement("img");
    img.id ="img-principal";
    img.src = producto.url_img;
    dest.appendChild(img);

    let descripcion = document.createElement("h4");
    descripcion.innerText = "Descripción";
    dest.appendChild(descripcion);

    let descripcion1 = document.createElement("p");
    descripcion1.innerText = producto.descripcion;
    dest.appendChild(descripcion1);
  }

  /**
   * Despliega un mensaje de error por tres segundos
   * @param {bool} ok: bandera que indica si el mensaje es de error o de éxito
   * @param {str} mensaje: texto del mensaje a desplegar
   */
  mostrarMensaje(ok, mensaje) {
    // Crear el elemento del mensaje
    let mensajeDiv = document.createElement("div");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.id = "mensaje-error";
    mensajeDiv.style.position = "absolute";
    mensajeDiv.style.width = "80%";
    mensajeDiv.style.right = "10%";
    mensajeDiv.style.bottom = "%";
    if (ok) {
      mensajeDiv.style.backgroundColor = "green";
    } else {
      mensajeDiv.style.backgroundColor = "red";
    }
    mensajeDiv.style.color = "white";
    mensajeDiv.style.textAlign = "center";
    mensajeDiv.style.padding = "10px";
    mensajeDiv.style.borderRadius = "10px";
    // Mostrar el mensaje
    document.getElementById("areaDeTrabajo").appendChild(mensajeDiv);
    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
      mensajeDiv.remove();
    }, 3000);
  }
}
