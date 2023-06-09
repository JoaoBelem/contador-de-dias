const dados = [{titulo: 'Dias pro meu aniversário', data: '18 03 2024 00:00'}];

const btnAdd = document.querySelector('#btn-adicionar');
const telaAdd = document.querySelector('#tela-adicionar');
const addForm = document.forms['adicionar-contador'];
const btnSubmit = document.querySelector('#tela form button')
let datas = document.querySelectorAll('.contador');
const inputInvalido = document.querySelector('#invalido');
const contadoresSection = document.getElementById('contadores');
const telaEdit = document.querySelector('#tela-editar');
const editForm = document.forms['editar-contador'];


if(!localStorage.dates){
  localStorage.dates = '';
}

btnAdd.addEventListener('click', () => {
  telaAdd.classList.add('show');
  telaAdd.addEventListener('click', (e) => {
    if(e.target === telaAdd) {
      telaAdd.classList.remove('show');
    }
  })
});

// Cria os elementos e adiciona ao DOM
function createElement(titleValue, dateValue, descValue){
  const div = document.createElement('div');
  div.classList.add('contador');
  
  const title = document.createElement('h2');
  title.innerText = titleValue;
  
  const date = document.createElement('p');
  date.classList.add('data');

  const desc = document.createElement('p');
  desc.innerText = descValue;

  div.appendChild(title);
  div.appendChild(date);
  div.appendChild(desc);

  div.setAttribute('data-date', dateValue);
  const id = contadoresSection.childElementCount - 1;
  div.setAttribute('data-id', id);

  div.querySelector('p.data').innerText = handleShowDiff(div);
  
  const deleteBtn = document.createElement('img');
  deleteBtn.setAttribute('src', 'img/delete.svg');
  deleteBtn.classList.add('delete');

  const editBtn = document.createElement('img');
  editBtn.setAttribute('src', 'img/edit.svg');
  editBtn.classList.add('edit');

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  buttons.appendChild(deleteBtn);
  // buttons.appendChild(editBtn);

  div.appendChild(buttons);

  deleteBtn.addEventListener('click', (e) => {
    if(prompt('Digite "DELETAR" para confirmar!').toLowerCase() === 'deletar'){
      const getId = e.currentTarget.parentNode.getAttribute('data-id');
      let dataStorage = localStorage.dates.split('\\');
      dataStorage.splice(getId, 1);
      localStorage.dates = dataStorage.join('\\');
      e.currentTarget.parentNode.parentNode.remove();
    }   
  });

  // editBtn.addEventListener('click', (e) => {
  //   console.log(telaEdit);
  //   telaEdit.classList.add('show');
  //   editForm.title.value = titleValue;
  //   editForm.date.value = titleValue;
  //   editForm.description.value = titleValue;

  //   editForm.ok.addEventListener('click', function handleClick(event) {
  //     event.preventDefault();
  //     console.log(e);
  //     editForm.ok.removeEventListener('click', handleClick());
  //   });

  //   telaEdit.addEventListener('click', (e) => {
  //     if(e.currentTarget = telaEdit)
  //       telaEdit.classList.remove('show');
  //   })
  // });

  telaAdd.classList.remove('show');
  return div;
}

btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  if(addForm.title.value && addForm.date.value && addForm.description.value){
    if(!addForm.title.value.match(/[\\|]/g)){
      const id = contadoresSection.childElementCount;

      contadoresSection.appendChild(createElement(addForm.title.value, addForm.date.value, addForm.description.value));

      localStorage.dates += `${addForm.title.value}|${addForm.date.value}|${addForm.description.value}|${id}\\`;
      
      console.log(addForm.title.value, addForm.date.value);
  
      addForm.reset();
    } else{
      console.log('invalido');
      inputInvalido.innerText = 'Título inválido';
      inputInvalido.classList.add('show');
      addForm.title.classList.add('error');
      setTimeout(() => {
        inputInvalido.classList.remove('show');
        addForm.title.classList.remove('error');
      },3000);
    }
  }else{
    inputInvalido.innerText = 'Espaços em branco';
    inputInvalido.classList.add('show');
    setTimeout(() => {
      inputInvalido.classList.remove('show');
    },3000);
  }
});

const atual = new Date();

// Calcular diferença entre duas datas
function handleShowDiff(e){
  let futureDate = e.getAttribute('data-date').replace('-', '/');
  futureDate = new Date(futureDate);
  let difference = futureDate.getTime() - atual.getTime();
  difference = Math.floor(difference / (1000 * 60 * 60 * 24));

  futureDate = `${futureDate.getDate()}/${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getFullYear()}`;

  return `Faltam ${difference + 1} dias para ${futureDate}`;
}

datas.forEach((item) => handleShowDiff(item));

const local = localStorage.dates.split('\\');
local.pop();

local.forEach((item) => {
  itemReal = item.split('|');
  contadoresSection.appendChild(createElement(itemReal[0], itemReal[1], itemReal[2]));
})

const btnDelete = document.querySelector('#btn-deletar')

btnDelete.addEventListener('click', () => {
  if(prompt('Digite "DELETAR" para confirmar!').toLowerCase() === 'deletar'){
    contadoresSection.innerHTML = '';
    localStorage.dates = '';
  }
})