let intentosFallidos = 0;
const MAX_INTENTOS = 3;

document.addEventListener("DOMContentLoaded", function () {
    const btnIniciarSesion = document.getElementById("btnIniciarSesion");
    const correoInput = document.getElementById("correo");
    const claveInput = document.getElementById("clave");
    const mensajeError = document.getElementById("mensajeError");

    btnIniciarSesion.addEventListener("click", function () {
        const correo = correoInput.value;
        const clave = claveInput.value;

        // Validar que los campos no estén vacíos
        if (correo.trim() === "" || clave.trim() === "") {
            alert("Por favor complete su correo y contraseña");
            return;
        }

        // Realizar la petición AJAX para iniciar sesión
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "php/inicioSesion.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.message === "Inicio de sesión exitoso") {
                            // Redireccionar o mostrar un mensaje de éxito
                            window.location.href = "menuPrincipal.html";
                            alert("Bienvenido al menú principal");
                        } else {
                            alert('Error al iniciar sesión');
                            intentosFallidos++;
                            if (intentosFallidos >= MAX_INTENTOS) {
                                alert("Se ha superado el número máximo de intentos. La cuenta será bloqueada por 24 horas.");
                                document.getElementById('mensajeError').style.display = 'block';
                            }
                            // Mostrar mensaje de error
                            mensajeError.textContent = response.message;
                            mensajeError.style.display = "block";
                        }
                    } catch (error) {
                        console.error("Error al analizar la respuesta JSON:", error);
                        mensajeError.textContent = "Respuesta inválida del servidor";
                        mensajeError.style.display = "block";
                    }
                } else {
                    console.error("Hubo un error en la solicitud:", xhr.status);
                    // Mostrar un mensaje de error genérico
                    mensajeError.textContent = "Error en la solicitud al servidor";
                    mensajeError.style.display = "block";
                }
            }
        };

        // Manejar errores de red
        xhr.onerror = function () {
            console.error("Error de red al realizar la solicitud");
            // Mostrar un mensaje de error genérico
            mensajeError.textContent = "Error de conexión";
            mensajeError.style.display = "block";
        };

        // Formatear los datos a enviar
        const data = "correo=" + encodeURIComponent(correo) + "&clave=" + encodeURIComponent(clave);
        xhr.send(data);
    });
});


