<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "projetosgf";

$con = mysqli_connect($servername, $username, $password, $database);

if (!$con) {
    die('Erro na conexão: ' . mysqli_connect_error());
}

$sql = "SELECT id, nome, telefone, email, cargo, departamento, data_admissao, horas_trabalhadas, valor_horas FROM funcionario";
$result = $con->query($sql);

if ($result) {
    $funcionarios = array();
    while ($row = $result->fetch_assoc()) {
        $funcionarios[] = $row;
    }
    echo json_encode($funcionarios);
} else {
    echo "Erro ao obter funcionários: " . mysqli_error($con);
}

$con->close();
?>