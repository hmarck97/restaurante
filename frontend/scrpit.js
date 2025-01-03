document.addEventListener("DOMContentLoaded", () => {
let carrito = [];
let total = 0;

    const platos = document.querySelectorAll('.plato');
    const botonesPedido = document.querySelectorAll('.btn-pedido');
    const listaPedido = document.getElementById('lista-pedido');
    const totalElemento = document.getElementById('total');
    const botnvaciar = document.getElementById('vaciarcarrito');

    const renderizarcarrito = () => {
        listaPedido.innerHTML = "";
        carrito.forEach((item, index) =>{
            const nuevoItem = document.createElement('li');
            nuevoItem.innerHTML =`${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
            <button class="btn-menos" data-index="${index}">-</button>
            <button class="btn-mas" data-index="${index}">+</button>
       `;
       listaPedido.appendChild(nuevoItem);
        });
        totalElemento.innerText = total.toFixed(2);
    }

    //platos.forEach(plato => {
     //   plato.addEventListener('click', () => {
     //       alert(`¡Seleccionaste ${plato.querySelector('h3').innerText}!`);
     //   });
    //});
    const cargarCarrito = () => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalGuardado = parseInt(localStorage.getItem('total')) || 0;
    
        carrito = carritoGuardado;
        total = totalGuardado;
        renderizarcarrito();
    };
    
    // Llama a esta función al cargar la página
    cargarCarrito();

    botonesPedido.forEach(boton => {
        boton.addEventListener('click', () =>{
        const nombre = boton.dataset.nombre;
        const precio= parseFloat(boton.dataset.precio);
        const itemExiste = carrito.find(item => item.nombre === nombre);
        
        if(itemExiste){
            itemExiste.cantidad++;
        }else{
            carrito.push({nombre,precio, cantidad:1});
        }
        total += precio;
        renderizarcarrito();
         // Guardar en localStorage
         localStorage.setItem('carrito', JSON.stringify(carrito));
         localStorage.setItem('total', total);
    });
    });
    botnvaciar.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        carrito = [];  // Vacía el arreglo del carrito
        listaPedido.innerHTML = "";  // Elimina todos los elementos de la lista visual
        total = 0;  // Reinicia el total
        totalElemento.innerText = total;  // Actualiza el total en pantalla
         // Limpiar localStorage
    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
        }
    });


    listaPedido.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if(e.target.classList.contains('btn-mas')){
            carrito[index].cantidad++;
            total += carrito[index].precio;
        }else if(e.target.classList.contains('btn-menos')){
            if(carrito[index].cantidad >1){
                carrito[index].cantidad--;
                total -= carrito[index].precio;
            }else {
                total -= carrito[index].precio;
                carrito.splice(index, 1);
            }
        }
        renderizarcarrito();
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('total', total);
    });

});