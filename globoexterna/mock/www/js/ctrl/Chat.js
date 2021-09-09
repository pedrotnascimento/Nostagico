angular.module('starter').
controller('Chat', function($scope){
    var placeholder = 'img/placeholder.png';
    
    $scope.pessoas = [{
        'nome'	:	 'Antonio Mauricio',
        'cargo'	:	 'Segurança',
        'area'	:	 'Area de atuação1',
        'img'	:	 placeholder
    },  
    {   
        'nome'	:	 'Daniel Moreira',
        'cargo'	:	 'Brigadista',
        'area'	:	 'Area de atuação2',
        'img'	:	 placeholder
    },  
    {   
        'nome'	:	 'Katia Neyla',
        'cargo'	:	 'Segurança',
        'area'	:	 'Area de atuação1',
        'img'	:	 placeholder
    },  
    {   
        'nome'	:	 'Sheila Tompson',
        'cargo'	:	 'Segurança',
        'area'	:	 'Area de atuação1',
        'img'	:	 placeholder
    }
    ];
});