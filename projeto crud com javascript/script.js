// Seletores dos elementos do DOM
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

// Abre o modal. Se edit=true, preenche os campos com os dados do item no índice informado.
function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  // Fecha o modal ao clicar fora dele (no backdrop)
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index
  } else {
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
    id = undefined
  }
}

// Abre o modal em modo de edição para o item no índice informado
function editItem(index) {
  openModal(true, index)
}

// Remove o item no índice informado e atualiza a tabela
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

// Cria e insere uma linha na tabela com os dados do item
function insertItem(item, index) {
  let tr = document.createElement('tr')
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${parseFloat(item.salario).toFixed(2)}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

// Ao clicar em Salvar: valida, salva/atualiza o item e fecha o modal
btnSalvar.onclick = e => {
  e.preventDefault()

  if (sNome.value === '' || sFuncao.value === '' || sSalario.value === '') {
    return
  }

  if (id !== undefined) {
    // Atualiza item existente
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else {
    // Adiciona novo item
    itens.push({
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value
    })
  }

  setItensBD()
  modal.classList.remove('active')
  loadItens()
  id = undefined
}

// Carrega itens do localStorage e renderiza a tabela
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

// Lê os itens salvos no localStorage
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

// Salva os itens no localStorage
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

// Inicializa a tabela ao carregar a página
loadItens()
