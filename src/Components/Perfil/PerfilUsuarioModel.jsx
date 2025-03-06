class PerfilUsuarioModel {
    constructor() {
      this.imagen = "https://via.placeholder.com/150";
    }
  
    setImagen(imagen) {
      this.imagen = imagen;
    }
  
    getImagen() {
      return this.imagen;
    }
  }
  
  export default PerfilUsuarioModel;