async function obtenerTraza() {
  let token = await getToken();
  let tracking = await trackingSifamilla(token);
  let trackingDiv = document.getElementById("divTracking");
  trackingDiv.innerHTML = "";
  document.getElementById("filaTracking").hidden = false;

  tracking.dataSingle.traza.forEach((item) => {
    trackingDiv.innerHTML += `
                <tr>
                  <td>${item.estado}</td>
                  <td>${item.descripcion}</td>
                  <td>${horarioUTC_5(item.dateDelivery)}</td>
                </tr>
        `;
  });
}

async function getToken() {
  try {
    const urlDa =
      "https://promillaapi.azurewebsites.net/api/DirectorioActivo/GenerarToken";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let response;

    let raw = JSON.stringify({
      tipoSolicitud: "client_credentials",
      clienteId: "d68fdddb-46c1-41cd-b6dc-2ed693760e96",
      secretoCliente: "Uwxsiv._1XqWj76~G-IoPX.yW-LK5z8l4f",
      alcance: "https://fivepaqcooutlook.onmicrosoft.com/Delivery.Api/.default",
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let request = await fetch(urlDa, requestOptions);
    if (request.status === 200) {
      response = await request.json();
    }
    return response;
  } catch (ex) {
    console.log(ex);
  }
}

async function trackingSifamilla(token) {
  try {
    let guia = document.getElementById("numeroGuia").value;
    let urlTracking = `https://promillaapi.azurewebsites.net/api/Detalles/ObtenerTrazaPorGuia?guia=${guia}`;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    let request = await fetch(urlTracking, requestOptions);
    if (request.status === 200) {
      let response = await request.json();
      console.log(response);
      return response;
    }
  } catch (ex) {
    console.log(ex);
  }
}

function horarioUTC_5(fecha) {
  let difHoraria_5 = 1000 * 60 * 60 * 5;
  let d = new Date(fecha);
  let hora_UTC_5 = d - difHoraria_5;
  let hUTC = new Date(hora_UTC_5);
  let day = hUTC.getDate() + "/";
  let month = hUTC.getMonth() + 1 + "/";
  let year = hUTC.getFullYear() + " ";
  let hour = hUTC.getHours() + ":";
  let minutes = hUTC.getMinutes() + "";
  minutes = minutes > 9 ? minutes : "0" + minutes;
  let fechaUTCBog = month + day + year + hour + minutes;
  return fechaUTCBog;
}
