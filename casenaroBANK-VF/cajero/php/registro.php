<?php
require_once 'conexion.php';

// Verificar el método de solicitud
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $clave = $_POST['clave'];

    // Verificar si el ID o correo ya están registrados
    $sql_check = "SELECT id_costumer, mail FROM cliente WHERE id_costumer = ? OR mail = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("ss", $id, $correo);
    $stmt_check->execute();
    $stmt_check->store_result();

    // Si ya existe un registro con ese ID o correo, mostrar un mensaje de error
    if ($stmt_check->num_rows > 0) {
        // Preparar la respuesta como un objeto JSON
        $response = array("message" => "El ID o correo ya están registrados");

        // Devolver la respuesta como JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // Insertar datos en la tabla cliente
        $sql_insert = "INSERT INTO cliente (id_costumer, costumer_name, costumer_last_name, phone, mail, passw, balance) VALUES (?, ?, ?, ?, ?, ?, 0)";
        $stmt_insert = $conn->prepare($sql_insert);
        $stmt_insert->bind_param("ssssss", $id, $nombre, $apellido, $telefono, $correo, $clave);

        if ($stmt_insert->execute()) {
            // Preparar la respuesta como un objeto JSON
            $response = array("message" => "Usuario registrado exitosamente");

            // Devolver la respuesta como JSON
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            // Preparar la respuesta como un objeto JSON
            $response = array("message" => "Error al registrar el usuario: " . $stmt_insert->error);

            // Devolver la respuesta como JSON
            header('Content-Type: application/json');
            echo json_encode($response);
        }

        $stmt_insert->close();
    }

    $stmt_check->close();
} else {
    // Preparar la respuesta como un objeto JSON
    $response = array("message" => "Método de solicitud no válido");

    // Devolver la respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>

