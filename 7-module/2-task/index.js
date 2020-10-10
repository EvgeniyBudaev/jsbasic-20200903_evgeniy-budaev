import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.options = {
      title: '',
      body: null
    };

    this.$container = document.querySelector('.container');
    this.$body = document.querySelector('body');
  }


  toHTML(options) {
    const {title} = options;
    return `
          <!--Корневой элемент Modal-->
  <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="../../../../assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          ${title}
        </h3>
      </div>

      <div class="modal__body"></div>
    </div>

  </div>
        `;
  }


  render(options) {
    this.$container.insertAdjacentHTML('afterbegin', this.toHTML(options));
  }


  open() {
    this.render(this.options);
    this.$body.classList.add('is-modal-open');
    const $modalBody = document.querySelector('.modal__body');
    $modalBody.insertAdjacentElement('beforeend', this.options.body);
    const $modalClose = document.querySelector('.modal__close');
    if ($modalClose) {
      $modalClose.addEventListener('click', this.close);
    }
    document.addEventListener('keydown', function (event) {
      if (event.code === 'Escape') {
        const modal = new Modal;
        modal.close();
      }
    });
  }


  setTitle(value) {
    return this.options.title = value;
  }


  setBody(value) {
    return this.options.body = value;
  }


  close() {
    this.$body = document.querySelector('body');
    this.$body.classList.remove('is-modal-open');
    this.$container = document.querySelector('.container');
    this.$container.innerHTML = '';
  }


}
