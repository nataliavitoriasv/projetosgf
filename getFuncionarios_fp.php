<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projetosgf";

$con = new mysqli($servername, $username, $password, $dbname);


if ($con->connect_error) {
    die("Conexão falhou: " . $con->connect_error);
}

$sql = "SELECT id, nome FROM funcionario";
$result = $con->query($sql);

if (!$result) {
    die("Erro na consulta: " . $con->error);
}

$funcionarios = array();
while($row = $result->fetch_assoc()) {
    $funcionarios[] = $row;
}

$con->close();

echo json_encode($funcionarios);
?>
