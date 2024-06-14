<?php
require_once 'conexion.php';

// Verificar el método de solicitud
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se recibió la confirmación de inactivación
    if (isset($_POST['confirmacion']) && $_POST['confirmacion'] === "true") {
        // Desactivar la cuenta del usuario en la base de datos
        $sql = "UPDATE cliente SET status = '0'";
        $stmt = $conn->prepare($sql);

        if ($stmt->execute()) {
            // Respuesta objeto JSON
            $response = array(
                "message" => "Cuenta inactivadas correctamente"
            );

            // La respuesta como JSON
            header('Content-Type: application/json');
            echo json_encode($response);

            // Agregar una declaración de registro
            error_log(json_encode($response)); // Esto se imprimirá en los registros del servidor
        } else {
            // Preparar la respuesta como un objeto JSON
            $response = array("error" => "Error al inactivar las cuentas: " . $stmt->error);

            // Devolver la respuesta como JSON
            header('Content-Type: application/json');
            echo json_encode($response);
        }

        $stmt->close();
    } else {
        // Si no se recibió la confirmación, devolver un error
        $response = array("error" => "Confirmación de inactivación no recibida");

        // Devolver la respuesta como JSON
        header('Content-Type: application/json');
        echo json_encode($response);
    }
} else {
    // respuesta como un objeto JSON
    $response = array("error" => "Método de solicitud no válido");

    // Devolver la respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>

