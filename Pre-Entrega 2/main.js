const EDAD_MINIMA = 18;

let ingresaron = 0;
let rechazados = 0;

while (true) {
  const entrada = prompt(
    'Ingresá la edad de la persona (o escribí "salir" para cerrar la puerta):'
  );

  if (entrada === null || entrada.toLowerCase() === "salir") {
    break;
  }

  const edad = Number(entrada);

  if (isNaN(edad)) {
    console.log("⚠️ Eso no es una edad válida");
  } else if (edad >= EDAD_MINIMA) {
    ingresaron++;
    console.log(`✅ Acceso permitido (${edad} años)`);
  } else {
    rechazados++;
    console.log(`🚫 Acceso denegado, es menor de edad (${edad} años)`);
  }
}

alert(`Evento cerrado. Ingresaron: ${ingresaron} | Rechazados: ${rechazados}`);