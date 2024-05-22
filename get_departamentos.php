<?php

$servername = "localhost";
$username = "root";
$password = "";
$database = "projetosgf";

$con = mysqli_connect($servername, $username, $password, $database);

if (!$con) {
    die('Erro na conexão: ' . mysqli_connect_error());
}

$sql = "SELECT * FROM departamento ORDER BY nome";
$res = mysqli_query($con, $sql);

$departamentos = array();

if (mysqli_num_rows($res) > 0) {
    while ($reg = mysqli_fetch_assoc($res)) {
        $departamentos[] = $reg;
    }
} else {
    $departamentos[] = array("id" => "", "nome" => "Nenhum departamento encontrado.");
}

echo json_encode($departamentos);



?>
