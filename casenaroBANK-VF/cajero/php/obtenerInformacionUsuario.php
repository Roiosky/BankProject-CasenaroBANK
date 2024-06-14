<?php
require_once 'conexion.php';

// Verificar el método de solicitud
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el correo del usuario enviado desde el cliente
    $correo = $_POST['correo'];

    // Consultar la información del usuario en la base de datos
    $sql = "SELECT id_costumer, costumer_name, costumer_last_name, phone, mail FROM cliente WHERE mail = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar si se encontró el usuario
    if ($result->num_rows > 0) {
        // Obtener los datos del usuario
        $usuario = $result->fetch_assoc();

        // Devolver los datos del usuario en formato JSON
        header('Content-Type: application/json');
        echo json_encode($usuario);
    } else {
        http_response_code(404); // No encontrado
        echo json_encode(array("error" => "Usuario no encontrado"));
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(array("error" => "Método de solicitud no válido"));
}
?>
