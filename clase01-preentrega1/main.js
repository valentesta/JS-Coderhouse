const nombre = prompt("Como te llamas?");
const edadInput = prompt("Cuantos años tenes?");
const edad = parseInt(edadInput);

const num1 = Number(prompt("Dame un primer numero"));
const num2 = parseInt(prompt("Dame un segundo numero"));

const suma = num1 + num2;
const promedio = suma / 2;

console.log("Nombre: " + nombre);
console.log("Edad: " + edad);
console.log("Numero 1: " + num1);
console.log("Numero 2: " + num2);
console.log("La suma da: " + suma);
console.log("El promedio es: " + promedio);

let mensaje;

if (edad >= 18) {
  mensaje = nombre + ", sos mayor de edad. La suma de tus numeros fue " + suma + " y el promedio " + promedio + ".";
} else {
  mensaje = nombre + ", sos menor de edad, pero igual te cuento: la suma dio " + suma + " y el promedio " + promedio + ".";
}

alert(mensaje);
