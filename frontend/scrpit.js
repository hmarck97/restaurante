document.addEventListener("DOMContentLoaded", () => {
let carrito = [];
let total = 0;

    const platos = document.querySelectorAll('.plato');
    const botonesPedido = document.querySelectorAll('.btn-pedido');
    const listaPedido = document.getElementById('lista-pedido');
    const totalElemento = document.getElementById('total');
    const botnvaciar = document.getElementById('vaciarcarrito');
    
    platos.forEach(plato => {
        plato.addEventListener('click', () => {
            alert(`¡Seleccionaste ${plato.querySelector('h3').innerText}!`);
        });
    });

    botonesPedido.forEach(boton => {
        boton.addEventListener('click', () =>{
        const nombre = boton.dataset.nombre;
        const precio = parseInt(boton.dataset.precio);
        carrito.push({nombre, precio});

        total += precio;

        const nuevoItem = document.createElement('li');
        nuevoItem.innerText = `${nombre} - $${precio}`;
        listaPedido.appendChild(nuevoItem);

        totalElemento.innerText = total;
    });
    });
    botnvaciar.addEventListener('click', () => {
        carrito = [];  // Vacía el arreglo del carrito
        listaPedido.innerHTML = "";  // Elimina todos los elementos de la lista visual
        total = 0;  // Reinicia el total
        totalElemento.innerText = total;  // Actualiza el total en pantalla
    });


});