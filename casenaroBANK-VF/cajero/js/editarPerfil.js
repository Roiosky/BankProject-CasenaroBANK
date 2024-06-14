document.addEventListener("DOMContentLoaded", function () {
    const formularioEditarPerfil = document.getElementById("formularioEditarPerfil");
    const mensajeError = document.getElementById("mensajeError");
    const errorClaves = document.getElementById("errorClaves");

    formularioEditarPerfil.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("id").value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
        const clave = document.getElementById("clave").value;
        const claveRepetida = document.getElementById("claveRepetida").value;

        // Validar que las contraseñas coincidan
        if (clave !== claveRepetida) {
            errorClaves.style.display = "block";
            return;
        }

        // Realizar la petición AJAX para editar el perfil
        const xhr = new XMLHttpRequest();
        xhr.open("POST","php/editarPerfil.php", true); //"../../casenaro_Bank/cajero" así estaba antes de modificarlo.
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.message === "Perfil actualizado exitosamente") {
                        // Mostrar mensaje de éxito
                        alert("Perfil actualizado exitosamente");
                    } else {
                        // Mostrar mensaje de error
                        mensajeError.textContent = response.error;
                        mensajeError.style.display = "block";
                    }
                } else {
                    console.error("Hubo un error en la solicitud");
                }
            }
        };

        // Formatear los datos a enviar
        const data = `id=${id}&nombre=${nombre}&apellido=${apellido}&telefono=${telefono}&correo=${correo}&clave=${clave}`;
        xhr.send(data);
    });
});
