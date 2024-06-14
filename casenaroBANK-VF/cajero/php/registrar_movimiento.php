<?php
require_once 'conexion.php';

// Verificar si la solicitud es POST y si está presente el parámetro 'accion'
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['accion'])) {
    // Verificar si la sesión está activa y si existe el ID de usuario
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(["message" => "No se ha encontrado el ID de usuario en la sesión"]);
        exit();
    }

    $idCustomer = $_SESSION['user_id'];
    $idMovimiento = isset($_POST['id']) ? $_POST['id'] : ''; // Manejar correctamente la recepción del ID
    $monto = $_POST['monto'];
    $accion = $_POST['accion'];

    // Verificar si se ha enviado la fecha en el formulario
    $fecha = isset($_POST['fecha']) ? $_POST['fecha'] : date('Y-m-d H:i:s');

   

    // Preparar la consulta SQL con consultas preparadas
    $sql = "INSERT INTO movimientos (id, id_costumer, movimiento, fecha, monto) VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    // Vincular parámetros y ejecutar la consulta
    $stmt->bind_param("ssssd", $idMovimiento, $idCustomer, $accion, $fecha, $monto);
    $response = array();

    if ($stmt->execute()) {
        // Actualizar el balance del cliente
        if ($accion == 'abono') {
            $sql_update = "UPDATE cliente SET balance = balance + ? WHERE id_costumer = ?";
        } else if ($accion == 'retiro') {
            $sql_update = "UPDATE cliente SET balance = balance - ? WHERE id_costumer = ?";
        }

        // Preparar y ejecutar la consulta de actualización del balance
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("ds", $monto, $idCustomer);

        if ($stmt_update->execute()) {
            $response["message"] = "Movimiento registrado exitosamente";
        } else {
            $response["message"] = "Error al actualizar el balance: " . $conn->error;
        }
    } else {
        $response["message"] = "Error al registrar movimiento: " . $stmt->error;
    }

    echo json_encode($response);
}

$conn->close();
?>



