const blocking = document.querySelector('#blocking');
const header = document.querySelector('header');

const labelSvg = document.querySelector('.label svg');
labelSvg.addEventListener('click', function () {
  location.reload()
})

const menuA = document.querySelectorAll('.menu a');
menuA.forEach(link =>{
  link.addEventListener('click', (e) =>{
    e.preventDefault();
    window.location.href = link.dataset.href;
  })
})



const cubesActive = document.querySelectorAll('.cubeActive');

const infoCube = document.querySelector('.infoCube');
const infoCubeTitle = document.querySelector('.infoCube .title');
const infoCubeText = document.querySelector('.infoCube .text');

// let openInfoCube = true;

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
      setTimeout(()=>{infoCubeClone.remove()},1000)
    }

})


// const psHover = document.querySelector('footer .psHover');
// const blockBack = document.querySelector('footer .blockBack');


// psHover.addEventListener('mouseenter', function () {

//   blockBack.classList.add('open')
// })

// psHover.addEventListener('mouseleave', function () {

//   blockBack.classList.remove('open')
// })





//проверка на ошибки при перенаправлении на внешний ресурс 

document.addEventListener('DOMContentLoaded', function() {

  const fallbackUrl = 'error.html'; // Ваша страница 404
  const loader = document.querySelector('.loader');

  cubesActive.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      link.classList.add('selected');
      blocking.style.display='block';


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
       
        setTimeout(()=>{
            isWorking = true;
            cleanup();
            loader.style.display = 'none';
            link.classList.remove('selected');
            blocking.style.display='none';
            window.open(url, '_blank'); // Открываем сайт
        },1300) // для более красивой загрузки сайта 
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
            blocking.style.display='none';

              window.location.href = fallbackUrl;
            }
          } catch (e) {
            loader.style.display = 'none';
            link.classList.remove('selected');
            blocking.style.display='none';

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
            blocking.style.display='none';

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














// document.addEventListener('DOMContentLoaded', function() {
//   const fallbackUrl = 'error404.html'; // Путь к вашей странице 404

//   cubesActive.forEach(link => {
//     link.addEventListener('click', function(e) {
//       e.preventDefault(); // Отменяем стандартное поведение
//       const url = this.dataset.url;

//       // Создаём скрытый iframe для проверки загрузки
//       const testFrame = document.createElement('iframe');
//       testFrame.style.display = 'none';
//       testFrame.src = url;
//       document.body.appendChild(testFrame);

//       // Таймер для отслеживания ошибок
//       let hasError = false;
//       const timeout = setTimeout(() => {
//         hasError = true;
//         showFallback();
//       }, 5000); // 5 секунд на загрузку

//       // Если iframe загрузился с ошибкой
//       testFrame.onerror = () => {
//         hasError = true;
//         showFallback();
//       };

//       // Если iframe загрузился успешно — открываем ссылку
//       testFrame.onload = () => {
//         if (!hasError) {
//           window.open(url, '_blank');
//         }
//       };

//       // Показываем 404 и чистим iframe
//       function showFallback() {
//         document.body.removeChild(testFrame);
//         window.location.href = fallbackUrl;
//       }
//     });
//   });
// });





// document.addEventListener('DOMContentLoaded', function() {
  
//   cubesActive.forEach(link => {
//     link.addEventListener('click', function() {
//       const url = this.dataset.url; // Достаём ссылку из data-url
//       const fallbackUrl = 'error404.html'; // Ваша страница с ошибкой
      
//       // Пробуем открыть сайт в новой вкладке
//       const newWindow = window.open(url, '_blank');
      
//       // Если через 3 секунды окно закрыто (блокировка или ошибка) → показываем 404
//       setTimeout(() => {
//         if (newWindow.closed || !newWindow.location.href) {
//           window.location.href = fallbackUrl;
//         }
//       }, 3000);
//     });
//   });
// });



// Ждём загрузки DOM
// document.addEventListener("DOMContentLoaded", function() {
//   // Все кликабельные дивы
//   const cubesLinks = document.querySelectorAll("[data-url]"); // Лучше использовать data-атрибуты!

//   cubesLinks.forEach(div => {
//     div.addEventListener("click", async function(e) {
//       e.preventDefault(); // Отменяем переход по умолчанию
//       const url = div.dataset.url; // Ссылка из data-url
//       const fallbackUrl = "/404.html";

//       // Показываем загрузку (опционально)
//     //   div.style.opacity = "0.5";
//     //   div.textContent = "Проверяем ссылку...";

//       try {
//         // Проверяем ссылку через прокси (обход CORS)
//         const isAvailable = await checkLink(url);
        
//         if (isAvailable) {
//           window.open(url, "_blank"); // Открываем в новой вкладке
//         } else {
//           window.location.href = fallbackUrl;
//         }
//       } catch (error) {
//         console.error("Ошибка:", error);
//         window.location.href = fallbackUrl;
//       } finally {
//         // Возвращаем исходное состояние
//         div.style.opacity = "1";
//         div.textContent = div.dataset.originalText || "Перейти";
//       }
//     });
//   });
// });

// // Функция проверки ссылки (с таймаутом и CORS-прокси)
// async function checkLink(url) {
//   const timeout = 5000; // 5 секунд
//   const corsProxy = "https://cors-anywhere.herokuapp.com/"; // Прокси для обхода CORS
  
//   try {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), timeout);

//     // Используем прокси для проверки любых URL
//     const response = await fetch(corsProxy + url, {
//       method: "HEAD",
//       signal: controller.signal,
//     });

//     clearTimeout(timeoutId);
//     return response.ok; // true, если статус 200-299
//   } catch (error) {
//     return false; // Любая ошибка = сайт недоступен
//   }
// }






// cubesActive.forEach((div) => {
//   div.addEventListener("click", async function(e) {
//     e.preventDefault(); // Отменяем стандартное поведение (если нужно)

//     // 1. Достаём ссылку из атрибута onclick
//     const onclickContent = div.getAttribute("onclick");
//     const urlMatch = onclickContent.match(/window\.open\('(.*?)'\)/);
    
//     if (!urlMatch) return; // Если ссылки нет, выходим

//     const url = urlMatch[1]; // Это наша ссылка (https://...)
//     const fallbackUrl = "/404.html";
//     const timeout = 5000; // 5 секунд

//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), timeout);

//       const response = await fetch(url, {
//         method: "HEAD",
//         signal: controller.signal,
//         mode: "no-cors",
//       });

//       clearTimeout(timeoutId);

//       if (!response.ok && response.type !== "opaque") {
//         window.location.href = fallbackUrl;
//       } else {
//         window.open(url, "_blank"); // Открываем в новой вкладке
//       }
//     } catch (error) {
//       console.error("Ошибка загрузки:", error);
//       window.location.href = fallbackUrl;
//     }
//   });
// });





// document.querySelector('.cube11').addEventListener("click", async function () {
//     const url = "https://x.com";
//     const timeout = 5000; // 5 секунд
//     const fallbackUrl = "/404.html"; // ваша страница с ошибкой

//     try {
//         // Пытаемся загрузить страницу (HEAD-запрос для проверки доступности)
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), timeout);

//         const response = await fetch(url, {
//             method: "HEAD",
//             signal: controller.signal,
//             mode: "no-cors", // Игнорировать CORS (но не будет проверки статуса)
//         });

//         clearTimeout(timeoutId);

//         // Если статус 404/500 или другая ошибка
//         if (!response.ok && response.type !== "opaque") {
//             window.location.href = fallbackUrl;
//         } else {
//             window.location.href = url;
//         }
//     } catch (error) {
//         console.error("Ошибка загрузки:", error);
//         window.location.href = fallbackUrl;
//     }
// });