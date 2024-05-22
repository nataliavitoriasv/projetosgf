//FUNÇÃO PARA CARREGAR FUNCIONÁRIO NO SELECT
function carregarFuncionarios() {
  $.ajax({
      url: 'getFuncionarios_fp.php',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
          let select = $('#selectFuncionario');
          select.empty(); 
          data.forEach(funcionario => {
              let option = $('<option></option>').val(funcionario.id).text(funcionario.nome);
              select.append(option);
          });
      },
      error: function(error) {
          console.log('Erro ao carregar funcionários:', error);
      }
  });
}

//FUNÇÃO PARA CARREGAR DADOS DOS FUNCIONÁRIOS NOS INPUTS
function carregarDadosFuncionario() {
  let idFuncionario = $('#selectFuncionario').val();

  console.log('ID do funcionário selecionado:', idFuncionario); 
  if (idFuncionario) {
      $.ajax({
          url: 'getDados_fp.php',
          method: 'GET',
          data: { id: idFuncionario },
          dataType: 'json',
          success: function(funcionario) {
              console.log('Dados do funcionário:', funcionario);

              let cargoNome;
              if (funcionario.cargo.includes(' - ')) {
                  cargoNome = funcionario.cargo.split(' - ')[1];  
              } else {
                  cargoNome = funcionario.cargo;  
              }

              $('#nomeFuncionario').val(funcionario.nome);
              $('#cargoFuncionario').val(cargoNome);
              $('#departamentoFuncionario').val(funcionario.departamento);
              $('#dataAdmissao').val(funcionario.data_admissao);
              $('#horasTrabalhadas').val(funcionario.horas_trabalhadas); 
              $('#valorHoras').val(funcionario.valor_horas);            
              $('#salarioTotal').val(funcionario.salarioTotal);
          },
          error: function(error) {
              console.log('Erro ao carregar dados do funcionário:', error);
          }
      });
  }
}
$('#selectFuncionario').change(function() {
  console.log('Funcionário selecionado'); 
  carregarDadosFuncionario();
});


$(document).ready(function() {
  carregarFuncionarios();
});