// script.js
document.getElementById("eventForm").addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los datos del formulario
    const eventName = encodeURIComponent(document.getElementById("eventName").value);
    const organizer = encodeURIComponent(document.getElementById("organizer").value);
    const startDate = encodeURIComponent(document.getElementById("startDate").value);
    const eventLocation = encodeURIComponent(document.getElementById("eventLocation").value);
    const imageUrl = encodeURIComponent(document.getElementById("imageUrl").value);
    const countdownStyle = encodeURIComponent(document.getElementById("countdownStyle").value);

    // Construir la URL con los parámetros
    const params = new URLSearchParams({
        eventName,
        organizer,
        startDate,
        eventLocation,
        imageUrl,
        countdownStyle,
    });

    // Redirigir a countdown.html con los parámetros en la URL
    window.location.href = `countdown.html?${params.toString()}`;
});
