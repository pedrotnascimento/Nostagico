// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var app = angular.module('starter', ['ionic', 'ionic-timepicker'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
  });
});
 
app.config(function($stateProvider,
                     $urlRouterProvider) {
  $stateProvider
  .state('index', {
    templateUrl: 'index.html',
    controller: 'Index'
  })
  .state('tabs', {
    url: '/tabs',    
    templateUrl: 'views/tabs.html',
    controller: 'Tabs'
  })
  .state('tabs.externaTab',{
      url:'/externaTab',
      //views:{
        //  'externa':{
                    templateUrl: 'views/externaTab.html',
          //}
        //},
      controller: 'Externa'
  })
  .state('tabs.muralTab',{
      url:'/muralTab',
      templateUrl: 'views/muralTab.html',
      controller: 'Mural'
  })
  .state('tabs.chatTab',{
      url:'/chatTab',
      templateUrl: 'views/chatTab.html',
      controller: 'Chat'
  })
  .state('horarios',{
      url:'/horarios',
            templateUrl: 'views/horarios.html',
            controller: 'Horario'   
  })
  .state('incidente',{
      url:'/incidente',
            templateUrl: 'views/incidente.html'
  })
   .state('mapa',{
      url:'/mapa',
            templateUrl: 'views/mapa.html'
  });
  
  //$urlRouterProvider.when('tabs', '/tabs/externaTab');
  //$urlRouterProvider.otherwise("/tabs/externaTab");
  
  
});