import CriarContador from "./criarContador.js";

export default function readInfo() {
  const contadoresSection = document.getElementById('contadores');

  const local = localStorage.dates.split('\\');
  local.pop();

  local.forEach((item) => {
    const itemReal = item.split('|');
    contadoresSection.appendChild(CriarContador(itemReal[0], itemReal[1], itemReal[2]));
  })
}
