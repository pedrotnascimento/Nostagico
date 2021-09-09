angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,  $cordovaSocialSharing, $cordovaNativeAudio) {

  $scope.songs = [
    {
      name:"teste",
      file:"www/sound/teste.mp3",
      image:"",
      link:"http://google.com"
    },
    {
      name:"Sabe de naaaaada",
      file:"www/sound/sabe_de_nada.mp3",// "img/ionic.png" errado
      image:"img/sabe_de_nada.jpg",//  "/img/ionic.png" errado
      link:"http://google.com"
    },{name:"óooo Gássss", file:"www/sound/gas.mp3", image:"", link:"http://google.com"},
    {name:"Mi dê PA-PAI!", file:"www/sound/me_de_papai.mp3", image:"", link:"http://google.com"},
    {name:"Se isso é tá na pior...", file:"www/sound/se_isso_eh_ta_na_pior.mp3", image:"", link:"http://google.com"},
    {name:"(Se isso é tá na pior) poooo-rra", file:"www/sound/se_isso_eh_ta_na_pior_porra.mp3", image:"", link:"http://google.com"},
    {name:"Eu sou rica", file:"www/sound/porque_eu_sou_rica.mp3", image:"", link:"http://google.com"},
    {name:"Dobramos a meta", file:"www/sound/dobramos_a_meta.mp3", image:"", link:"http://google.com"},
    {name:"Já acabou, Jéssica!?", file:"www/sound/ja_acabou_jessica.mp3", image:"", link:"http://google.com"},
    {name:"Boa noite - William Bonner", file:"www/sound/william_bonner_boa_noite.mp3", image:"", link:"http://google.com"}
  ];

$scope.sendSong = function (song){

  //alert("hey" + song.name);
  //return ;
  $cordovaSocialSharing.shareViaWhatsApp(null, song.file, null)
                .then(function(result) {
                alert("acerto" + JSON.stringify(result));
                }, function(err) {
                // An error occurred. Show a message to the user
                alert("erro"+ err + JSON.stringify(err));
                });
}

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
