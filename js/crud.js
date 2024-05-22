//DECLARANDO VARIÁVEIS
let btnAdicionar = document.getElementById('btnAdicionar');
let btnAlterar = document.getElementById('btnAlterar');
let btnSalvar = document.getElementById('btnSalvar');
let btnExcluir = document.getElementById('btnExcluir');
let funcionarios = [];
let idFuncionarioAlterar = null;

//FUNCÃO LIMPAR INPUTS DO FORMULÁRIO
function limparInputsFormulario() {
  document.getElementById('nomeFuncionario').value = '';
  document.getElementById('telefoneFuncionario').value = '';
  document.getElementById('emailFuncionario').value = '';
  document.getElementById('cargoFuncionario').value = '';
  document.getElementById('departamentoFuncionario').value = '';
  document.getElementById('dataAdmissao').value = '';
  document.getElementById('horasTrabalhadas').value = '';
  document.getElementById('valorHoras').value = '';
}

//FUNCÇÃO EXIBIR FUNCIONARIOS NA TABELA
function exibirFuncionariosNaTabela() {
  let tbody = document.getElementById('tbodyFuncionario');
  tbody.innerHTML = '';
  funcionarios.forEach(funcionario => {
    
    let cargoNome;
    if (funcionario.cargo.includes(' - ')) {
      cargoNome = funcionario.cargo.split(' - ')[1];  
    } else {
      cargoNome = funcionario.cargo;  
    }

    let tr = document.createElement('tr');
    tr.setAttribute('data-id', funcionario.id); 
    tr.innerHTML = `
      <td>${funcionario.id}</td>
      <td>${funcionario.nome}</td>
      <td>${funcionario.telefone}</td>
      <td>${funcionario.email}</td>
      <td>${cargoNome}</td>  <!-- Usamos apenas o nome do cargo -->
      <td>${funcionario.departamento}</td>
      <td>${funcionario.data_admissao}</td>
      <td>${funcionario.horas_trabalhadas}</td>
      <td>${funcionario.valor_horas}</td>
      <td><input type="checkbox" value="${funcionario.id}"></td>
    `;
    tbody.appendChild(tr);
  });
  console.log("Funcionários exibidos na tabela:", funcionarios);
}

//FUNÇÃO CARREGAR FUNCIONARIOS
function carregarFuncionarios() {
  $.get('get_funcionarios.php', function (data) {
    funcionarios = JSON.parse(data);
    exibirFuncionariosNaTabela();
  });
}

//FUNÇÃO PREENCHER DEPARTAMENTOS
function preencherDepartamentos() {
  $.getJSON('get_departamentos.php')
    .done(function (data) {
      $('#departamentoFuncionario').empty();
      $('#departamentoFuncionario').append($('<option>', {
        value: '',
        text: 'Selecione o departamento'
      }));
      $.each(data, function (index, departamento) {
        $('#departamentoFuncionario').append($('<option>', {
          value: departamento.nome,
          text: departamento.nome
        }));
      });
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Requisição AJAX falhou: " + err);
    });
}

//FUNÇÃO PREENCHER CARGO
function preencherCargo() {
  $.getJSON('get_cargo.php')
    .done(function (data) {
      $('#cargoFuncionario').empty();
      $('#cargoFuncionario').append($('<option>', {
        value: '',
        text: 'Selecione o cargo'
      }));
      $.each(data, function (index, cargo) {
        $('#cargoFuncionario').append($('<option>', {
          value: cargo.salario + ' - ' + cargo.nome,
          text: cargo.nome
        }));
      });
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Requisição AJAX falhou: " + err);
    });
}


$(document).ready(function() {
  preencherDepartamentos();
  preencherCargo();
  carregarFuncionarios();
});

//BOTÃO ADICIONAR
btnAdicionar.addEventListener('click', function(event) {
  event.preventDefault();

  let nome = document.getElementById('nomeFuncionario').value;
  let telefone = document.getElementById('telefoneFuncionario').value;
  let email = document.getElementById('emailFuncionario').value;
  let cargo = document.getElementById('cargoFuncionario').value;
  let departamento = document.getElementById('departamentoFuncionario').value;
  let dataAdmissao = document.getElementById('dataAdmissao').value;
  let horasTrabalhadas = document.getElementById('horasTrabalhadas').value;
  let valorHoras = document.getElementById('valorHoras').value;

  console.log({ nome, telefone, email, cargo, departamento, dataAdmissao, horasTrabalhadas, valorHoras });

  let formData = {
    nomeFuncionario: nome,
    telefoneFuncionario: telefone,
    emailFuncionario: email,
    cargoFuncionario: cargo,
    departamentoFuncionario: departamento,
    dataAdmissao: dataAdmissao,
    horasTrabalhadas: horasTrabalhadas,
    valorHoras: valorHoras
  };

  $.ajax({
    url: 'add_funcionario.php',
    type: 'POST',
    data: formData,
    success: function(response) {
      console.log("Resposta do servidor: '" + response + "'");
      if (response === 'success') {
        alert('Funcionário cadastrado com sucesso!');
        limparInputsFormulario();
        carregarFuncionarios();
      } else {
        alert('Erro ao cadastrar o funcionário! Mensagem do servidor: ' + response);
      }
    },
    error: function(xhr, status, error) {
      alert('Erro na requisição: ' + xhr.responseText);
    }
  });
});

//FUNÇÃO DA CHECKBOX
function obterCheckboxesSelecionados() {
  let checkboxes = document.querySelectorAll('#tbodyFuncionario input[type="checkbox"]:checked');
  return checkboxes;
}

//BOTÃO ALTERAR
btnAlterar.addEventListener('click', function (event) {
  event.preventDefault();
  let listaCheckboxes = obterCheckboxesSelecionados();

  if (listaCheckboxes.length !== 1) {
    alert('Selecione apenas um funcionário para alterar.');
    return;
  }

  let idFuncionarioSelecionado = listaCheckboxes[0].value;

  let funcionarioSelecionado = funcionarios.find(funcionario => funcionario.id === idFuncionarioSelecionado);

  if (funcionarioSelecionado) {
    preencherFormulario(funcionarioSelecionado); 
  } else {
    alert('Funcionário não encontrado.');
  }
});

//FUNÇÃO PREENCHER FORMULÁRIO
function preencherFormulario(funcionario) {
  document.getElementById('nomeFuncionario').value = funcionario.nome;
  document.getElementById('telefoneFuncionario').value = funcionario.telefone;
  document.getElementById('emailFuncionario').value = funcionario.email;

  let cargoNome = funcionario.cargo.includes(' - ') ? funcionario.cargo.split(' - ')[1] : funcionario.cargo;
  let op = document.getElementById('cargoFuncionario');

  let indice = Array.from(op.options).findIndex(option => option.text === cargoNome);

  op.selectedIndex = indice;

  document.getElementById('departamentoFuncionario').value = funcionario.departamento;
  document.getElementById('dataAdmissao').value = funcionario.data_admissao;
  document.getElementById('horasTrabalhadas').value = funcionario.horas_trabalhadas;
  document.getElementById('valorHoras').value = funcionario.valor_horas;

  idFuncionarioAlterar = funcionario.id;
}

//BOTÃO SALVAR
btnSalvar.addEventListener('click', function (event) {
  event.preventDefault();

  let nome = document.getElementById('nomeFuncionario').value;
  let telefone = document.getElementById('telefoneFuncionario').value;
  let email = document.getElementById('emailFuncionario').value;
  let cargo = document.getElementById('cargoFuncionario').value.includes(' - ') ? document.getElementById('cargoFuncionario').value.split(' - ')[1] : document.getElementById('cargoFuncionario').value;
  let departamento = document.getElementById('departamentoFuncionario').value;
  let dataAdmissao = document.getElementById('dataAdmissao').value;
  let horasTrabalhadas = document.getElementById('horasTrabalhadas').value;
  let valorHoras = document.getElementById('valorHoras').value;

  var dados = {
    id: idFuncionarioAlterar,
    nome: nome,
    telefone: telefone,
    email: email,
    cargo: cargo,
    departamento: departamento,
    dataAdmissao: dataAdmissao,
    horasTrabalhadas: horasTrabalhadas,
    valorHoras: valorHoras
  };

  $.ajax({
    url: 'alterar_funcionario.php', 
    type: "POST",
    dataType: "json",  
    data: dados,
    success: function(response){
      console.log(response);
      if (response.success) {
        alert('Funcionário atualizado com sucesso!');
        limparInputsFormulario();
        carregarFuncionarios();
      } else {
        alert('Erro ao atualizar funcionário.');
      }
    },
    error: function(erro){
      console.log("Ocorreu um erro ao executar a requisção: " ,erro);
      alert("Ocorreu um erro ao executar a requisição: ", erro);
    }
  });
});

//BOTÃO EXCLUIR
btnExcluir.addEventListener('click', function (event) {
  event.preventDefault();
  let listaCheckboxes = obterCheckboxesSelecionados();

  if (listaCheckboxes.length === 0) {
    alert('Selecione pelo menos um funcionário para excluir.');
    return;
  }

  if (confirm('Tem certeza de que deseja excluir os funcionários selecionados?')) {
    listaCheckboxes.forEach(checkbox => {
      let id = checkbox.value;
      $.post('excluir_funcionario.php', { id: id }, function (response) {
        if (response === 'success') {
          let indexParaExcluir = funcionarios.findIndex(funcionario => funcionario.id === parseInt(id));
          if (indexParaExcluir !== -1) {
            funcionarios.splice(indexParaExcluir, 1); 
          }
          exibirFuncionariosNaTabela();
          location.reload(); 
        } else {
          alert('Erro ao excluir funcionário.');
        }
      });
    });
  }
});


//CÁLCULO VALOR HORAS DE ACORDO COM O CARGO
document.getElementById("horasTrabalhadas").addEventListener("focusout", function() {
  let optioncargo = document.getElementById("cargoFuncionario");
  let salario = parseFloat(optioncargo.options[optioncargo.selectedIndex].value.split(' - ')[0]);
  // let salario = optioncargo.options[optioncargo.selectedIndex].value;
  let horasT = parseFloat(document.getElementById("horasTrabalhadas").value);

  if (!isNaN(salario) && !isNaN(horasT) && horasT > 0) {
    let valorHora = salario / horasT;
    document.getElementById("valorHoras").value = valorHora.toFixed(0);
  } else {
    document.getElementById("valorHoras").value = '';
  }
});

window.onload = carregarFuncionarios;
