/* eslint-disable brace-style */
/*
openBtn
windowElement
submitBtn
*/

import StorageInfo from './storageInfo.js';

export default class CriarWindow {
  constructor({ ...args }) {
    this.openBtn = args.openBtn;
    this.windowElement = args.windowElement;
    this.submitBtn = args.submitBtn;
    this.formElement = args.formElement;

    if (args.requiredInputs !== undefined) {
      this.requiredInputs = args.requiredInputs.map((i) => {
        const element = this.formElement.querySelector(i);
        return element;
      });
    }

    this.invalidMsg = this.formElement.querySelector('.invalid');

    this.mode = args.mode;

    this.action = args.action;

    this.firstAction = args.firstAction;

    this.contadoresSection = document.getElementById('contadores');

    this.showWindow = this.showWindow.bind(this);
    this.removeWindow = this.removeWindow.bind(this);

    this.handleInit = this.handleInit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWindowClasses = this.handleWindowClasses.bind(this);

    this.storageInfo = new StorageInfo();
  }

  // Torna a window visível
  showWindow() {
    this.windowElement.classList.add('show');
    this.windowElement.addEventListener('click', this.handleWindowClasses);
    this.submitBtn.addEventListener('click', this.handleSubmit);

    if (this.firstAction) {
      this.firstAction(this.openBtn);
    }
  }

  // Torna a window não visível
  removeWindow() {
    this.windowElement.classList.remove('show');
    this.windowElement.removeEventListener('click', this.handleWindowClasses);
    this.submitBtn.removeEventListener('click', this.handleSubmit);
  }

  handleWindowClasses(e) {
    if (e.target === this.windowElement) {
      this.removeWindow();
      // this.windowElement.classList.remove('show');
      // this.windowElement.removeEventListener('click', this.handleWindowClasses);
    }
  }

  // Envia as informações criando um contador, também salva as informações
  handleSubmit(e) {
    e.preventDefault();

    const title = this.formElement.querySelector('#title');

    const checkValues = this.requiredInputs.map((i) => {
      if (i.value) {
        return true;
      }
      return false;
    });

    // Caso os espaços estejam preenchidos
    if (checkValues.every((i) => i === true)) {
      // Caso exista algum caractére inválido
      if (title.value.match(/[\\|]/g)) {
        title.classList.add('error');
        this.invalidMsg.classList.add('show');
        this.invalidMsg.innerHTML = 'Carácteres inválidos: &#92;, |';

        setTimeout(() => {
          title.classList.remove('error');
          this.invalidMsg.classList.remove('show');
          this.invalidMsg.innerText = '';
        }, 5000);
      }
      // Caso esteja tudo bem, faça o SUBMIT
      else {
        this.action(this.openBtn);

        // this.windowElement.classList.remove('show');
        this.removeWindow();
        this.formElement.reset();
      }
    }
    // Caso os espaços NÃO estejeam preenchidos
    else {
      this.requiredInputs.forEach((element) => {
        if (!element.value) {
          element.classList.add('error');
          setTimeout(() => {
            element.classList.remove('error');
          }, 5000);
        }
      });

      this.invalidMsg.classList.add('show');
      this.invalidMsg.innerText = 'Preencha os espaços necessários';

      setTimeout(() => {
        this.invalidMsg.classList.remove('show');
        this.invalidMsg.innerText = '';
      }, 5000);
    }
  }

  handleInit() {
    this.openBtn.addEventListener('click', this.showWindow);
  }

  init() {
    switch (this.mode) {
      case 'dev':
        console.log('dev');
        console.log(this);

        window.onload = () => this.windowElement.classList.add('show');
        break;

      case 'open':
        console.log('open');
        console.log(this);

        this.handleInit();
        this.showWindow();
        break;

      default:
        this.handleInit();
    }

    return this;
  }
}
