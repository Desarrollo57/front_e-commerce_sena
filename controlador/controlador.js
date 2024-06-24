
vista = new Vista();
let user = new User();
let carrito = new Carrito();
let producto = new Producto();
let listaProductos = [];
let productosEnCarrito = [];
let total = [];




/**
 *  Se ejecuta al inicar
 */
window.addEventListener("load", function () {
  vista.mostrarPlantilla("bienvenidaUsuario", "areaDeTrabajo");
});


function eliminarProducto(boton) {
  var idProd = boton.getAttribute("data-id");
  let idxlista = listaProductos.findIndex(x => x.id_prod == idProd);
  listaProductos.splice(idxlista, 1);
  vista.presentarProductoCarrito("carrito-productos", productosEnCarrito);
}
   


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
          vista.mostrarPlantilla(
            "headerProductosCarrito",
            "contenedorEncabezado"
          );
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

/** Navegacion de boton de vista Iniciar sesion para vista Producto */
function registrarUsuario() {
  //Leer el formulario
  let data = vista.getForm("formularioRegistro");
  if (data.ok) {
    //Consultar en la base de datos
    user.register(data, function (res) {
      console.log(res);
      if (res.success) {
        vista.mostrarPlantilla("encabezado1", "contenedorEncabezado");
        vista.mostrarPlantilla("registroUsuario", "areaDeTrabajo");
        vista.mostrarPlantilla("footer1", "pieDePagina");
        vista.mostrarMensaje(true, "Registrado Exitoso")
        
      } else {
        vista.mostrarMensaje(false, "Error al crear el usuario");
      }
    });
  }
}


function mostrarPantallaAyuda() {
  vista.mostrarPlantilla("headerayuda","contenedorEncabezado");
  vista.mostrarPlantilla("contendioFormularioAyuda","areaDeTrabajo");
  vista.mostrarPlantilla("footerAyuda","pieDePagina");
}

/** Navegacion de boton Regresar  de vista Iniciar sesion para vista Bienvenida */
function mostrarPantallaBienvenida() {
  vista.mostrarPlantilla("encabezado1", "contenedorEncabezado");
  vista.mostrarPlantilla("bienvenidaUsuario", "areaDeTrabajo");
  vista.mostrarPlantilla("footer1", "pieDePagina");
}

/**detalleproducto */
function mostrarPantallaDetallesProducto() {
  vista.mostrarPlantilla("headerProductos", "contenedorEncabezado");
  vista.mostrarPlantilla("contenidoDetallesProductos", "areaDeTrabajo");
  /*vista.mostrarPlantilla( "pieDePagina");*/
}
/**agregarcarrito */
/**
 * Agrega un producto al carro si no existe, si ya existe suma 1
 */
function actualizarCarro() {

  //Consultar el carro en la BD
  consultarCarro();
  //Recuperar id del producto
  let idProducto = parseInt(this.getAttribute("data-id"));
  //Buscar producto en listaProductos
  const producto = listaProductos.find((x) => x.id_prod === idProducto); // encuentra el producto segun el id
  const prodEnCarro = productosEnCarrito.find((x) => x.id_prod === idProducto);
  
  if (prodEnCarro) {
    //SI si existe, agregar una unidad
    carrito.sumarProducto(prodEnCarro, function (data) {
      console.log(data);
      if (x.id_prod === idProducto.id_prod){
        x.cantidad++;
        return x;

      }else{
        return x;
      }
    });


    
  } else {
    //SI no existe en carrito Agregarlo al carrito
    data = {
      cantidad: carrito.cantidad,
      id_clien: user.id_clien,
      id_prod: producto.id_prod,
      precio: producto.precio_venta,
    };
    carrito.crearProducto(data, function (data) {
      console.log(data);
    });
    //productosEnCarrito.push
  }
  vista.mostrarPlantilla("contenidoCarritoCompra", "areaDeTrabajo");
  consultarCarro();
  //vista.presentarProductoCarrito("carrito-productos", productosEnCarrito);
  
}


/**
 * Trae de la BD los articulos en el carrito, pzr el cliente activo 
 */
function consultarCarro() {
  //capturar el id
  id = user.id_clien;


  carrito.getCarrito(id,  function (res) {
    console.log(res);
    if (res.success) {
      productosEnCarrito = res.data;
      vista.presentarProductoCarrito("carrito-productos", productosEnCarrito);
      // consultar la BD si esta el producto
    } else {
      vista.mostrarMensaje(
        false,
        "Error al realizar la consulta en la base de datos"
      );
    }
  });
  //Carga en lista productosEnCarrito
  //Desplegar datos del carrito
}

/** Navegacion de boton Regresar  de vista detalles productos  para vista Productos */

function regresarPantallaProducto() {
  vista.mostrarPlantilla("headerProductosCarrito", "contenedorEncabezado");
  vista.mostrarPlantilla("contenidoProducto", "areaDeTrabajo");
}

function seguirComprando() {
  vista.mostrarPlantilla("contenidoProducto", "areaDeTrabajo");
  mostrarProductos();
}

//******************* PRODUCTOS ************************************* */
function mostrarProductos() {
  //consultar DB
  data = {};
  producto.consultarProductos(data, function (res) {
    if (res.success) {
      listaProductos = res.data;
      vista.presentarProductos("contenedor-tarjetas", res.data);
    } else {
      vista.mostrarMensaje(
        false,
        "Error al realizar la consulta en la base de datos"
      );
    }
  });
}

function mostrarDetalleProducto() {
  //recuperar la PK
  const pk = this.getAttribute("data-id");
  //buscar en la lista de productos
  data = { id: pk };
  producto.consultarUnProducto(data, function (res) {
    if (res.success) {
      //desplegar el template
      vista.mostrarPlantilla("contenidoDetallesProductos", "areaDeTrabajo");
      //mostrar datos del producto

      vista.presentarUnProducto("areaDeTrabajo", res.data[0]);
    } else {
      vista.mostrarMensaje(
        false,
        "Error al realizar la consulta en la base de datos"
      );
    }
  });
}
/*
cargarEvenListeners()
function cargarEvenListeners(){
  
  window.addEventListener("click", () => {

    productosEnCarrito = [];

    limpiarArea(areaDeTrabajo);
  });
}
*/

window.addEventListener("click", vaciar);
console.log("vaciar")
function vaciar (){

  document.getElementById("carrito-acciones-vaciar");
}


const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
if ( botonVaciar)
  
  {
    botonVaciar.addEventListener("click", () => {
  
    })
  }






/*
window.addEventListener("DOMContentLoaded", (event) => {
  const botonVaciar = document.getElementById('#carrito-acciones-vaciar');
  if (botonVaciar) {
    botonVaciar.addEventListener('click', swapper, false);
  }
});

*/



