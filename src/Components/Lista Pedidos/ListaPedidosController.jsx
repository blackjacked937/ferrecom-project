import ListaPedidosModel from "./ListaPedidosModel";

class ListaPedidosController {
  constructor() {
    this.model = new ListaPedidosModel();
    this.search = "";
    this.statusFilter = "Todos";
    this.almacenFilter = "Todos";
    this.sucursalFilter = "Todos";
  }

  setSearch(search) {
    this.search = search;
  }

  setStatusFilter(statusFilter) {
    this.statusFilter = statusFilter;
  }

  setAlmacenFilter(almacenFilter) {
    this.almacenFilter = almacenFilter;
  }

  setSucursalFilter(sucursalFilter) {
    this.sucursalFilter = sucursalFilter;
  }

  getFilteredData() {
    return this.model.filterData(this.search, this.statusFilter, this.almacenFilter, this.sucursalFilter);
  }
}

export default ListaPedidosController;