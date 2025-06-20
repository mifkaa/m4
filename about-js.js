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
