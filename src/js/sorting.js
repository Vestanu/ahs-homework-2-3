export default class Sorting {
  constructor(data) {
    this.tbody = document.getElementById('tbody');
    this.thead = document.getElementById('thead');
    this.data = data;
    this.fields = Array.from(this.thead.getElementsByTagName('td')).map((td) => td.innerHTML);
    this.sortType = 'down';
  }

  sortData(field, sortDirect) {
    this.data.sort((a, b) => {
      const result = (a[field] > b[field]) ? (1 * sortDirect) : (-1 * sortDirect);
      return result;
    });
  }

  drawTable() {
    let html = '';
    this.data.forEach((item) => {
      html += '<tr>';
      this.fields.forEach((field) => {
        let value = item[field];
        if (field === 'year') value = `(${item[field]})`;
        if (field === 'imdb') value = item[field].toFixed(2);
        html += `<td>${value}</td>`;
      });
      html += '<tr>';
    });
    this.tbody.innerHTML = html;
    const spanArrow = this.thead.getElementsByTagName('span')[0];
    if (spanArrow !== undefined) spanArrow.remove();
  }

  sort(field) {
    const arraw = (this.sortType === 'down') ? '\u{2193}' : '\u{2191}';
    const sortDir = (this.sortType === 'down') ? 1 : -1;
    this.sortData(field, sortDir);
    this.drawTable();
    const td = this.thead.getElementsByTagName('td');
    for (let i = 0; i < td.length; i += 1) {
      if (td.item(i).textContent === field) td.item(i).innerHTML += `<span>${arraw}</span>`;
    }
  }
}
