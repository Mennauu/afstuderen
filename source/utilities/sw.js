function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('/sw.js')
        .then(function(reg) {
          console.log(`Serviceworker - Registration succeeded. Scope is ${reg.scope}`)
        })
        .catch(function(err) {
          console.error(`Serviceworker - Registration failed with error ${err}`)
        })
    })
  }
}

function removeServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        registration.unregister()
      }
    })
  }
}

export { initServiceWorker, removeServiceWorker }
