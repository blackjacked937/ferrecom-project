class ListaPedidosModel {
    constructor() {
      this.data = [
        {
          ID_Documento: "PD 5983",
          Fecha_Pedido: "2025-03-04",
          Referencia_Entrega: "STOCK ALMACEN EL ZAPOTE",
          Cliente: "VETRO-GALO",
          Costo_Total: "841.00 MXN",
          Vendedor: "Ventas CMF",
          Almacen: "Almacén 1",
          Estatus: "Facturado",
        },
        {
          ID_Documento: "PD 5982",
          Fecha_Pedido: "2025-03-03",
          Referencia_Entrega: "OBRA: RIT NAYARIT REQ018E",
          Cliente: "VETRO-GALO",
          Costo_Total: "810.00 MXN",
          Vendedor: "Ventas CMF",
          Almacen: "Almacén 1",
          Estatus: "Facturado",
        },
      ];
    }
  
    getData() {
      return this.data;
    }
  
    filterData(search, statusFilter, almacenFilter, sucursalFilter) {
      return this.data.filter(
        (row) =>
          (statusFilter === "Todos" || row.Estatus === statusFilter) &&
          (almacenFilter === "Todos" || row.Almacen === almacenFilter) &&
          (sucursalFilter === "Todos") &&
          (search === "" || row.Cliente.toLowerCase().includes(search.toLowerCase()) || row.ID_Documento.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }
  
  export default ListaPedidosModel;