class Registro {
    constructor() {
        this.personas = [];
    }

    crearPersona(id, nombre, apellido, telefono, correo, clave) {
        const persona = new Persona(id, nombre, apellido, telefono, correo, clave);
        this.personas.push(persona);
        return persona;
    }

    obtenerPersonaPorCorreo(correo) {
        return this.personas.find(persona => persona.correo === correo);
    }
}

class Persona {
    constructor(id, nombre, apellido, telefono, correo, clave) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.clave = clave;
    }
}

function validarId(id) {
    return /^\d+$/.test(id);
}

function validarNombreApellido(texto) {
    return /^[A-Za-z]{3,}$/.test(texto);
}

function validarTelefono(telefono) {
    return /^\d+$/.test(telefono);
}

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function validarClave(clave) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(clave);
}

function crearPersona() {
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;
    const claveRepetida = document.getElementById('claveRepetida').value;

    const registro = new Registro();

    let validacionExitosa = true;

    if (!validarId(id)) {
        document.getElementById('id').style.borderColor = "red";
        validacionExitosa = false;
    } else {
        document.getElementById('id').style.borderColor = "";
    }

    if (!validarNombreApellido(nombre)) {
        document.getElementById('nombre').style.borderColor = "red";
        validacionExitosa = false;
    } else {
        document.getElementById('nombre').style.borderColor = "";
    }

    if (!validarNombreApellido(apellido)) {
        document.getElementById('apellido').style.borderColor = "red";
        validacionExitosa = false;
    } else {
        document.getElementById('apellido').style.borderColor = "";
    }

    if (!validarTelefono(telefono)) {
        document.getElementById('telefono').style.borderColor = "red";
        validacionExitosa = false;
    } else {
        document.getElementById('telefono').style.borderColor = "";
    }

    if (!validarCorreo(correo)) {
        document.getElementById('correo').style.borderColor = "red";
        validacionExitosa = false;
    } else {
        document.getElementById('correo').style.borderColor = "";
    }

    if (!validarClave(clave)) {
        document.getElementById('clave').style.borderColor = "red";
        validacionExitosa = false;
    } else {
        document.getElementById('clave').style.borderColor = "";
    }

    if (clave !== claveRepetida) {
        document.getElementById('claveRepetida').style.borderColor = "red";
        document.getElementById('errorClaves').style.display = 'block';
        validacionExitosa = false;
    } else {
        document.getElementById('claveRepetida').style.borderColor = "";
        document.getElementById('errorClaves').style.display = 'none';
    }

    if (!validacionExitosa) {
        document.getElementById('errorValidacion').style.display = 'block';
        return false;
    }

    document.getElementById('errorValidacion').style.display = 'none';

    // Llamada AJAX para enviar los datos al archivo PHP
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/registro.php', true); 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Si la petición fue exitosa, mostramos el mensaje de respuesta
            const response = JSON.parse(xhr.responseText);
            alert(response.message);
        } else {
            // Si ocurrió un error en la petición, mostramos el mensaje de error
            alert('Error al registrar usuario');
        }
    };
    xhr.onerror = function () {
        alert('Error de conexión');
    };
    const params = `id=${id}&nombre=${nombre}&apellido=${apellido}&telefono=${telefono}&correo=${correo}&clave=${clave}`;
    xhr.send(params);

    const persona = registro.crearPersona(id, nombre, apellido, telefono, correo, clave);
    mostrarPersona(persona);
    mostrarResumenRegistro(persona);

    // Mostrar mensaje de registro exitoso
    document.getElementById('registroExitoso').style.display = 'block';

    // Imprimir en consola
    console.log("Registro exitoso:", persona);

    return false;
}

function mostrarPersona(persona) {
    const datosRegistroDiv = document.getElementById('datosRegistro');
    datosRegistroDiv.innerHTML = `
        <h3>Resumen del Registro:</h3>
        <p>ID: ${persona.id}</p>
        <p>Nombre: ${persona.nombre}</p>
        <p>Apellido: ${persona.apellido}</p>
        <p>Teléfono: ${persona.telefono}</p>
        <p>Correo: ${persona.correo}</p>
    `;
}

function mostrarResumenRegistro(persona) {
    const resumenRegistroDiv = document.getElementById('resumenRegistro');
    resumenRegistroDiv.innerHTML = `
        <h3>Persona Registrada:</h3>
        <p>${persona.nombre} ${persona.apellido}</p>
    `;
}

    