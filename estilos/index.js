let productos = [];//array donde tengo todos los productos
const estandarDolarAmericanos = Intl.NumberFormat('en-US');
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];//array donde voy a guardar los elemntos del carrito y no se borra si actualizo la pagina
const cartelTotal = document.querySelector("#total");
const IVA = 1.21


class ElementosCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

const containerDiv = document.querySelector("#tienda");
const carritoDiv = document.querySelector("#carrito1");
const URLGET = "estilos/productos.json";
function crearCards() {
    containerDiv.innerHTML="";
    fetch(URLGET)
    .then(ress => ress.json())
    .then(data => {
        productos=[...data]
    data.forEach((obj) => {
        containerDiv.innerHTML += `<div>
                                        <img src ="${obj.img}">
                                        <h3>${obj.nombre}</h3>
                                        <p>$${obj.precio}</p>
                                        <button id="btn-agregar${obj.id}">Agregar</button> 
                                    </div>`;
    })
    agregarFuncionalidad();
})};

//agregandole funcion al boton para agregar producto al carrito 
function agregarFuncionalidad() {
    productos.forEach((obj) => {
        document.querySelector(`#btn-agregar${obj.id}`).addEventListener("click", () => {
            agregarCarrito(obj)
        })
    })
}
crearCards();
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
    /* alert(`agregaste ${obj.nombre} al carrito!`) */
    Swal.fire(`agregaste ${obj.nombre} al carrito!`)

visualizarCarrito();
}

//funcion para visualizar los objetos en el carrito 
function visualizarCarrito() {
    carritoDiv.innerHTML = "";
    carrito.forEach((obj) => {
        let renglon = document.createElement("tr");
        renglon.innerHTML += `<tr>
                                       <td> ${obj.nombre}</td>
                                       <td> ${obj.precio}</td>
                                       <td>  <input id="cantidad-${obj.id}"type="number" value="${obj.cantidad}" min="1" max="1000" step="1" style="width: 50px;"></td>
                                       <td>${estandarDolarAmericanos.format(obj.precio*obj.cantidad)}</td>
                                       <td> <button id="btn-eliminar${obj.id}">Borrar</button></td>
                                    </tr>`;
          carritoDiv.append(renglon);                          
        let inputCantidad = document.getElementById(`cantidad-${obj.id}`)
        inputCantidad.addEventListener("change", (e) => { 
            let nuevaCantidad = e.target.value;
            obj.cantidad = nuevaCantidad;
            visualizarCarrito();
        })
    })
    localStorage.setItem("carrito", JSON.stringify(carrito))
    totalCarrito()
    borrarCarrito()
}
visualizarCarrito();

function totalCarrito() {
    cartelTotal.innerText = carrito.reduce((acc, el) => (acc + (el.precio)) * el.cantidad, 0)
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

botonTerminar = document.getElementById("botonTerminar");

botonTerminar.addEventListener("click", () => realizarCompra()
);

function cartelCompra(){
    let timerInterval
    Swal.fire({
        title: 'Realizando compra',
        html: 'Cargando datos de envio <b></b>.',
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}

function realizarCompra(){
    localStorage.removeItem("carrito");
    carritoDiv.innerHTML = "";
    cartelTotal.innerText = "";
    carrito =[];
    cartelCompra();
}




