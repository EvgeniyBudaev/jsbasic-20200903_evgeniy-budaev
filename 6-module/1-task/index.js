/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this._rows = rows;
    this._tbody = this.init();
    this.elem = this._tbody;
    this.deleteRow();
  }

  init() {
    let tbody = document.createElement('tbody');
    for (let i = 0; i < this._rows.length; i++) {
      tbody.insertAdjacentHTML('beforeend', this.toRow(this._rows[i]));
    }
    return this._tbody = tbody;
  }

  toRow({name, age, salary, city}) {
    return `
            <tr>
            <td>${name}</td>
            <td>${age}</td>
            <td>${salary}</td>
            <td>${city}</td>
            <td><button>X</button></td>
            </tr>
            `;
  }

  deleteRow() {
    this.elem.addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
        event.target.closest('tr').remove();
      }
    });
  }
}
