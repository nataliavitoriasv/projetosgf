<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "projetosgf";

$con = mysqli_connect($servername, $username, $password, $database);

if (!$con) {
    die('Erro na conexão: ' . mysqli_connect_error());
}

$id = $_POST['id'];

$sql = "DELETE FROM funcionario WHERE id='$id'";

if ($con->query($sql) === TRUE) {
    echo "success"; 
} else {
    echo "Erro: " . $sql . "<br>" . mysqli_error($con);
}

$con->close();
?>