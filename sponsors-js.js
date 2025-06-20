const blocking = document.querySelector('#blocking');
const nextPageOn = document.querySelector('#nextPageOn');
const nextPageOff = document.querySelector('#nextPageOff');
const header = document.querySelector('header');

const labelSvg = document.querySelector('.label svg');
labelSvg.addEventListener('click', function () {
  location.reload()
})


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

    // nextPageOff.style.display = 'block';
    // setTimeout(() => {
    //   window.location.href = link.dataset.href;

    // }, 500)
    window.location.href = link.dataset.href;
  })
})



const cubesActive = document.querySelectorAll('.cubeActive');

const infoCube = document.querySelector('.infoCube');
const infoCubeTitle = document.querySelector('.infoCube .title');
const infoCubeText = document.querySelector('.infoCube .text');

cubesActive.forEach(cube => {
  let infoCubeClone;

  cube.addEventListener('mouseenter', function () {
    //сделать что как бы из хеавера в форме капельки  выдвигается блок с текстом и туда же уходит
    // добавить  курицу с тапом по активацию по ентеру и управлением стрелочкаим
    //сделать анимацию загрузки на сайт а то работает некорректно

    let text = cube.textContent;
    const arr = text.split(/\s+/)

    infoCubeTitle.innerHTML = arr[1];
    infoCubeText.innerHTML = text.replace(arr[1], '', 1);

    infoCubeClone = infoCube.cloneNode(true);
    document.body.appendChild(infoCubeClone);

    if (cube.classList.contains('cubeInRight')) {
      infoCubeClone.style.animation = 'openInfoCubeRight 1s ease ';
      infoCubeClone.classList.add('infoCubeOpenRight');
    }
    if (cube.classList.contains('cubeInLeft')) {
      infoCubeClone.style.animation = 'openInfoCubeLeft 1s ease ';
      infoCubeClone.classList.add('infoCubeOpenLeft');
    }



  })

  cube.addEventListener('mouseleave', function () {


    if (cube.classList.contains('cubeInRight')) {
      infoCubeClone.classList.remove('infoCubeOpenRight');
      infoCubeClone.classList.add('infoCubeCloseRight');
      uwu(infoCubeClone);
    }
    if (cube.classList.contains('cubeInLeft')) {
      infoCubeClone.classList.remove('infoCubeOpenLeft');
      infoCubeClone.classList.add('infoCubeCloseLeft');
      uwu(infoCubeClone);
    }

  })

  function uwu(infoCubeClone) {
    setTimeout(() => { infoCubeClone.remove() }, 1000)
  }

})






//проверка на ошибки при перенаправлении на внешний ресурс 

document.addEventListener('DOMContentLoaded', function () {

  const fallbackUrl = 'error.html'; // Ваша страница 404
  const loader = document.querySelector('.loader');

  cubesActive.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      link.classList.add('selected');
      blocking.style.display = 'block';


      const url = this.dataset.url;
      loader.style.display = 'block';

      // Создаём скрытый iframe для проверки
      const testFrame = document.createElement('iframe');
      testFrame.style.display = 'none';
      testFrame.src = url;
      document.body.appendChild(testFrame);

      let isWorking = false; // Флаг "рабочий ли сайт"
      const timeout = 4400; // 4 секунды на проверку

      // Если iframe загрузился успешно
      testFrame.onload = () => {

        setTimeout(() => {
          isWorking = true;
          cleanup();
          loader.style.display = 'none';
          link.classList.remove('selected');
          blocking.style.display = 'none';
          window.open(url, '_blank'); // Открываем сайт
        }, 1300) // для более красивой загрузки сайта 
      };

      // Если iframe не загрузился (ошибка или блокировка)
      testFrame.onerror = () => {
        cleanup();
        // Проверяем, был ли iframe заблокирован (например, Сбербанк)
        setTimeout(() => {
          try {
            // Пытаемся получить доступ к iframe (если заблокирован — будет ошибка)
            const frameDoc = testFrame.contentDocument || testFrame.contentWindow.document;
            // Если дошли сюда — iframe загружен, но контент невидим (например, 404 внутри iframe)
            if (!isWorking) {
              loader.style.display = 'none';
              link.classList.remove('selected');
              blocking.style.display = 'none';

              window.location.href = fallbackUrl;
            }
          } catch (e) {
            loader.style.display = 'none';
            link.classList.remove('selected');
            blocking.style.display = 'none';

            // Если iframe заблокирован (Сбербанк и т.д.) — считаем, что сайт рабочий
            window.open(url, '_blank');
          }
        }, 100);
      };

      // Таймер на случай, если iframe вообще не ответил
      setTimeout(() => {
        if (!isWorking) {
          cleanup();
          loader.style.display = 'none';
          link.classList.remove('selected');
          blocking.style.display = 'none';

          window.location.href = fallbackUrl;
        }
      }, timeout);

      // Удаляем iframe после проверки
      function cleanup() {
        document.body.removeChild(testFrame);
      }
    });
  });
});





