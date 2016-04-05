
//registrationModule.controller("loginController", function ($scope,  $rootScope, localStorageService, alertFactory, parametroRepository,mancomunadoRepository, filtroRepository) {
  registrationModule.controller('loginController', function($scope, $rootScope,alertFactory, loginRepository){
   
   $scope.listaLogin =null;
   
   $scope.post = {url: 'http://', title: ''};
 //$scope.init = function () {
     //alert('hola dije');
 //  };
 $scope.Entrar = function(login){  
   
   loginRepository.getLogin( login.Usuario, login.Password)
   .success(getLoginSuccessCallback)
   .error(errorCallBack);
      //alert('hola we');

      $location.path( '/AngularJS/Templates/Ordenes.html');     
   };

//Respuesta del servicio
   var getLoginSuccessCallback = function(data, status, headers, config){
    $scope.listaLogin = data;
    alertFactory.success('Datos Obtenidos.');

  };

  //Mensajes en caso de error
  var errorCallBack = function (data, status, headers, config) {
    getData();
    alertFactory.error('Ocurrio un problema: ' + data);
  };

  $scope.Registro = function(registro){
    


    loginRepository.insertRegistro( registro.txtRazon,registro.txtRfc,registro.txtCorreo,registro.txtContra,registro.txtcContra)
   .success(getRegistroSuccessCallback)
   .error(errorCallBack);
  };

  var getRegistroSuccessCallback = function(data, status, headers, config){
    $scope.listaLogin = data;
    alertFactory.success('Datos Guardados.');

  };

});

//////////////////////////////////////////////////////////7777

