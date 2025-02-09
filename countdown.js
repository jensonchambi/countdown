// countdown.js
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        eventName: decodeURIComponent(params.get("eventName") || ""),
        organizer: decodeURIComponent(params.get("organizer") || ""),
        startDate: decodeURIComponent(params.get("startDate") || ""),
        eventLocation: decodeURIComponent(params.get("eventLocation") || ""),
        imageUrl: decodeURIComponent(params.get("imageUrl") || ""),
    };
}

function extractCoordinatesFromUrl(url) {
    // Extraer las coordenadas de una URL de Google Maps
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
        return {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2]),
        };
    }
    return null;
}

function initMap() {
    const { eventLocation } = getQueryParams();

    if (!eventLocation) {
        document.getElementById("map").style.display = "none"; // Ocultar el mapa si no hay ubicación
        return;
    }

    // Extraer las coordenadas de la URL de Google Maps
    const coordinates = extractCoordinatesFromUrl(eventLocation);

    if (!coordinates) {
        document.getElementById("map").style.display = "none"; // Ocultar el mapa si no se encuentran coordenadas
        console.error("No se pudieron extraer coordenadas de la URL de Google Maps.");
        return;
    }

    // Mostrar el mapa con las coordenadas extraídas
    const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 15, // Nivel de zoom para mostrar la ubicación
    });

    // Agregar un marcador en la ubicación del evento
    new google.maps.Marker({
        map: map,
        position: coordinates,
    });
}

function updateCountdown() {
    const { eventName, startDate, imageUrl } = getQueryParams();

    if (!eventName || !startDate) {
        document.getElementById("days").textContent = "No se encontraron datos del evento.";
        return;
    }

    // Mostrar el nombre del evento
    document.getElementById("eventTitle").textContent = eventName;

    // Cargar la imagen del evento
    const eventImageElement = document.getElementById("eventImage");
    if (imageUrl) {
        eventImageElement.src = imageUrl;
    } else {
        eventImageElement.src = "https://picsum.photos/600/300"; // Imagen por defecto
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

// Inicializar el mapa cuando la API de Google Maps esté lista
window.initMap = initMap;

// Actualizar el contador cada segundo
setInterval(updateCountdown, 1000);

// Ejecutar la función al cargar la página
updateCountdown();
