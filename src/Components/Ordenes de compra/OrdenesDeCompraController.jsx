import OrdenesDeCompraModel from "./OrdenesDeCompraModel";

class OrdenesDeCompraController {
  constructor() {
    this.model = new OrdenesDeCompraModel();
  }

  getData() {
    return this.model.getData();
  }
}

export default OrdenesDeCompraController;