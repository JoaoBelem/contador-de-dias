/*
Meu Deus do céu,
Fiz tanta gambiara pra isso funcionar,
Que nem sei se vale a pena tentar entender isso.
*/

import CriarWindow from './modules/window.js';
import readInfo from './modules/readInfo.js';
import CriarContador from './modules/criarContador.js';

const contadoresSection = document.getElementById('contadores');

readInfo();

// Verifica se há algum dado guardado no computador do usuário.
// Caso não exista, então será criado o storage.
if (!localStorage.dates) {
  localStorage.dates = String();
}

// Cria a janela de adicionar
const telaAdicionar = new CriarWindow({
  openBtn: document.querySelector('#btn-adicionar'),
  windowElement: document.getElementById('tela-adicionar'),
  formElement: document.querySelector('#tela-adicionar form'),
  submitBtn: document.querySelector('#tela-adicionar form button'),

  requiredInputs: ['#title', '#date'],
  action() {
    console.log('a');
    const id = this.contadoresSection.childElementCount;
    this.storageInfo.save(`${this.formElement.title.value}|${this.formElement.date.value}|${this.formElement.description.value}|${id}\\`);

    this.contadoresSection.appendChild(CriarContador(this.formElement.title.value, this.formElement.date.value, this.formElement.description.value));
  },
});

telaAdicionar.init();

const btnDelete = document.querySelector('#btn-deletar');

btnDelete.addEventListener('click', () => {
  if (prompt('Digite "DELETAR" para confirmar e deletar TODAS as datas!').toLowerCase() === 'deletar') {
    contadoresSection.innerHTML = '';
    localStorage.dates = '';
  }
});
