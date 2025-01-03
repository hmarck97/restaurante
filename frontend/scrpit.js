document.addEventListener("DOMContentLoaded", () => {
    const platos = document.querySelectorAll('.plato');
    
    platos.forEach(plato => {
        plato.addEventListener('click', () => {
            alert(`¡Seleccionaste ${plato.querySelector('h3').innerText}!`);
        });
    });
});