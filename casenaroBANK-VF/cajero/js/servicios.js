class ServicioCajero {
    constructor(producto) {
        this.producto = producto;
        this.saldo = 0;
        this.movimientos = [];
    }

    abonar(monto) {
        this.saldo += monto;
        console.log(`Abono de $${monto} realizado. Nuevo saldo: $${this.saldo}`);
        this.registrarMovimiento("abono", monto);
    }

    retirar(monto) {
        if (this.saldo >= monto) {
            this.saldo -= monto;
            console.log(`Retiro de $${monto} realizado. Nuevo saldo: $${this.saldo}`);
            this.registrarMovimiento("retiro", monto);
        } else {
            console.log("Saldo insuficiente.");
        }
    }

    consultarSaldo() {
        const saldoElement = document.getElementById('saldo-value');
        saldoElement.textContent = `Saldo disponible: $${this.saldo}`;
    }

    registrarMovimiento(tipo, monto) {
        const idMovimiento = this.generarIdUnico(); // Generar el ID único
        this.movimientos.push({ id: idMovimiento, tipo: tipo, monto: monto });

        // Llamar a la función para enviar el movimiento al servidor
        enviarMovimiento(idMovimiento, tipo, monto);
    }

    consultaMovimientos() {
        console.log("¡Bienvenido al área de Consulta de movimientos!");
        console.log("Historial de movimientos:");
        console.log("***************************************");
        console.table(this.movimientos);
        const movimientosList = document.getElementById('movimientos-list');
        movimientosList.innerHTML = '';
        this.movimientos.forEach((movimiento) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${movimiento.tipo}: $${movimiento.monto}`;
            movimientosList.appendChild(listItem);
        });
    }

    generarIdUnico() {
        // Generar un ID único utilizando la fecha actual en milisegundos
        const fechaActual = new Date();
        const idUnico = fechaActual.getTime(); // Obtener milisegundos desde 1970/01/01
        return idUnico;
    }
}

const servicioCajero = new ServicioCajero('producto');

document.getElementById('abonar-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const valorInput = document.getElementById('valor');
    const monto = parseFloat(valorInput.value);
    if (monto > 0) {
        servicioCajero.abonar(monto);
        valorInput.value = '';
        servicioCajero.consultarSaldo();
    } else {
        alert('Ingrese un valor válido');
    }
});

document.getElementById('retirar-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const valorInput = document.getElementById('valor');
    const monto = parseFloat(valorInput.value);
    if (monto > 0) {
        servicioCajero.retirar(monto);
        valorInput.value = '';
        servicioCajero.consultarSaldo();
    } else {
        alert('Ingrese un valor válido');
    }
});

document.getElementById('consultar-btn').addEventListener('click', (e) => {
    e.preventDefault();
    servicioCajero.consultaMovimientos();
});

function enviarMovimiento(id, accion, monto) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/registrar_movimiento.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                try {
                    const response = JSON.parse(xhr.responseText);
                    alert(response.message);
                } catch (e) {
                    console.error("Error parsing response:", xhr.responseText);
                }
            } else {
                console.error("Request failed with status:", xhr.status);
            }
        }
    };
    const params = `id=${encodeURIComponent(id)}&accion=${encodeURIComponent(accion)}&monto=${encodeURIComponent(monto)}`;
    xhr.send(params);
}

