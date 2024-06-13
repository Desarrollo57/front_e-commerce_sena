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
      if (form[key].type == "email") {
        if (!this.validateEmail(value)) {
          data.ok = false;
          data.msj = "No es un correo válido: " + value;
          this.mostrarMensaje(false, data.msj);
        }
      }
    });
    return data;
  }

  validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
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
      boton.innerText = "carrito";
      boton.setAttribute("data-id", producto.id_prod);
      tarjeta.appendChild(boton);

      //insertar la tarjeta
      contenedor.appendChild(tarjeta);

      boton.addEventListener("click", actualizarCarro);
    });
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

  presentarUnProducto(destino, producto) {
    let dest = document.getElementById(destino);
    dest.innerHTML = "";

    let title1 = document.createElement("h2");
    title1.innerText = producto.nombre_prod;
    dest.appendChild(title1);

    let img = document.createElement("img");
    img.id = "img-principal";
    img.src = producto.url_img;
    dest.appendChild(img);

    let descripcion = document.createElement("h4");
    descripcion.innerText = "Descripción";
    dest.appendChild(descripcion);

    let descripcion1 = document.createElement("p");
    descripcion1.innerText = producto.descripcion;
    dest.appendChild(descripcion1);
  }

  presentarProductoCarrito(caja, data) {
    //YO AQUI
    let contenedor = document.getElementById(caja);
    contenedor.innerText = "";
    let total = 0;
    data.forEach((producto) => {
      //construir tarjetaCarrito

      let tarjetaCarrito = document.createElement("div"); // Esto envuelbe todo
      tarjetaCarrito.classList.add("carrito-producto");

      let img = document.createElement("img");
      img.classList.add("carrito-producto-imagen");
      img.src = producto.url_img;
      tarjetaCarrito.appendChild(img);

      let contenedorTitulo = document.createElement("div");
      contenedorTitulo.classList.add("carrito-producto-titulo");
      tarjetaCarrito.appendChild(contenedorTitulo);

      let titulo2 = document.createElement("small");
      titulo2.innerText = producto.nombre_prod;
      titulo2.appendChild(contenedorTitulo);
      tarjetaCarrito.appendChild(titulo2);

      let contenedorCantidad = document.createElement("div");
      contenedorCantidad.classList.add("carrito-producto-cantidad");
      tarjetaCarrito.appendChild(contenedorCantidad);

      let cantidad = document.createElement("small");
      cantidad.innerText = "Cantidad";
      cantidad.appendChild(contenedorCantidad);
      tarjetaCarrito.appendChild(cantidad);

      let cantidadNumero = document.createElement("p");
      cantidadNumero.innerText = producto.cantidad;
      cantidadNumero.appendChild(contenedorCantidad);
      tarjetaCarrito.appendChild(cantidadNumero);

      let contenedorPrecio = document.createElement("div");
      contenedorPrecio.classList.add("carrito-producto-precio");
      tarjetaCarrito.appendChild(contenedorPrecio);

      let precioCarrito = document.createElement("small");
      precioCarrito.innerText = "Precio";
      precioCarrito.appendChild(contenedorPrecio);
      tarjetaCarrito.appendChild(precioCarrito);

      let precioUnidadCarrito = document.createElement("p");
      precioUnidadCarrito.innerText = producto.precio_venta;
      precioUnidadCarrito.appendChild(contenedorPrecio);
      tarjetaCarrito.appendChild(precioUnidadCarrito);

      let contenedorSubtotal = document.createElement("div");
      contenedorSubtotal.classList.add("carrito-producto-subtotal");
      tarjetaCarrito.appendChild(contenedorSubtotal);

      let subtotalPrecioCarrito = document.createElement("small");
      subtotalPrecioCarrito.innerText = "Subtotal";
      subtotalPrecioCarrito.appendChild(contenedorSubtotal);
      tarjetaCarrito.appendChild(subtotalPrecioCarrito);

      let precioSubtotalCarrito = document.createElement("p");
      precioSubtotalCarrito.innerText = producto.valor_total;
      precioSubtotalCarrito.appendChild(contenedorSubtotal);
      tarjetaCarrito.appendChild(precioSubtotalCarrito);

      //----------------------FALTA EL BOTON DE BORRAR EL ELEMENTO DEL CARRITO---------------
      let iconoEliminarDelCarrito = document.createElement("button");
      iconoEliminarDelCarrito.classList.add("eliminar-producto");

      //insertar la tarjeta
      contenedor.appendChild(tarjetaCarrito);

      total += producto.valor_total;
    });

    document.getElementById("total").innerText = total;
  }


  
}
