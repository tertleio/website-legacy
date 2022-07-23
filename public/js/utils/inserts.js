'use strict';
const doc = document;

function create(html) {
  const div = doc.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}
