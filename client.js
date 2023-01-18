const publicVapidKey = 'BE6LT56P_Ql6PPLKYP6iyKKcD50PYxSePBPfevPdXQlGPXjCg9WdjdQFWHwQs5b2ST_cx0gqGwFjAk0icUSTNZM';

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

//register the service worker, register our push api, send the notification
async function send() {
  //register service worker
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });

  //register push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,

    //public vapid key
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  //Send push notification
  await fetch("http://localhost:8080/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}

if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err))
  // setInterval(() => {
  //   send().catch(err => console.error(err))
  // }, 15000)
}