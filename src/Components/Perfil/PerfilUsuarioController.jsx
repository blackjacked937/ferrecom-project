import PerfilUsuarioModel from "./PerfilUsuarioModel";

class PerfilUsuarioController {
  constructor() {
    this.model = new PerfilUsuarioModel();
  }

  manejarCambioImagen(event) {
    const archivo = event.target.files[0];
    if (archivo) {
      const urlImagen = URL.createObjectURL(archivo);
      this.model.setImagen(urlImagen);
    }
  }

  getImagen() {
    return this.model.getImagen();
  }
}

export default PerfilUsuarioController;