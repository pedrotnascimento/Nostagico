/* ####
    Adicione o m�dulo (que nessa fase deve estar vazio) na lista de depend�ncias abaixo.
   #### */
(function () {
    angular.module('convem', [
                                'ionic',
                                'jett.ionic.filter.bar',
                                'ionic-ratings',
                                'convem.route',
                                'convem.oferta',
                                'convem.login',
                                'convem.avaliacao',
                                'convem.cartao',
                                'convem.confirmaLocal',
                                'convem.cadastro',
                                'convem.pedidos',
                                'convem.entrega',
                                'convem.sugestao',
                                'convem.contato',
                                'convem.session',
                                'convem.condicoes'
    ])
    .config(function($httpProvider){
        $httpProvider.interceptors.push('APIInterceptor'); // Defines http interceptor
    })
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (ionic.Platform.isAndroid()){
              var push = PushNotification.init({
                  android: {
                      senderID: "458423735865"
                  },
                  ios: {
                      alert: "true",
                      badge: "true",
                      sound: "true"
                  },
                  windows: {}
              });

              push.on('registration', function(data) {
                  console.log("PUSH - RegistrationID: [" + data.registrationId +"]");
                  localStorage.setItem('deviceToken', data.registrationId);
                  
              });
              
              push.on('notification', function(data) {
                  console.log("PUSH - Notification: " + JSON.stringify(data));
                  //TRATAMENTO DOS DIVERSOS TIPOS DE NOTIFICACAO
                  if (!data.additionalData.convemNotification) return; // NOTIFICATION QUE NAO VAMOS TRATAR
                  switch (data.additionalData.convemNotification.notificationtype){
                      //OUTROS
                      case 'CREDIT_CARD_EXPIRED':
                        //data.additionalData.convemNotification.object_id irá trazer o ID do cartão que expirou
                        break;

                      //ORDER
                      case 'PAYMENT_ISSUES':
                        //data.additionalData.convemNotification.object_id irá trazer o ID da order que apresentou problemas
                        break;

                      case 'ORDER_PROCESSED':
                        //data.additionalData.convemNotification.object_id irá trazer o ID da order processada
                        break;

                      case 'ORDER_ISSUES':
                        //data.additionalData.convemNotification.object_id irá trazer o ID da order está com problemas
                        break;

                      //DELIVERIES
                      case 'DELIVERY_DONE':
                        //data.additionalData.convemNotification.object_id irá trazer o ID da entrega que precisa ser finalizada
                        break;
                      case 'DELIVERY_ISSUES':
                        //data.additionalData.convemNotification.object_id irá trazer o ID da entrega está com problemas
                        break;
                      case 'DELIVERY_DELAYED':
                        //data.additionalData.convemNotification.object_id irá trazer o ID da entrega que está com atrasada
                        break;

                      //MARKETING
                      case 'NEWS':
                        //Nada especial por hora... apenas apresenta um alerta...
                        alert(data.message);
                        break;
                  }

              });

              push.on('error', function(e) {
                  console.error("PUSH - ERROR:", e.message);
              });
            }
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    ;
})();
