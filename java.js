const productos = []
const IVA = 1.21
class Producto {
  constructor(nombre, importe) {
    this.nombre = nombre
    this.importe = importe
    
  }
  precioFinal() {
    return parseFloat((this.importe * IVA).toFixed(2))//solo con dos decimales
  }
}//agrega iva

let producto0 = new Producto("notebook", "100000")
let producto1 = new Producto("celular", "80000")
let producto2 = new Producto("funda", "1000")
let producto3 = new Producto("vidrio templado", "1000")
let producto4 = new Producto("mouse", "2000")
let producto5 = new Producto("teclado", "1000")
let producto6 = new Producto("auricular", "1500")//lista de productos

productos.push(producto0,producto1,producto2,producto3,producto4,producto5,producto6)//push a productos ya agregados

let entrada = confirm("desea agregar un producto")//agregador de productos para cliente si presiono aceptar me va a dar cuantas veces necesite agregar productos hasta que presione cancelar
while (entrada) {
let nombreProductoNuevo = prompt("ingrese nombre del producto nuevo")
let precioProductoNuevo = prompt("ingrese precio del producto nuevo")
let productoNuevo = new Producto(nombreProductoNuevo, precioProductoNuevo)
productos.push(productoNuevo)


  entrada = confirm("desea seguir agregando productos?");//si no confirmo me saca del ciclo
  console.table(productos);
}

alert("gracias! en la siguiente pestaña tendra 3 oportunidades para verificar si un objeto esta en la lista")

function buscarObj(articulos, Producto) {
  const encontrado = articulos.find((obj) => obj.nombre == Producto);
  return encontrado;//funcion orden superior que devuelve el articulo o undefined
}
//cree este ciclo de 3 veces para que el usuario no tenga que invocar la funcion desde consola 
for (let i = 1; i < 4; i++) {
  let nombre = prompt("Ingresa el nombre del articulo a buscar");
  const objEncontrado = buscarObj(productos, nombre);
  if (objEncontrado == undefined) {//si el fin me dice undefined me sale en consola que no encontro el articulo
    console.log("Articulo no encontrado!")
  } else {
    console.log(objEncontrado);//si lo encuentra me da el obj directamente con su precio
  }
}


