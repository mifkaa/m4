const body = document.querySelector('body');
const header = document.querySelector('header');

const labelSvg = document.querySelector('.label svg');
labelSvg.addEventListener('click', function () {
  location.reload()
})

const nextPageOn = document.querySelector('#nextPageOn');
const nextPageOff = document.querySelector('#nextPageOff');


function fNextPageOn() {
  setTimeout(() => {
    nextPageOn.style.display = 'none';
  }, 500)
}

fNextPageOn();


const menuA = document.querySelectorAll('.menu a');
menuA.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = link.dataset.href;


    // nextPageOff.style.display = 'block';
    // setTimeout(() => {
    //   window.location.href = link.dataset.href;

    // }, 500)

    // window.location.href = link.dataset.href;
  })
})


const mainLabelSpans = document.querySelectorAll('.mainLabel span');
let indexLabel = 0;

mainLabelSpans.forEach(span => {
  indexLabel += 1;
  span.style.animation = `labelAnimation 2s ease-in-out infinite ${indexLabel * 0.15}s`;
})









const container = document.querySelector('.outputBlock');
const fullText = "Once upon a time, there was a wizard named Mifka who could turn boring ideas into stunning websites with a flick of his mouse. One day, a confused business owner exclaimed, “I need a website!” With a wink, Mifka said, “Don’t worry! Your site will be so beautiful, even pixels will cry!” After a few clicks, the business owner’s dazzling website was born, attracting visitors like bees to honey.  ...";
const words = fullText.split(' ');
let currentIndex = words.length - 1;

// Создаем измеритель ширины
const measurer = document.createElement('span');
measurer.style.visibility = 'hidden';
measurer.style.position = 'absolute';
measurer.style.whiteSpace = 'nowrap';
measurer.style.fontSize = '30px';
document.body.appendChild(measurer);

function showNextText() {


  // Определяем сколько слов помещается
  let visibleWords = [];
  let currentLength = 0;
  const maxWidth = container.offsetWidth - 20;

  for (let i = currentIndex; i < words.length; i++) {
    measurer.textContent = [...visibleWords, words[i]].join(' ');
    if (measurer.offsetWidth > maxWidth) break;
    visibleWords.push(words[i]);
  }

  // Если не поместилось ни одного слова - берем первое (обрежется)
  if (visibleWords.length === 0 && words.length > 0) {
    visibleWords = [words[currentIndex]];
  }

  // Создаем новый блок с текстом
  const newBlock = document.createElement('div');
  newBlock.className = 'text-block';
  newBlock.textContent = visibleWords.join(' ');
  newBlock.style.opacity = '0';
  newBlock.style.transform = 'translateY(20px)';

  // Добавляем в контейнер
  container.innerHTML = '';
  container.appendChild(newBlock);

  // Анимация появления
  setTimeout(() => {
    newBlock.style.opacity = '1';
    newBlock.style.transform = 'translateY(0)';
  }, 10);




  // Обновляем индекс
  currentIndex += visibleWords.length;
  if (currentIndex >= words.length) {

    currentIndex = 0;
    setTimeout(showNextText, 5500);

  }
  else {
    setTimeout(showNextText, 200);

  }



}

showNextText();




const hoverBlock = document.querySelector('.hoverOutputBlock');
const blockBack = document.querySelector('.blockBack');

const BackFirst = document.querySelector('.blockBack .first');
const BackSecond = document.querySelector('.blockBack .second');




blockBack.addEventListener('click', function () {
  BackFirst.classList.toggle('show');
  BackSecond.classList.toggle('show');
})




// const customCursor = document.querySelector('.custom-cursor');


hoverBlock.addEventListener('mousemove', function (e) {

  blockBack.classList.add('open')

  hoverBlock.classList.add('max')

  // customCursor.style.display = 'block';
  // customCursor.style.left = `${e.clientX - 15}px`;
  // customCursor.style.top = `${e.clientY - 15}px`;
})

hoverBlock.addEventListener('mouseleave', function () {

  blockBack.classList.remove('open')

  hoverBlock.classList.remove('max')

  // customCursor.style.display = 'none';
})



const tabCursor = document.querySelector('.tabCursor');
let mouseX = body.offsetWidth/2 - tabCursor.offsetWidth/2 - 4;
let mouseY = body.offsetHeight - 220;
let cursorX = 0;
let cursorY = 0;
let isInside = false;

// Запоминаем позицию курсора
blockBack.addEventListener('mousemove', (e) => {
  blockBack.classList.add('open')
  hoverBlock.classList.add('max')

  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!isInside) {
    tabCursor.classList.add('visible');
    isInside = true;
  }
});

blockBack.addEventListener('mouseleave', () => {
  blockBack.classList.remove('open')
  hoverBlock.classList.remove('max')

  tabCursor.classList.remove('visible');
  isInside = false;
});

// Анимация с запаздыванием
function animateCursor() {
  // Вычисляем разницу между курсором и ярлыком
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;

  // Двигаем ярлык с эффектом "резинки"
  cursorX += dx * 0.2;
  cursorY += dy * 0.2;

  tabCursor.style.left = cursorX + 35 + 'px';
  tabCursor.style.top = cursorY + 35 + 'px';

  // Добавляем эффект "растяжения" при быстром движении
  const distance = Math.sqrt(dx * dx + dy * dy);
  const scaleY = 1 + Math.min(distance * 0.015, 0.2);
  const scaleX = 1 - Math.min(distance * 0.012, 0.1);
  tabCursor.style.transform = `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`;

  requestAnimationFrame(animateCursor);
}

animateCursor();






