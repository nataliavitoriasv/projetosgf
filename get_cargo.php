<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "projetosgf";

$con = mysqli_connect($servername, $username, $password, $database);

if (!$con) {
    die('Erro na conexão: ' . mysqli_connect_error());
}

$sql = "SELECT * FROM cargo ORDER BY nome";
$res = mysqli_query($con, $sql);

$cargos = array();

if (mysqli_num_rows($res) > 0) {
    while ($reg = mysqli_fetch_assoc($res)) {
        $cargos[] = $reg;
    }
} else {
    $cargos[] = array("id" => "", "nome" => "Nenhum cargo encontrado.");
}

echo json_encode($cargos);
?>