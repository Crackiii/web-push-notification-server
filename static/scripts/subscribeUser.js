'use strict';
const storage = window.localStorage.getItem('server-keys');

const applicationServerPublicKey = JSON.parse(storage).public;

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


if ('serviceWorker' in navigator && 'PushManager' in window) {
  // console.log('Service Worker and Push is supported');
  
  navigator.serviceWorker.register('../sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initializeUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  // console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

function initializeUI() {

  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      document.querySelector(".user-not-status span").textContent = "Subscribed";

    } else {
      document.querySelector(".user-not-status span").textContent = "Not Subscribed";
    }

    updateBtn();
  });
}

function updateBtn() {

  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }
  
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}


function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    document.querySelector(".user-not-status span").textContent = "Subscribed";

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}


function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  var subscriptionJson;
  try{
    subscriptionJson = document.querySelector('.js-subscription-json');
  } catch(e){

  }
  var subscriptionDetails;
  try{
    subscriptionDetails = document.querySelector('.js-subscription-details');
  } catch(e){

  }

  if (subscription) {
    try{
      subscriptionJson.textContent = JSON.stringify(subscription); //The End Point
      subscriptionDetails.classList.remove('is-invisible');
    } catch(e){}
  } else {
    try{
      subscriptionDetails.classList.add('is-invisible');
    } catch(e){

    }
  }
}