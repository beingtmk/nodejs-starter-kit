// import installButton from './components/InstallProcess';

/*global navigator*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('basicServiceWorker.js')
      .then(
        registration => {
          console.log('Service Worker registration successful', registration.scope);
        },
        err => {
          console.log('Service Worker registration failed', err);
        }
      )
      .catch(err => {
        console.log(`Service Worker error: ${err}`);
      });
  });

  window.addEventListener('beforeinstallprompt', event => {
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    document.getElementById('install-button').style.display = 'block';

    // document.getElementById("myBtn").addEventListener("click", function() {
    //   document.getElementById("demo").innerHTML = "Hello World";
    // });
  });

  document.getElementById('install-button').addEventListener('click', () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    promptEvent.userChoice.then(result => {
      console.log('👍', 'userChoice', result);
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
      // Hide the install button.
      document.getElementById('install-button').style.display = 'none';
    });
  });
} else {
  console.log('Service Worker is not supported by browser.');
}
