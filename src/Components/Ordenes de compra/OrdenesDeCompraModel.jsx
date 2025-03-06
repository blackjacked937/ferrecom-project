class OrdenesDeCompraModel {
    constructor() {
      this.data = [
        {
          ID_Documento: "OC 5925",
          ID_Pedido_de_Referencia: "5982",
          Fecha: "04 Mar",
          Cliente: "HERRAMIENTAS ACZ S.A. DE C.V.",
          Comprador: "Ventas CMF",
          Capturado: "Cotizador",
          Almacen: "Almacén 1",
          Costo_Total: "622.22 MXN",
          Estatus: "Aplicado",
        },
        {
          ID_Documento: "OC 5924",
          ID_Pedido_de_Referencia: "5967",
          Fecha: "03 Mar",
          Cliente: "GRUPO TORNILLERO ERT S.A. DE C.V.",
          Comprador: "Ventas CMF",
          Capturado: "Cotizador",
          Almacen: "Almacén 1",
          Costo_Total: "2,968.22 MXN",
          Estatus: "Facturado",
        },
      ];
    }
  
    getData() {
      return this.data;
    }
  }
  
  export default OrdenesDeCompraModel;