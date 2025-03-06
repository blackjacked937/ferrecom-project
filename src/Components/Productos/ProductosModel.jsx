class ProductosModel {
    constructor() {
      this.data = [
        {
          Codigo: "101",
          Descripcion: "Tornillería",
          Precio: "150.00 MXN",
          Categoria: "FERRE AC",
        },
        {
          Codigo: "102",
          Descripcion: "Ferretería AC",
          Precio: "200.00 MXN",
          Categoria: "FERRE AC",
        },
        {
          Codigo: "103",
          Descripcion: "Ferretería CM",
          Precio: "180.00 MXN",
          Categoria: "FERRE CM",
        },
        {
          Codigo: "104",
          Descripcion: "Ferretería EO",
          Precio: "220.00 MXN",
          Categoria: "FERRE EO",
        },
        {
          Codigo: "105",
          Descripcion: "TUBO PVC SANITARIO REFORZADO 100mm",
          Precio: "300.00 MXN",
          Categoria: "TERRE CC",
        },
      ];
    }
  
    getData() {
      return this.data;
    }
  
    filterData(search, categoriaFilter) {
      return this.data.filter(
        (row) =>
          (categoriaFilter === "Todos" || row.Categoria === categoriaFilter) &&
          (search === "" ||
            row.Descripcion.toLowerCase().includes(search.toLowerCase()) ||
            row.Codigo.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }
  
  export default ProductosModel;