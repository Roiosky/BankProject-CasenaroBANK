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

    // Actualizar los datos del usuario en la base de datos
    $sql = "UPDATE cliente SET costumer_name=?, costumer_last_name=?, phone=?, mail=?, passw=? WHERE id_costumer=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssi", $nombre, $apellido, $telefono, $correo, $clave, $id);

    if ($stmt->execute()) {
        // Preparar la respuesta como un objeto JSON
        $response = array("message" => "Perfil actualizado exitosamente");

        // Devolver la respuesta como JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // Preparar la respuesta como un objeto JSON
        $response = array("error" => "Error al actualizar el perfil: " . $stmt->error);

        // Devolver la respuesta como JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    $stmt->close();
} else {
    // Preparar la respuesta como un objeto JSON
    $response = array("error" => "Método de solicitud no válido");

    // Devolver la respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
