const size = 130;
const strokeWidth = 10;

let animate = false;
let hide = false;
let value = 42;
if (localStorage.getItem("animate") !== null && typeof JSON.parse(localStorage.animate) === 'boolean') { animate = JSON.parse(localStorage.animate) }
if (localStorage.getItem("hide") !== null && typeof JSON.parse(localStorage.hide) === 'boolean') { hide = JSON.parse(localStorage.hide) }
if (localStorage.getItem("value") !== null && typeof JSON.parse(localStorage.value) === 'number') { value = JSON.parse(localStorage.value) }


const maxValue = 100;
const circle = document.querySelector('.circle');
const circleShape = document.querySelector('.circle__shape');


const checkValue = (n) => (n > maxValue || n < 0) ? false : true;

const changeValue = (n) => {
  if (checkValue(n)) {
    console.log('Value set to', n);
    circle.style.setProperty('--value', `${n}`);
    localStorage.value = n;
  } else {
    throw new Error(`Incorrect value: ${n}`);
  }
}

const setAnim = (flag) => {
  if (typeof flag === 'boolean') {
    animate = flag;
  }
  document.querySelector('#animate').checked = animate;
  if (animate) {
    circleShape.style.setProperty('transition', 'stroke-dashoffset .3s ease-in-out');
  } else {
    circleShape.style.removeProperty('transition');
  }
  localStorage.animate = animate;
}

const setHide = (flag) => {
  if (typeof flag === 'boolean') {hide = flag}
  document.querySelector('#hide').checked = hide;
  if (hide) {
    circleShape.style.setProperty('opacity', '0');
  } else {
    circleShape.style.setProperty('opacity', '1');
  }
  localStorage.hide = hide;

}

const main = () => {
  circle.style.setProperty('--wh', `${size}px`);
  circle.style.setProperty('--stroke-width', `${strokeWidth}px`);
  circle.style.setProperty('--value', `${value}`);
  circle.style.setProperty('--max-value', `${maxValue}`);
  document.querySelector('#value').setAttribute('value', value);
  changeValue(value);
  setAnim(animate);
  setHide(hide);

  document.querySelector('#value').addEventListener('input', function() {
    if (this.value !== '') changeValue(this.value);
  });

  document.querySelector('#animate').addEventListener('change', function() {
    setAnim(this.checked);
  })

  document.querySelector('#hide').addEventListener('change', function() {
    setHide(this.checked);
  })

}

window.onload = () => {
  main();
}