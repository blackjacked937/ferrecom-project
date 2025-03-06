import ProductosModel from "./ProductosModel";

class ProductosController {
  constructor() {
    this.model = new ProductosModel();
    this.search = "";
    this.categoriaFilter = "Todos";
  }

  setSearch(search) {
    this.search = search;
  }

  setCategoriaFilter(categoriaFilter) {
    this.categoriaFilter = categoriaFilter;
  }

  getFilteredData() {
    return this.model.filterData(this.search, this.categoriaFilter);
  }
}

export default ProductosController;