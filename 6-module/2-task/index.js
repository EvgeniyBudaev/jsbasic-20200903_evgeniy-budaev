import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.init();
    this.addCard();
  }

  init() {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', this.toHTML(this.product));
    return card;
  }

  toHTML({image, price, name}) {
    return `
        <div class="card__top">
          <img src="../../../../assets/images/products/${image}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
            <img src="../../../../assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
        `;
  }

  addCard() {
    document.addEventListener('DOMContentLoaded', () => {
      const button = document.querySelector('.card__button');
      const card = document.querySelector('.card');

      card.addEventListener("product-add", function(event) {
        console.log('событие создано', event.detail);
      });

      button.addEventListener('click', () => {
        button.dispatchEvent(new CustomEvent("product-add", {
          detail: this.product.id,
          bubbles: true
        }));
      });
    });
  }

}
