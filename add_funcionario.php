<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "projetosgf";

$con = mysqli_connect($servername, $username, $password, $database);

if (!$con) {
    die('Erro na conexão: ' . mysqli_connect_error());
}

$nomeFuncionario = $_POST['nomeFuncionario'];
$telefoneFuncionario = $_POST['telefoneFuncionario'];
$emailFuncionario = $_POST['emailFuncionario'];
$cargoFuncionario = $_POST['cargoFuncionario'];
$departamentoFuncionario = $_POST['departamentoFuncionario'];
$dataAdmissao = $_POST['dataAdmissao'];
$horasTrabalhadas = $_POST['horasTrabalhadas'];
$valorHoras = $_POST['valorHoras'];


error_log("Nome: $nomeFuncionario, Telefone: $telefoneFuncionario, Email: $emailFuncionario, Cargo: $cargoFuncionario, Departamento: $departamentoFuncionario, Data de Admissão: $dataAdmissao, Horas Trabalhadas: $horasTrabalhadas, Valor Horas: $valorHoras");

$sql = "INSERT INTO funcionario (nome, telefone, email, cargo, departamento, data_admissao, horas_trabalhadas, valor_horas) 
        VALUES ('$nomeFuncionario', '$telefoneFuncionario', '$emailFuncionario', '$cargoFuncionario', '$departamentoFuncionario', '$dataAdmissao', '$horasTrabalhadas', '$valorHoras')";

if ($con->query($sql) === TRUE) {
    die("success"); 
} else {
    echo "Erro: " . $sql . "<br>" . mysqli_error($con);
}

$con->close();
?>