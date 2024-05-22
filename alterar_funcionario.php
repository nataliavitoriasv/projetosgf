<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "projetosgf";

$con = mysqli_connect($servername, $username, $password, $database);

if (!$con) {
    die('Erro na conexão: ' . mysqli_connect_error());
}


// echo "ID do Funcionário: " . $_POST['id'] . "<br>";
// echo "Nome: " . $_POST['nome'] . "<br>";
// echo "Telefone: " . $_POST['telefone'] . "<br>";
// echo "Email: " . $_POST['email'] . "<br>";
// echo "Cargo: " . $_POST['cargo'] . "<br>";
// echo "Departamento: " . $_POST['departamento'] . "<br>";
// echo "Data de Admissão: " . $_POST['dataAdmissao'] . "<br>";
// echo "Horas Trabalhadas: " . $_POST['horasTrabalhadas'] . "<br>";
// echo "Valor Horas: " . $_POST['valorHoras'] . "<br>";

$id = $_POST['id'];
$nome = $_POST['nome'];
$telefone = $_POST['telefone'];
$email = $_POST['email'];
$cargo = $_POST['cargo'];
$departamento = $_POST['departamento'];
$dataAdmissao = $_POST['dataAdmissao'];
$horasTrabalhadas = $_POST['horasTrabalhadas'];
$valorHoras = $_POST['valorHoras'];

$sql = "UPDATE funcionario SET 
        nome='$nome', 
        telefone='$telefone', 
        email='$email', 
        cargo='$cargo', 
        departamento='$departamento', 
        data_admissao='$dataAdmissao', 
        horas_trabalhadas='$horasTrabalhadas', 
        valor_horas='$valorHoras' 
    WHERE id='$id'";

if ($con->query($sql) === true) {
    echo json_encode(["success"=>true]); 
} else {
    echo "Erro: " . $sql . "<br>" . mysqli_error($con);
}

$con->close();
?>