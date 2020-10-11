import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 1 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.addEventListeners();
  }

  render(value = 0) {
    this.elem = createElement(
      `
                 <div class="slider">
                    <div class="slider__thumb" style="left: 50%;">
                      <span class="slider__value">${value}</span>
                    </div>


                    <div class="slider__progress" style="width: 50%;"></div>

                    <div class="slider__steps"></div>
                  </div>
            `
    );

    const steps = this.elem.querySelector('.slider__steps');
    let fragment = document.createDocumentFragment();
    let i;
    for (i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      step.setAttribute('data-id', i);
      fragment.appendChild(step);
    }
    steps.append(fragment);

    // Значения по-умолчанию
    // const thumb = this.elem.querySelector('.slider__thumb');
    // thumb.style.left = 25 * value + '%';
    //
    // const progress = this.elem.querySelector('.slider__progress');
    // progress.style.width = 25 * value + '%';

    // Добавление активного класса элементу по-умолчанию
    const start = this.elem.querySelectorAll('[data-id]');
    for (let j = 0; j < start.length; j++) {
      start[value].classList.add('slider__step-active');
    }

  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }


  addEventListeners() {
    this.elem.onclick = (event) => {
      const span = event.target.closest('span');
      if (span) {

        const id = span.getAttribute('data-id');
        this.setValue(id);

        span.classList.add('slider__step-active');

        const thumb = document.querySelector('.slider__thumb');
        thumb.style.left = 25 * id + '%';

        const progress = document.querySelector('.slider__progress');
        progress.style.width = 25 * id + '%';

        // Генерация пользовательского события
        let itemElem = event.target.closest('.slider__step-active');
        if (itemElem) {
          this.elem.dispatchEvent(new CustomEvent('slider-change', {
            detail: this.value,
            bubbles: true
          }));
          event.preventDefault();
        }

        // Перемещение ползунка
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        const steps = this.elem.querySelector('.slider__steps');
        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);
        let valuePercents = value / segments * 100;

      }
    };
  }

  setValue(value) {
    this.sub('value').textContent = value;
    return this.value = value;
  }
}
