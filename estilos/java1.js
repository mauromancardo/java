const productos = [];//array donde tengo todos los productos
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];//array donde voy a guardar los elemntos del carrito y no se borra si actualizo la pagina
const cartelTotal = document.querySelector("#total");
const IVA = 1.21
class ElementosCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}
class Producto {
    constructor(nombre, importe, foto, id) {
        this.nombre = nombre
        this.importe = importe
        this.foto = foto
        this.id = id

    }
    precioFinal() {
        return parseFloat((this.importe * IVA).toFixed(2))//solo con dos decimales
    }
}//agrega iva


let producto0 = new Producto("notebook", "100000", './imagenes/tienda1.jpg', "1")
let producto1 = new Producto("celular", "80000", './imagenes/tienda1.jpg', "2")
let producto2 = new Producto("funda", "1000", './imagenes/tienda1.jpg', "3")
let producto3 = new Producto("vidrio templado", "1000", 'imagenes/tienda1.jpg', "4")
let producto4 = new Producto("mouse", "2000", 'imagenes/tienda1.jpg', "5")
let producto5 = new Producto("teclado", "1000", 'imagenes/tienda1.jpg', "6")
let producto6 = new Producto("auricular", "1500", 'imagenes/tienda1.jpg', "7")//lista de productos

productos.push(producto0, producto1, producto2, producto3, producto4, producto5, producto6)//push a productos ya agregados

const containerDiv = document.querySelector("#tienda");
const carritoDiv = document.querySelector("#carrito1");

//funcion para crear las cards segun los productos del array
function crearCards() {
    productos.forEach((obj) => {
        containerDiv.innerHTML += `<div>
                                        <img src ="${obj.foto}">
                                        <h3>${obj.nombre}</h3>
                                        <p>$${obj.importe}</p>
                                        <button id="btn-agregar${obj.id}">Agregar</button> 
                                    </div>`;
    });
      agregarFuncionalidad(); 
}
//agregandole funcion al boton para agregar producto al carrito 
function agregarFuncionalidad() {
    productos.forEach((obj) => {
        document.querySelector(`#btn-agregar${obj.id}`).addEventListener("click", () => {
            agregarCarrito(obj)
        })
    })
}
//con esta funcion lo que hago es agregarle a la cantidad sin que se me agregue otro producto igual
function agregarCarrito(obj){
    let existe = carrito.some((productoSome) => productoSome.id === obj.id);
    if (existe === false){
        obj.cantidad = 1;
        carrito.push(obj);
    } else{
        let objFind = carrito.find(productoFind => productoFind.id === obj.id)
        objFind.cantidad++;
    } 
console.log(carrito);
visualizarCarrito();
}
//funcion para visualizar los objetos en el carrito 
function visualizarCarrito() {
    carritoDiv.innerHTML = "";
    carrito.forEach((obj) => {
        carritoDiv.innerHTML += `<tr>
                                       <td> ${obj.nombre}</td>
                                       <td> ${obj.importe}</td>
                                       <td> ${obj.cantidad}</td>
                                       <td> <button id="btn-eliminar${obj.id}">Borrar</button></td>
                                    </tr>`;
    })
    localStorage.setItem("carrito", JSON.stringify(carrito))
    totalCarrito()
    borrarCarrito()
}
function totalCarrito() {
    cartelTotal.innerText = carrito.reduce((acc, el) => acc + (el.importe), 0)
}
//funcion para borrar los objetos del carrito 
function borrarCarrito() {
    carrito.forEach((obj) => {
        document.querySelector(`#btn-eliminar${obj.id}`).addEventListener("click", () => {
            carrito = carrito.filter((objFilter) => objFilter.id !== obj.id);
            visualizarCarrito()
        });
    });
}
crearCards();
visualizarCarrito();