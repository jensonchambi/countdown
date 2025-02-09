// countdown.js
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        eventName: decodeURIComponent(params.get("eventName") || ""),
        startDate: decodeURIComponent(params.get("startDate") || ""),
        imageUrl: decodeURIComponent(params.get("imageUrl") || ""),
    };
}

function updateCountdown() {
    const { eventName, startDate, imageUrl } = getQueryParams();

    if (!eventName || !startDate) {
        document.getElementById("days").textContent = "No se encontraron datos del evento.";
        return;
    }

    // Mostrar el nombre del evento
    document.getElementById("eventTitle").textContent = eventName;

    // Aplicar la imagen de fondo
    if (imageUrl) {
        document.getElementById("eventImage").style.backgroundImage = `url('${imageUrl}')`;
    } else {
        document.getElementById("eventImage").style.backgroundImage = "url('https://picsum.photos/600/300')"; // Imagen por defecto
    }

    // Calcular el tiempo restante
    const eventTime = new Date(startDate).getTime();
    const now = new Date().getTime();
    const timeDifference = eventTime - now;

    if (timeDifference <= 0) {
        document.getElementById("days").textContent = "El evento ya ha comenzado.";
        return;
    }

    // Calcular días, horas, minutos y segundos
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    // Mostrar el contador regresivo
    document.getElementById("days").querySelector(".number").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = remainingHours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = remainingMinutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = remainingSeconds.toString().padStart(2, "0");
}

// Actualizar el contador cada segundo
setInterval(updateCountdown, 1000);

// Ejecutar la función al cargar la página
updateCountdown();
