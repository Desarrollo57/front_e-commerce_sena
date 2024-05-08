class User extends Connect{
    constructor(){
        super();
        this.id_clien = 0;
        this.razon_social = '';
        this.correo = '';
    }

    setData(data){
        this.id_clien = data.id_clien;
        this.razon_social = data.razon_social;
        this.correo = data.correo;
    }
    login(dataReq, loginCallback){
        const endpoint = 'clientes/login';
        const method = 'POST';
        this.connect(dataReq, endpoint, method, loginCallback);
    }  
}