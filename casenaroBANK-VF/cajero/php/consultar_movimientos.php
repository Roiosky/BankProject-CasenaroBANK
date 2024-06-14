<?php


if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Usuario no autenticado"]);
    exit;
}

include 'conexion.php';

$idCustomer = $_SESSION['user_id'];  // Asegúrate de que esta variable de sesión está configurada correctamente en el inicio de sesión

// Usa una consulta preparada para mayor seguridad
$sql = "SELECT * FROM movimientos WHERE idcustomer = ? ORDER BY fecha DESC";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(["error" => "Error en la preparación de la consulta"]);
    exit;
}

$stmt->bind_param("i", $idCustomer);
$stmt->execute();
$result = $stmt->get_result();

$movimientos = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $movimientos[] = $row;
    }
} else {
    $movimientos = null;
}

$stmt->close();
$conn->close();

echo json_encode($movimientos);
?>
