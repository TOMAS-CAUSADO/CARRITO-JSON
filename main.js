//fetch("https://api.escuelajs.co/api/v1/products")
//.then(resultado => resultado.json())
//.then(datos => console.log(datos))


let productosCarrito = []
let total = 0;
let contenerdorProductos = document.querySelector(".shop-items")
let totalElemento = document.querySelector('.cart-total-price')

// PETICION DE LA API
const respuestas = await fetch("https://api.escuelajs.co/api/v1/products")
const objetos = await respuestas.json()

//CANTIDAD DE PRODUCTOS A TRAER
let productosarreglo = objetos.slice(1, 5)
console.log(productosarreglo)

///MOSTRAR LOS PRODUCTOS
productosarreglo.forEach(producto => {
    console.log(producto.images);
    contenerdorProductos.innerHTML += `
    <div class="shop-item" id ="${producto.id}">
    <span class="shop-item-title">${producto.title}</span>
    <img class="shop-item-image" src="${producto.images[1]}}">
    <div class="shop-item-details">
        <span class="shop-item-price">$${producto.price}</span>
        <button class="btn btn-primary shop-item-button" type="button">AGREGAR AL CARRITO</button>
    </div>
</div>`

})

//permite saber si hace click en el boton
let addBrtns = document.querySelectorAll(".shop-item-button")
addBrtns = [...addBrtns];

let contenidoCarrito = document.querySelector('.cart-items')


addBrtns.forEach(btn => {
    btn.addEventListener(`click`, evento => {
        console.log(`click`);
          
        // buscar ID del produco
        let idActual = parseInt(evento.target.parentNode.parentNode.id)
        console.log(idActual);

        //Encontrar el Objeto con el ID
        let productoActual = productosarreglo.find(item => item.id == idActual)
        productoActual.quantity = 1;
        console.log(productoActual)
        productosCarrito.push(productoActual)
        console.log(productosCarrito);

        //Preguntar si ya existe el producto
        
        console.log(productosCarrito.includes(productoActual));

        productosCarrito.push(productoActual)
        console.log(productosCarrito);


        //agrregar productos al carrito
        contenidoCarrito.innerHTML += `<div class="cart-row">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${productoActual.images[1]}" width="100" height="100">
            <span class="cart-item-title">${productoActual.title}</span>
        </div>
        <span class="cart-price cart-column">$${productoActual.price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" min="1" type="number" value="${productoActual.quantity}">
            <button class="btn btn-danger" type="button">REMOVER</button>
        </div>
    </div>`

        //Actualizar valor total
        total = getTotal();
        console.log(total);
    })
})

function getTotal() {
    let sumTotal
   let total = contenidoCarrito.reduce((sum, item) => { 

        sumTotal = sum + item.quantity*item.price
        return sumTotal
    }, 0)
}

totalElemento.innerText = `$${total}`


