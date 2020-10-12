export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.addEventListeners();
    this.setValue(value);
    this.droppable();
  }
  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>
    `);
    // return
    const steps = this.elem.querySelector('.slider__steps');
    let i;
    for (i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      steps.append(step);
    }

  }
  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }


  addEventListeners() {
    this.elem.onclick = (event) => {
      let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      this.setValue(Math.round(this.segments * newLeft));
      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        })
      );
    };
  }


  setValue(value) {
    this.value = value;
    let valuePercents = (value / this.segments) * 100;
    this.sub('thumb').style.left = `${valuePercents}%`;
    this.sub('progress').style.width = `${valuePercents}%`;
    this.sub('value').innerHTML = value;
    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }
    this.sub('steps').children[this.value].classList.add('slider__step-active');
  }


  droppable() {
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.ondragstart = () => false;
    this.progress = this.elem.querySelector('.slider__progress');

    this.thumb.onpointerdown = function(event) {
      console.log('this.elem', this.elem) // undefined
      this.elem.classList.add('slider_dragging');

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 0;
      }

      let leftPercents = leftRelative * 100;

      this.thumb.style.left = `${leftPercents}%`;
      this.progress.style.width = `${leftPercents}%`;

      let approximateValue = leftRelative * this.segments;
      let value = Math.round(approximateValue);
      this.setValue(value);
    }

    this.thumb.onpointerup = function(event) {
      this.elem.classList.remove('slider_dragging');
    }
}
