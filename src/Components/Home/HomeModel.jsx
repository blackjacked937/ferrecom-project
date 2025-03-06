class HomeModel {
    constructor() {
      this.mensaje = "Bienvenido a FullStock";
      this.descripcion = "Gestiona tus órdenes de compra e inventario de manera eficiente.";
    }
  
    getMensaje() {
      return this.mensaje;
    }
  
    getDescripcion() {
      return this.descripcion;
    }
  }
  
  export default HomeModel;