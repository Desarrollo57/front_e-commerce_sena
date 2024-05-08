class Producto extends Connect{
    constructor(){
        super();
        this.id_prod = 0;
        this.nombre_prod = '';
        this.presentacion = '';
        this.existencia = 0;
        this.precio_venta = 0;
        this.id_categ = 0;
        this.descripcion = '';
        this.url_img = '';
    }

    setData(data){
        this.id_prod = data.id_prod;
        this.nombre_prod = data.nombre_prod;
        this.presentacion = data.presentacion;
        this.existencia = data.existencia;
        this.precio_venta = data.precio_venta;
        this.id_categ = data.id_categ;
        this.descripcion = data.descripcion;
        this.url_img = data.url_img;
    }

    getData(){
        data = {}
        data.id_prod = this.id_prod;
        data.nombre_prod = this.nombre_prod;
        data.presentacion = this.presentacion;
        data.existencia = this.existencia;
        data.precio_venta = this.precio_venta;
        data.id_categ = this.id_categ;
        data.descripcion = this.descripcion;
        data.url_img = this.url_img;
    }


    consultarProductos(dataReq, loginCallback){
        const endpoint = 'productos';
        const method = 'GET';
        this.connect(dataReq, endpoint, method, loginCallback);
    }  
}