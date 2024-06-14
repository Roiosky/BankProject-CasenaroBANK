function editarPerfil() {
    window.location.href = "../cajero/editarPerfil.html";
}

function inactivarCuenta() {
    const confirmacion = confirm("¿Está seguro de que desea inactivar su cuenta?");
    if (confirmacion) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../../casenaro_Bank/cajero/php/inactivarCuenta.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    console.log(response); 
                    if (response.message) {
                        alert(response.message);
                    }
                    if (response.redirect) {
                        window.location.href = response.redirect;
                    }
                } else {
                    console.error("Error al inactivar la cuenta:", xhr.status);
                }
            }
        };
        // Enviar la confirmación como parámetro en la solicitud POST
        xhr.send("confirmacion=true");
    }
} 