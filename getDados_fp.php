<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projetosgf";


$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Conexão falhou: " . $con->connect_error);
}

$id = $_GET['id'];

$sql = "SELECT nome, cargo, departamento, data_admissao, horas_trabalhadas, valor_horas, (horas_trabalhadas * valor_horas) as salarioTotal FROM funcionario WHERE id = $id";
$result = $con->query($sql);

if (!$result) {
    die("Erro na consulta: " . $con->error);
}

$funcionario = $result->fetch_assoc();

$funcionario['salarioTotal'] = number_format($funcionario['salarioTotal'], 2, '.', '');

$con->close();

echo json_encode($funcionario);
?>
