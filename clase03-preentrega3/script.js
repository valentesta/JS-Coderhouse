function pedirEdad() {
  let edad = Number(prompt("Ingrese su edad:"));
  while (isNaN(edad) || edad <= 0) {
    edad = Number(prompt("Edad inválida. Ingrese su edad:"));
  }
  return edad;
}

function tieneInvitacion() {
  let respuesta = prompt("¿Tiene invitación? (si/no):");
  if (respuesta !== null) {
    respuesta = respuesta.toLowerCase();
  }
  return respuesta === "si";
}

const verificarAcceso = (edad, invitacion) => {
  if (edad >= 18 && invitacion) {
    return "Acceso permitido";
  } else if (edad >= 18 && !invitacion) {
    return "Acceso denegado: falta invitación";
  } else {
    return "Acceso denegado: menor de edad";
  }
};

function mostrarResultado(mensaje) {
  console.log(mensaje);
  alert(mensaje);
}

while (true) {
  const edad = pedirEdad();
  const invitacion = tieneInvitacion();
  const resultado = verificarAcceso(edad, invitacion);
  mostrarResultado(resultado);

  let seguir = prompt("¿Desea verificar otro ingreso? (si/no):");
  if (seguir !== null) {
    seguir = seguir.toLowerCase();
  }
  if (seguir !== "si") {
    alert("Simulador finalizado");
    break;
  }
}
