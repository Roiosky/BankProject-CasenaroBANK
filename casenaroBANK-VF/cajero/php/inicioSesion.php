<?php
require_once 'conexion.php';

// Inicializar el array de respuesta
$response = array();

// Verificar el método de solicitud
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $correo = $_POST['correo'];
    $clave = $_POST['clave'];

    // Consulta para iniciar sesión
    $sql = "SELECT id_costumer FROM cliente WHERE mail=? AND passw=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $correo, $clave);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($idCustomer);
        $stmt->fetch();

        $_SESSION['correo'] = $correo;
        $_SESSION['logged_in'] = true;
        $_SESSION['user_id'] = $idCustomer; // Guardar el ID del cliente en la sesión

        $response["message"] = "Inicio de sesión exitoso";
        $response["id_customer"] = $idCustomer; // Incluir el ID del cliente en la respuesta
    } else {
        $response["message"] = "Credenciales incorrectas";
    }

    $stmt->close();
} else {
    $response["message"] = "Método de solicitud no válido";
}

// Devolver la respuesta en formato JSON
echo json_encode($response);
?>
