//Get User Data
function GetData(){

    this.getDevice = function(){
        var ua = navigator.userAgent;
        var checker = {
            iphone: ua.match(/(iPhone|iPod|iPad)/i),
            blackberry: ua.match(/BlackBerry/i),
            android: ua.match(/Android/i),
            desktop : ua.match(/Windows/i),
            webOs : ua.match(/webOS/i),
            winPhone : ua.match(/Windows Phone/i),
        };
        if(checker.iphone){
            return "Iphone";
        }
        else if(checker.blackberry){
            return "Black Berry";
        }
        else if(checker.android){
            return "Android Phone";
        }
        else if(checker.desktop){
            return "Desktop";
        }
        else if(checker.webOs){
            return "Web OS";
        }
        else if(checker.winPhone){
            return "Windows Phone";
        }
    }
    
    this.initMap = async function() {
        var _lat, _lon, data;
        if ("geolocation" in navigator) {
            let p = new Promise(function(res,rej){
                navigator.geolocation.getCurrentPosition(function(c){
                    _lat = c.coords.latitude;
                    _lon = c.coords.longitude;
        
                    var geocoder = new google.maps.Geocoder;
                    var latlng = {lat: parseFloat(_lat), lng: parseFloat(_lon)};
        
                    geocoder.geocode({'location': latlng}, function(results, status) {
                        if (status === 'OK') {
                            if (results[0]) {
                                var el = results[0].address_components;
                                document.querySelector(".user-ctry span").textContent = el[(el.length)-1].long_name;
                                document.querySelector(".user-addr span").textContent = results[0].formatted_address;
                                data = {country:el[(el.length)-1].long_name,address:results[0].formatted_address};
                                res(data);
                            } else {
                            window.alert('No results found');
                            }
                        } else {
                            window.alert('Geocoder failed due to: ' + status);
                        }
                    });
                });
            })
            return await p;
        } 
        else {
            console.log("Not Supported");
        }
    }
}






//Get Keys
// function GetKeys(){

//   this.base64UrlToUint8Array = function(base64UrlData) {
//     const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
//     const base64 = (base64UrlData + padding).replace(/\-/g, '+').replace(/_/g, '/');
//     const rawData = window.atob(base64);
//     const buffer = new Uint8Array(rawData.length);
  
//     for (let i = 0; i < rawData.length; ++i) {
//       buffer[i] = rawData.charCodeAt(i);
//     }

//     return buffer;
//   }
  
//   this.uint8ArrayToBase64Url = function(uint8Array, start, end) {
//     start = start || 0;
//     end = end || uint8Array.byteLength;
//     const base64 = window.btoa(String.fromCharCode.apply(null, uint8Array.subarray(start, end)));

//     return base64.replace(/\=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
//   }
  
//   this.cryptoKeyToUrlBase64 = function(publicKey, privateKey) {
//     const promises = [];

//     promises.push(

//       crypto.subtle.exportKey('jwk', publicKey).then((jwk) => {

//         const x = base64UrlToUint8Array(jwk.x);
//         const y = base64UrlToUint8Array(jwk.y);
//         const publicKey = new Uint8Array(65);

//         publicKey.set([0x04], 0);
//         publicKey.set(x, 1);
//         publicKey.set(y, 33);

//         return publicKey;
//       })
//     );
  
//     promises.push(
//       crypto.subtle.exportKey('jwk', privateKey).then((jwk) => {
//         return this.base64UrlToUint8Array(jwk.d);
//       })
//     );
  
//     return Promise.all(promises).then((exportedKeys) => {
//       return {
//         public: this.uint8ArrayToBase64Url(exportedKeys[0]),
//         private: this.uint8ArrayToBase64Url(exportedKeys[1]),
//       };
//     });

//   }
  
//   this.generateNewKeys = function() {
//     return crypto.subtle.generateKey({name: 'ECDH', namedCurve: 'P-256'},true, ['deriveBits']).then((keys) => {
//       return this.cryptoKeyToUrlBase64(keys.publicKey, keys.privateKey);
//     });
//   }
  
//   this.clearKeys = function() {
//     window.localStorage.removeItem('server-keys');
//   }
  
//   this.storeKeys = function(keys) {
//     window.localStorage.setItem('server-keys', JSON.stringify(keys));
//   }
  
//   this.getStoredKeys = function() {
//     const storage = window.localStorage.getItem('server-keys');
//     if (storage) {
//       return JSON.parse(storage);
//     }
//     return null;
//   }
  
//   this.displayKeys = function(keys) {
//     const publicElement = document.querySelector('.js-public-key');
//     const privateElement = document.querySelector('.js-private-key');
//     const refreshBtn = document.querySelector('.js-refresh-keys');
  
//     publicElement.textContent = keys.public;
//     privateElement.textContent = keys.private;

//     refreshBtn.disabled = false;
//   }
  
//   this.updateKeys = function() {
//     let storedKeys = this.getStoredKeys();
//     let promiseChain = Promise.resolve(storedKeys);
//     if (!storedKeys) {
//       promiseChain = this.generateNewKeys().then((newKeys) => {
//         this.storeKeys(newKeys);
//         return newKeys;
//       });
//     }
//     return promiseChain.then((keys) => {
//       this.displayKeys(keys);
//     });
//   }
  
//   this.initialiseKeys = function() {
//     const refreshBtn = document.querySelector('.js-refresh-keys');
//     refreshBtn.addEventListener('click', function() {
//       refreshBtn.disabled = true;
//       this.clearKeys();
//       this.updateKeys();
//     });
//     this.updateKeys();
//   }
  
// }







//Subscribe the USERS
function SubscribeUser(){

    const applicationServerPublicKey = 'BMVoRmGYOTtbhSoMXpaEstem7UIj5zANRWNhB--Z5J0FOyynUkPNJHT8-kUQxJJvX5_TxCbtfEOaA_9t1qB9pd8';
    const pushButton = document.querySelector('.js-push-btn');
    const pushButtonText = document.querySelector('.js-push-btn span');
    var isSubscribed = false;
    var swRegistration = null;
    const _this = this;


    this.urlB64ToUint8Array = function(base64String) {
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


    //Check for push notifications
    this.pushCheck = async function(){
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            return 'success';
        } else {
            pushButtonText.textContent = 'Push Not Supported';
        }
    }

    //Register the Service WOrker
    this.regSW = async function(){
        navigator.serviceWorker.register('../sw.js').then(function(swReg) {
            swRegistration = swReg;
            _this.initializeUI();
        }).catch(function(error) {
            console.error('Service Worker Error', error);
        });
    }

    //Initialize the User Interface - Button
    this.initializeUI = function() {

        try {
            pushButton.addEventListener('click', function() {
                pushButton.disabled = true;
                if (isSubscribed) {
                  // TODO: Unsubscribe user
                } else {
                  _this.subscribeUser();
                }
            });
        } catch (error) {
            
        }

        // Set the initial subscription value
        swRegistration.pushManager.getSubscription().then(function(subscription) {
          isSubscribed = !(subscription === null);
            try {
                if (isSubscribed) {
                    document.querySelector(".user-not-status span").textContent = "Subscribed";
                  } else {
                    document.querySelector(".user-not-status span").textContent = "Not Subscribed";
                  }
            } catch (error) {
                
            }
          _this.updateBtn();
        });
    }
    
    //Update the button UI
    this.updateBtn = function(){

       var pushButtonIcon = document.querySelector('.js-push-btn i');

        if (Notification.permission === 'denied') {
            pushButtonText.textContent = 'Push Messaging Blocked by You';
            pushButton.disabled = true;
            updateSubscriptionOnServer(null);
            return;
        }

        try {
            if (isSubscribed) {
                pushButtonText.textContent = 'Disable Notifications about all our products';
                pushButtonIcon.classList.value = 'far fa-bell-slash';
            } else {
                pushButtonText.textContent = 'Get Notifications about all our products';
                pushButtonIcon.classList.value = 'far fa-bell';
            }
        } catch (error) {
            
        }
        
        try {
            pushButton.disabled = false;
        } catch (error) {
            
        }
    }
     
    //Subscribe the USER for Push Services
    this.subscribeUser = function() {
        const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);
        swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        }).then(function(subscription) {

          document.querySelector(".user-not-status span").textContent = "Subscribed";
      
          _this.updateSubscriptionOnServer(subscription);
          
          try{
            _this.displaySubscription(subscription);
          } catch(e){}
      
          isSubscribed = true;
      
          _this.updateBtn();
        })
        .catch(function(err) {
          console.log('Failed to subscribe the user: ', err);
          _this.updateBtn();
        });
    }
    
    //Sends the end point to the server
    this.updateSubscriptionOnServer = function(subscription){

        if (subscription) {
            
            new GetData().initMap().then(function(r){
                document.querySelector('.user-loc span').textContent = new GetData().getDevice()

                const endpoint =  JSON.stringify(subscription);
                const device   =  document.querySelector('.user-loc span').textContent;
                const country  =  r.country;
                const address  =  r.address;
                const status   =  document.querySelector('.user-not-status span').textContent;

                fetch("/api/save-end-point",{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        ep : endpoint,
                        dc : device,
                        cy : country,
                        ad : address,
                        st : status,
                        tm : _this.getTime(),
                        dt : _this.getDate().date,
                        dtt : _this.getDate().dateText  
                    })
                }).then(function(res){
    
                })
            })

        } else {
            console.log("Some Error ");
        }

    }


    this.getTime = function(){
        var d   =  new Date(),
            h   =  d.getHours(),
            m   =  d.getMinutes(),
            s   =  d.getSeconds(),
            hh   =  ( h < 10   )  ?  "0"+h   :  h,
            hh   =  ( h == 0   )  ?  h = 12  :  h,
            hh   =  ( h > 12   )  ?  h-12    :  h,
            mm   =  ( m < 10   )  ?  "0"+m   :  m,
            ss   =  ( s < 10   )  ?  "0"+s   :  s,
            t    =  ( h  >= 12  )  ?  "PM"    :  "AM";
        return hh+":"+mm+":"+ss+" "+t;
    }

    this.getDate = function(){
        
        var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return {
            date :  new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear(),
            dateText : (months[new Date().getMonth()])+" "+new Date().getDate()+", "+new Date().getFullYear()
        }
    }


}


window.addEventListener('load', () => {

    var dt = new GetData();
    var su = new SubscribeUser();

    su.pushCheck().then(function(res){
        su.regSW();
    })

});


/*
==========================================================================================================================================
==========================================================================================================================================
==========================================================================================================================================
*/



function NotifySubscribers(){

    this.validateData = async function(){

        const c = document.querySelector("#country_select .csh-text").textContent;
        const d = document.querySelector("#device_select .csh-text").textContent;

        if(c.toLowerCase() !== 'country' && d.toLowerCase() !== 'device'){
            return {country : c, device : d};
        }
        else if(c.toLowerCase() === 'country' && d.toLowerCase() !== 'device'){
            return {country : null, device : d};
        }
        else if(c.toLowerCase() !== 'country' && d.toLowerCase() === 'device'){
            return {country : c, device : null};
        }
        else{
            return 'Nothing Selected';
        }
    }

    this.getEndPoints = async function(data){

        var c = null, d = null;

        if(typeof data === 'object'){
            c = data.country
            d = data.device;
        } 

        fetch('/api/get-endpoints',{
            method :"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                ctry : c,
                dev  : d 
            })
        }).then(function(res){
            res.text().then(function(r){
                var ep = JSON.parse(r);
                console.log(ep);
                 let el = document.querySelector(".selection-text");
                 el.innerHTML = "You have selected country <b>"+c+"</b> and device <b>"+d+"</b>. The total end points are : <b>"+ ep.length +"</b>";
                 
                 fetch('/api/notify-endpoints',{
                    method :"POST",
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({
                        data : ep
                    })
                 }).then(function(res){
                     res.text().then(function(r){
                         alert(ep);
                     })
                 })

            });

        }).catch(function(err){
            console.log(err);
        })

    }
    
}


$("#notify_users").on("submit",function(e){
    e.preventDefault();

    var nu = new NotifySubscribers();

    nu.validateData().then(function(vdr){
        nu.getEndPoints(vdr);
    })

})





/*
==========================================================================================================================================
==========================================================================================================================================
==========================================================================================================================================
*/



function UpdatePush(){

    this.sendData = async function(data){
        fetch("/api/update-push",{
            method:"POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                d : data,
                time : new SubscribeUser().getTime(),
                date : new SubscribeUser().getDate().date,
                dateTxt : new SubscribeUser().getDate().dateText
            })
        }).then(function(res){
            res.text().then(function(r){
                console.log(r);
                switch(r){
                    case 'success':{
                        $(".up-mess")
                        .empty()
                        .append( ' <div class="btn btn-default-light"> <i class="far fa-check-circle"></i> Push Notification data Successfully Updated ! </div> ' );
                        $("#update_push").trigger("reset");
                        break;
                    }
                    case 'required':{
                        $(".up-mess")
                        .empty()
                        .append( ' <div class="btn btn-error-light"> <i class="fas fa-exclamation-circle"></i>  Fields can not be empty ! </div> ' );
                    }
                }
            })
        })
    }


}

$("#update_push").on("submit",function(e){
    e.preventDefault();
    var ev = e.target, up = new UpdatePush();

    up.sendData($(ev).serializeArray()).then(function(){
          
    })

})

$("#pin-inp1").on("input",function(){  $(".cnt-title").text($(this).val());  });
$("#pin-inp3").on("input",function(){  $(".cnt-desc").text($(this).val());  });
























