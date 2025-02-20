// countdown.js
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        eventName: decodeURIComponent(params.get("eventName") || ""),
        organizer: decodeURIComponent(params.get("organizer") || ""),
        startDate: decodeURIComponent(params.get("startDate") || ""),
        eventLocation: decodeURIComponent(params.get("eventLocation") || ""),
        imageUrl: decodeURIComponent(params.get("imageUrl") || ""),
        countdownStyle: decodeURIComponent(params.get("countdownStyle") || ""),
    };
}

function updateCountdown() {
    const { eventName, startDate, imageUrl, eventLocation, countdownStyle } = getQueryParams();

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

    // Asignar la URL de Google Maps al enlace del ícono
    const mapLinkElement = document.getElementById("mapLink");
    if (eventLocation) {
        mapLinkElement.href = eventLocation;
    } else {
        document.getElementById("locationLink").style.display = "none"; // Ocultar si no hay ubicación
    }

    // Mostrar el contador regresivo según la opción seleccionada
    if (countdownStyle === "overlay") {
        document.getElementById("countdownOverlay").style.display = "block";
        document.getElementById("countdownBelow").style.display = "none";
    } else if (countdownStyle === "below") {
        document.getElementById("countdownOverlay").style.display = "none";
        document.getElementById("countdownBelow").style.display = "flex";
    } else if (countdownStyle === "image") {
        document.getElementById("countdownOverlay").style.display = "block";
        document.getElementById("countdownBelow").style.display = "none";

        // Esperar a que la imagen de fondo se cargue completamente
        eventImageElement.onload = () => {
            generateImage(); // Generar la imagen solo una vez
        };
    }

    // Calcular el tiempo restante
    const eventTime = new Date(startDate).getTime();
    const now = new Date().getTime();
    const timeDifference = eventTime - now;

    if (timeDifference <= 0) {
        document.getElementById("days").textContent = "El evento ya ha comenzado.";
        document.getElementById("daysBelow").textContent = "El evento ya ha comenzado.";
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

    document.getElementById("daysBelow").querySelector(".number").textContent = days.toString().padStart(2, "0");
    document.getElementById("hoursBelow").textContent = remainingHours.toString().padStart(2, "0");
    document.getElementById("minutesBelow").textContent = remainingMinutes.toString().padStart(2, "0");
    document.getElementById("secondsBelow").textContent = remainingSeconds.toString().padStart(2, "0");
}

// Función para generar la imagen
function generateImage() {
    // Configurar html2canvas para capturar correctamente la imagen de fondo
    html2canvas(document.getElementById("countdownContainer"), {
        useCORS: true, // Permitir el uso de imágenes externas (CORS)
        allowTaint: true, // Permitir el uso de imágenes externas (taint)
        logging: true, // Habilitar logs para depuración
    }).then((canvas) => {
        // Convertir el canvas a una imagen
        const image = canvas.toDataURL("image/png");

        // Crear un enlace para descargar la imagen
        const link = document.createElement("a");
        link.href = image;
        link.download = "evento.png";
        link.click();
    }).catch((error) => {
        console.error("Error al generar la imagen:", error);
    });
}

// Actualizar el contador cada segundo
setInterval(updateCountdown, 1000);

// Ejecutar la función al cargar la página
updateCountdown();
