import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.init();
    this.addEventListeners();
    this.addClassActive()
  }

  render() {
    this.elem = createElement(`
  <!--Корневой элемент RibbonMenu-->
  <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="../../../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <!--Ссылки на категории-->
    <nav class="ribbon__inner"></nav>
    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="../../../../assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
        `)

    let categories = this.categories.map(item => createElement(`
    <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`))

    this.sub('inner').append(...categories);
  }


  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }


  init() {
    // let ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left')
    // ribbonArrowLeft.classList.remove('ribbon__arrow_visible')
  }


  addClassActive() {
    const itemStatusAll = this.elem.querySelector('[data-id=""]')
    if (itemStatusAll) {
      itemStatusAll.classList.add('ribbon__item_active')
    }

  }


  addEventListeners() {
    this.elem.onclick = ({target}) => {
      let ribbonInner = this.elem.querySelector('.ribbon__inner')
      let ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left')
      let ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right')

      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      console.log('scrollLeft ', scrollLeft);
      console.log('scrollRight', scrollRight);

      let button = target.closest('.ribbon__arrow');
      if (button) {

          let id = target.closest('[data-id]').dataset.id;
          console.log('res', id)
          this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
              detail: id,
              bubbles: true
          }));
      }

      if (target.closest('.ribbon__arrow_right')) {
        this.next(ribbonInner, ribbonArrowRight, scrollRight);
      }

      if (target.closest('.ribbon__arrow_left')) {
        this.prev(ribbonInner, ribbonArrowLeft, scrollLeft);
      }
    };
  }


  next(ribbonInner, ribbonArrowRight, scrollRight) {
    ribbonInner.scrollBy(350, 0);
    ribbonInner.addEventListener('scroll', () => {
      if (scrollRight <= 1) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible')
      } else if (scrollRight > 1) {
        ribbonArrowRight.classList.add('ribbon__arrow_visible')
      }
    })
  }


  prev(ribbonInner, ribbonArrowLeft, scrollLeft) {
    ribbonInner.scrollBy(-350, 0);
    ribbonInner.addEventListener('scroll', () => {
      console.log('scrollLeft', scrollLeft);
      if (scrollLeft === 0) {
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible')
      } else if (scrollLeft > 0) {
        ribbonArrowLeft.classList.add('ribbon__arrow_visible')
      }
    })
  }

}
