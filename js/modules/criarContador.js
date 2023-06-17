import calcTime from './calcTime.js';
import CriarWindow from './window.js';

export default function CriarContador(titleValue, dateValue, descValue) {
  // Definições

  const formEdit = document.querySelector('#tela-editar form');

  const contadoresSection = document.getElementById('contadores');

  const div = document.createElement('div');
  div.classList.add('contador');

  const title = document.createElement('h2');
  title.innerText = titleValue;

  const date = document.createElement('p');
  date.classList.add('data');

  const desc = document.createElement('p');
  desc.classList.add('desc');
  desc.innerText = descValue;

  div.appendChild(title);
  div.appendChild(date);
  div.appendChild(desc);

  div.setAttribute('data-date', dateValue);

  const id = contadoresSection.childElementCount;
  div.setAttribute('data-id', id);

  div.querySelector('p.data').innerText = calcTime(div.getAttribute('data-date'));

  const deleteBtn = document.createElement('img');
  deleteBtn.setAttribute('src', 'img/delete.svg');
  deleteBtn.classList.add('delete');

  const editBtn = document.createElement('img');
  editBtn.setAttribute('src', 'img/edit.svg');
  editBtn.classList.add('edit');

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  buttons.appendChild(deleteBtn);
  buttons.appendChild(editBtn);

  div.appendChild(buttons);

  deleteBtn.addEventListener('click', (e) => {
    if (prompt('Digite "DELETAR" para confirmar!').toLowerCase() === 'deletar') {
      const getId = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
      const dataStorage = localStorage.dates.split('\\');
      console.log(dataStorage[getId], getId);
      dataStorage.splice(getId, 1);
      localStorage.dates = dataStorage.join('\\');
      e.currentTarget.parentNode.parentNode.remove();
    }
  });

  const telaEditar = new CriarWindow({
    openBtn: editBtn,
    windowElement: document.querySelector('#tela-editar'),
    formElement: formEdit,
    submitBtn: document.querySelector('#tela-editar form button'),

    requiredInputs: ['#title', '#date'],
    type: 'edit',

    firstAction(obj) {
      console.log(obj);
      const pai = obj.parentNode.parentNode;
      formEdit.title.value = pai.querySelector('h2').innerText;
      formEdit.date.value = pai.getAttribute('data-date');
      formEdit.description.value = pai.querySelector('p.desc').innerText;
    },

    action(i) {
      const pai = i.parentNode.parentNode;
      console.log(pai);
      pai.querySelector('h2').innerText = formEdit.title.value;
      const novaData = calcTime(formEdit.date.value);
      pai.querySelector('p.data').innerText = novaData;
      pai.querySelector('p.desc').innerText = formEdit.description.value;

      pai.setAttribute('data-date', formEdit.date.value);
    },
  });

  telaEditar.init();

  return div;
}
