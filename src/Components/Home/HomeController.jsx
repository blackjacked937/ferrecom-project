import HomeModel from "./HomeModel";

class HomeController {
  constructor() {
    this.model = new HomeModel();
  }

  getMensaje() {
    return this.model.getMensaje();
  }

  getDescripcion() {
    return this.model.getDescripcion();
  }
}

export default HomeController;