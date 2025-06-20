const header = document.querySelector('header');

const labelSvg = document.querySelector('.label svg');
labelSvg.addEventListener('click', function () {
  location.reload()
})

const menuA = document.querySelectorAll('.menu a');
menuA.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = link.dataset.href;
  })
})


const onTheMain = document.querySelector('.onTheMain');
onTheMain.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = onTheMain.dataset.href;
})


const psHover = document.querySelector('footer .psHover');
const blockBack = document.querySelector('footer .blockBack');


psHover.addEventListener('mouseenter', function () {

  blockBack.classList.add('open')
})

psHover.addEventListener('mouseleave', function () {

  blockBack.classList.remove('open')
})


