window.onload = function() {
  var working = false;

  $('button').on('click', function(e) {
    e.preventDefault();
    //if (working) return;
    working = true;
    var $this = $('form'),
      $state = $this.find('button > .state');
    $this.addClass('loading');
    $state.html('Espere');


    

    var email = $('#email').val();
    var modelo = $('#modeloInput').val();
    var telefono = $('#telefono').val();

    console.log(email);
    console.log(modelo);
    console.log(telefono);

    var valido = true;

    // Validacion del email
    if (email == "") {
      $("#errorEmail").text("Debes introducir un email");
      $("#errorEmail").show();
      valido = false;
    } else if (!email.endsWith("@juntadeandalucia.es") ) {
      $("#errorEmail").text("El email no es válido");
      $("#errorEmail").show();
      valido = false;
    }

    // Validación del modelo
    if (modelo == "") {
      $("#errorModelo").text("Debes introducir un modelo");
      $("#errorModelo").show();
      valido = false;
    }

    // Validación del teléfono
    if (telefono == "") {
      $("#errorTelefono").text("Debes introducir un teléfono");
      $("#errorTelefono").show();
      valido = false;
    } else if (!(/^(\d{9})$/.test(telefono))) {
      $("#errorTelefono").text("El teléfono no es válido");
      $("#errorTelefono").show();
      valido = false;
    }

    $('input').css({ opacity: 0 });

    if (valido) {
      console.log("Valido");
      setTimeout(function() {
        $this.addClass('ok');
        $state.html('¡Bienvenido!');
        setTimeout(function() {
          //$state.html('Entrar');
          //$this.removeClass('ok loading');
          working = false;
          //$('input').css('opacity', '1');
          window.location ="sas.html";
        }, 1000);
      }, 1500);
    } else {
      console.log("No valido");
      setTimeout(function() {
        //$this.addClass('ok');
        //$state.html('Errores');
        setTimeout(function() {
          $state.html('Entrar');
          $this.removeClass('ok loading');
          working = false;
          $('input').css('opacity', '1');
        }, 800);
      }, 800);
    }

    

  });


  $("body").bind("invalid", function(event) {
    event.preventDefault();
  });

}