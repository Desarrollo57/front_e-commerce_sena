vista = new Vista();
let user = new User();
let producto = new Producto();

let listaProductos = [];
/**
 *  Se ejecuta al inicar
 */
window.addEventListener("load", function () {
  vista.mostrarPlantilla("bienvenidaUsuario", "areaDeTrabajo");
});
/**
 * Navegacion de boton de vista Bienvenida para vista Iniciar sesion
 */
function mostrarPantallaIncicioSesion() {
  vista.mostrarPlantilla("encabezado1", "contenedorEncabezado");
  vista.mostrarPlantilla("formIniciarSesion", "areaDeTrabajo");
  vista.mostrarPlantilla("footer1", "pieDePagina");
}
/** Navegacion de boton de vista Bienvenida para vista Registrar */
function mostrarPantallaRegistrar() {
  vista.mostrarPlantilla("encabezado1", "contenedorEncabezado");
  vista.mostrarPlantilla("registroUsuario", "areaDeTrabajo");
  vista.mostrarPlantilla("footer1", "pieDePagina");
}
/** Navegacion de boton de vista Iniciar sesion para vista Producto */
function iniciarSesion() {
  //Leer el formulario
  let data = vista.getForm("formularioIniciarSesion");
  if (data.ok) {
    //Consultar en la base de datos
    user.login(data, function (res) {
      if (res.success) {
        if (res.data.length == 0) {
          vista.mostrarMensaje(false, "Usuario o contraseña incorrectos");
          return;

        } else {
          let reg = res.data[0];
          reg.correo = data.correo;
          user.setData(reg);
          vista.mostrarPlantilla("headerProductosCarrito", "contenedorEncabezado");
          vista.mostrarPlantilla("contenidoProducto", "areaDeTrabajo");
          mostrarProductos();
        }

      } else {
        vista.mostrarMensaje(
          false,
          "Error al realizar la consulta en la base de datos"
        );
      }
    });
  }

  // si existe mostrar pantalla pricipal
}

/** Navegacion de boton Regresar  de vista Iniciar sesion para vista Bienvenida */
function mostrarPantallaBienvenida() {
  vista.mostrarPlantilla("encabezado1", "contenedorEncabezado");
  vista.mostrarPlantilla("bienvenidaUsuario", "areaDeTrabajo");
  vista.mostrarPlantilla("footer1", "pieDePagina");
}

/**ingresarinicio */
function mostrarPantallaIncicioSesionRegresar() {
  vista.mostrarPlantilla("encabezado1", "contenedorEncabezado");
  vista.mostrarPlantilla("formIniciarSesion", "areaDeTrabajo");
  vista.mostrarPlantilla("footer1", "pieDePagina");
}

/**detalleproducto */
function mostrarPantallaDetallesProducto() {
  vista.mostrarPlantilla("headerProductos", "contenedorEncabezado");
  vista.mostrarPlantilla("contenidoDetallesProductos", "areaDeTrabajo");
  vista.mostrarPlantilla("footerProductos", "pieDePagina");
}
/**agregarcarrito */

function mostrarPantallaCarrito() {
  vista.mostrarPlantilla("headerProductos", "contenedorEncabezado");
  vista.mostrarPlantilla("contenidoCarritoCompra", "areaDeTrabajo");
  vista.limpiarArea("pieDePagina");
}

/** Navegacion de boton Regresar  de vista detalles productos  para vista Productos */

function regresarPantallaProducto() {
  vista.mostrarPlantilla("headerProductosCarrito", "contenedorEncabezado");
  vista.mostrarPlantilla("contenidoProducto", "areaDeTrabajo");
}

function mostrarPantallaCarrito1() {
  vista.limpiarArea("contenedorEncabezado");
  vista.mostrarPlantilla("headerProductos", "contenedorEncabezado");
  vista.mostrarPlantilla("contenidoCarritoCompra", "areaDeTrabajo");
  vista.limpiarArea("pieDePagina");
}



//******************* PRODUCTOS ************************************* */
function mostrarProductos() {
  //consultar DB
  data = {}
  producto.consultarProductos(data, function (res) {
    if (res.success) {
      vista.presentarProductos("contenedor-tarjetas", res.data); 
    } else {
      vista.mostrarMensaje(
        false,
        "Error al realizar la consulta en la base de datos"
      );
    }
  });
}