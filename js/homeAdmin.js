// Función para establecer el elemento activo en el menú
function setActiveItem(clickedItem) {
    // Remover la clase active de todos los elementos
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Agregar la clase active al elemento clickeado
    clickedItem.classList.add('active');
    
    // Actualizar el contenido principal basado en la selección
    const itemText = clickedItem.querySelector('span').textContent;
    updateMainContent(itemText);
    
    // Cerrar sidebar en móvil después de seleccionar
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

//Cerrar la sesion
function setCloseSesion(clickedItem) {
    //Se limpia el cache del usuario
    localStorage.clear();

    // Redirige al index.html
    window.location.href = "index.html";
}


// Función para actualizar el contenido principal
function updateMainContent(section) {
    const welcomeMessage = document.querySelector('.welcome-message');
    welcomeMessage.textContent = `¡HOLA Administrador! - ${section}`;
}

// Función para mostrar/ocultar sidebar en móvil
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

// Función para mostrar notificaciones
function showNotifications() {
    alert('¡Tienes 3 notificaciones nuevas!');
}

// Cerrar sidebar al hacer clic fuera de él en móvil
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && 
        !sidebar.contains(event.target) && 
        !mobileMenuBtn.contains(event.target) && 
        sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
    }
});

// Manejar redimensionamiento de ventana
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('Panel de administración cargado correctamente');
});