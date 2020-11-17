const images = ['fox1', 'fox2', 'fox3', 'fox4'];
const imgElem = document.querySelector('img');

function randomValueFromArray(array) {
  let randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}

// setInterval(function () {
//   let randomChoice = randomValueFromArray(images);
//   imgElem.src = 'images/' + randomChoice + '.jpg';
// }, 2000)

// Register service worker to control making site work offline
console.log('test', navigator)
if ('serviceWorker' in navigator) {
  console.log('準備建立server work')
  navigator.serviceWorker
    .register('/pwa-examples/a2hs/sw.js')
    .then(function () { console.log('Service Worker Registered'); })
    .catch(function (err) { console.log('server建立失敗', err) })
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt', e)
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // 顯示提示
    deferredPrompt.prompt();
    // 等待用戶響應提示
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log('用戶接受', choiceResult)
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
