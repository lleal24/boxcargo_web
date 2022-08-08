const urlCarriers = "https://fpaq.azurewebsites.net/api/Carriers";
let dataOut = JSON.parse(sessionStorage.getItem("appData"));

function validarExtencion() {
  let fileInput = document.getElementById("ImageUrl").value;
  let fileName = document.getElementById("ImageUrl").files[0].name;
  let extPermitidas = /(.jpg|.png|.jpeg|.pdf)$/i;
  if (!extPermitidas.exec(fileInput)) {
    console.log("Extension invalida");
    Swal.fire({
      title: "Extension invalida!",
      text: "Valida que el archivo sea extension .jpg, .png, .gif, .pdf",
      icon: "error",
      confirmButtonText: "Ok",
      type: "error",
    });
  } else {
    file = document.getElementById("ImageUrl").files[0];
    getBase64(file);
  }
  //document.getElementById("fileName").setAttribute("placeholder", fileName);
}

function grabarClickEcommerce() {
  $('form[id="formAlertaEcommerce"]').validate({
    rules: {
      hubId:{
        required: true,
      },
      idCarrier: {
        required: true,
      },
      trackingNumber: {
        required: true,
        minlength: 6,
      },
      descripcion: {
        required: true,
      },
      Valor: {
        required: true,
      },
      vendor: {
        required: true,
      },
      nombreDestino: {
        required: true,
      },
      direccionDestino: {
        required: true,
      },
      valor: {
        required: true,
      },
      peso: {
        required: true,
      },
      cantidad: {
        required: true,
      },
    },
    messages: {
      trackingNumber: "Campo requerido minimo 6 caracteres",
    },
    submitHandler: function () {
      let data = getDataPrealertEcommerce();
      fivepaq.prealertaEcommerce(data);
    },
  });
  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Please check your input."
  );
}

function getDataPrealertEcommerce() {
  let array = [];
  Prealerta = new Object();
  Prealerta.Trackingnumber = $("#trackingNumber").val();
  Prealerta.PackageDescription = $("#descripcion").val();
  Prealerta.DeclaredValue = $("#valor").val();
  Prealerta.Vendor = $("#vendor").val();
  Prealerta.Weight = $("#peso").val();
  Prealerta.Quantity = $("#cantidad").val();
  Prealerta.Carrier = $("#idCarrier").val();
  Prealerta.Name = $("#nombreDestino").val();
  Prealerta.Address = $("#direccionDestino").val();
  Prealerta.Country = "Colombia";
  Prealerta.City = $("#ciudad").val();
  Prealerta.State = $("#estado").val();
  Prealerta.Zipcode = $("#zipCode").val();
  Prealerta.Phone = $("#telefonoDestino").val();
  Prealerta.Email = $("#correoDestino").val();
  Prealerta.HarmonizedCode = $("#posicionArancelaria").val();
  Prealerta.Account = dataOut.N;
  Prealerta.HubId = $("#hubId").val();
  Prealerta.DocumentoDestino = $("#documentoDestino").val();

  if (document.getElementById("ImageUrl").files.length != 0) {
    array.push($("#base64File").val());
    Prealerta.Invoice = array;
  }

  return Prealerta;
}

function validateFile() {
  let fileValue = $("#fileName").val();
  fileValue ? true : false;
}

function AlertSuccessValue(response) {
  limpiarAlerta();
  Swal.fire(
    "¡Se Alerto tu paquete! \n Con el Numero: " +
      response.PreAlertId +
      " ¡Guardalo!",
    "¡Nosotros nos encargamos!",
    "success"
  );
}

function getBase64(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log("reader:" + reader.result);
    $("#base64File").val(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

function limpiarAlerta() {
  $("#hubId").val("");
  $("#idCarrier").val("");
  $("#trackingNumber").val("");
  $("#vendor").val("");
  $("#descripcion").val("");
  $("#base64File").val("");
  $("#ImageUrl").val("");
  $("#posicionArancelaria").val("");
  $("#valor").val("");
  $("#peso").val("");
  $("#cantidad").val("");
  $("#nombreDestino").val("");
  $("#documentoDestino").val("");
  $("#telefonoDestino").val("");
  $("#correoDestino").val("");
  $("#pais").val("");
  $("#estado").val("");
  $("#ciudad").val("");
  $("#direccionDestino").val("");
  $("#fileName").attr("placeholder", "Choose a file...");
}

function validarTrack() {
  var tracking = $("#trackingNumber").val();
  if (tracking.length < 6) {
    $("#trackingNumber").focus();

    return false;
  } else if (tracking.length > 100) {
    $("#trackingNumber").focus();
    return false;
  } else {
    return true;
  }
}

function DireccionesOk(data) {
  $.each(data, function (i, item) {
    $("#direcciones").append(
      '<option value="' +
        data[i].idLocation +
        '">' +
        data[i].direccion +
        "</option>"
    );
  });
}

function validarAlerta() {
  if ($("#idCarrier").val() == "") {
    $("#idCarrier").focus();

    return false;
  } else if (!validarTrack()) {
    $("#trackingNumber").focus();
    Swal.fire("el Tracking!", "Debe estar entre 6 a 100 digitos", "error");

    return false;
  } else if ($("#direcciones").val() == "") {
    $("#direcciones").focus();

    return false;
  } else if ($("#destinatario").val() == "") {
    $("#destinatario").focus();

    return false;
  } else if ($("#posicionArancelaria").val() == "") {
    $("#posicionArancelaria").focus();

    return false;
  } else if ($("#descripcion").val() == "") {
    $("#descripcion").focus();

    return false;
  } else if ($("#Valor").val() < 0.01) {
    $("#Valor").focus();
    return false;
  }
  return true;
}

function quitarArchivo() {
  $("#ImageUrl").val("");
  document
    .getElementById("fileName")
    .setAttribute("placeholder", "Choose a file...");
}

function getFile() {
  document.getElementById("ImageUrl").click();
}

function AlertSuccessValue(response) {
  limpiarAlerta();
  Swal.fire(
    "¡Se Alerto tu paquete! \n Con el Numero: " +
      response.PreAlertId +
      " ¡Guardalo!",
    "¡Nosotros nos encargamos!",
    "success"
  );
}
