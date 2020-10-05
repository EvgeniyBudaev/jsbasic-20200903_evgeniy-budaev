import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.init();
    this.control();
  }


  init() {
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    carousel.insertAdjacentHTML('beforeend', this.toHTML(this.slides));
    return carousel;
  }



  toHTML(slides) {
    return `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="../../../../assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="../../../../assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
      ${this.iteratorSlides(slides)}
        `;
  }


  iteratorSlides(slides) {
    return slides.map(slide => this.slide(slide));
  }


  slide({image, price, name}) {
    return `
        <div class="carousel__slide" data-id="red-curry-veggies">
          <img src="../../../../assets/images/carousel/${image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${price}</span>
            <div class="carousel__title">${name}</div>
            <button type="button" class="carousel__button">
              <img src="../../../../assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        `;
  }


  control() {
    document.addEventListener('DOMContentLoaded', () => {
      const carouselSlideAll = document.querySelectorAll('.carousel__slide');
      const carouselArrowRight = document.querySelector('.carousel__arrow_right');
      const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
      const carouselSlide = document.querySelector('.carousel__slide');
      const carouselInner = document.querySelector('.carousel__inner');
      let total = 0;
      let counter = 1;
      const amountSliders = Array.from(carouselSlideAll).length;
      const slideWidth = carouselSlide.offsetWidth;

      if (counter === 1) {
        carouselArrowLeft.style.display = 'none';
      }

      carouselArrowRight.addEventListener('click', function () {
        carouselArrowLeft.style.display = '';
        counter += 1;
        total += slideWidth;
        if (counter < amountSliders) {
          carouselInner.style.transform = `translateX(-${total}px)`;
          carouselArrowRight.style.display = '';
        } else if (counter > amountSliders) {
          total -= slideWidth;
        } else if (counter === amountSliders) {
          carouselInner.style.transform = `translateX(-${total}px)`;
          carouselArrowRight.style.display = 'none';
        }
      });

      carouselArrowLeft.addEventListener('click', function () {
        counter -= 1;
        total -= slideWidth;
        if (counter < amountSliders) {
          carouselInner.style.transform = `translateX(-${total}px)`;
          carouselArrowRight.style.display = '';
        } if (counter < 1) {
          total += slideWidth;
        } if (counter === 1) {

          carouselArrowLeft.style.display = 'none';
        }
      });
    });
  }

}
