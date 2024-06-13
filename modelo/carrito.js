class Carrito extends Connect {
  constructor() {
    super();
    this.id_clien = 0;
    this.id_prod = "";
    this.estado_prod = 0;
    this.cantidad = 0;
    this.valor_total = 0;
    this.fecha_venta = 0;
  }

  getCarrito(dataReq, Callback) {
    const endpoint = "carritos/" + dataReq;
    const method = "GET";
    this.connect(dataReq, endpoint, method, Callback);
  }

  sumarProducto(dataReq, Callback) {
    const endpoint = "venta/cantidad";
    const method = "PUT";
    this.connect(dataReq, endpoint, method, Callback);
  }

  crearProducto(dataReq, Callback) {
    const endpoint = "carritos";
    const method = "POST";
    this.connect(dataReq, endpoint, method, Callback);
  }

  j(dataReq, Callback) {
    const endpoint = "carritos/total";
    const method = "PUT";
    this.connect(dataReq, endpoint, method, Callback);
  }
}
