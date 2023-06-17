/* eslint-disable nonblock-statement-body-position */
// Calcular diferença entre duas datas
export default function calcTime(e) {
  const atual = new Date();

  let futureDate = e.replace('-', '/');
  futureDate = new Date(futureDate);
  let difference = futureDate.getTime() - atual.getTime();
  difference = Math.floor(difference / (1000 * 60 * 60 * 24));

  const futureDateBase = `${futureDate.getDate()}/${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getFullYear()}`;

  if (difference + 1 === 0)
    return `Hoje é ${futureDateBase}`;
  else if (difference + 1 === 1)
    return `Falta 1 dia para ${futureDateBase}`;
  else if (difference + 1 === -1)
    return `${futureDateBase} foi há 1 dia`;
  else if (futureDate.getTime() - atual.getTime() > 0)
    return `Faltam ${difference + 1} dias para ${futureDateBase}`;

  return `${futureDateBase} foi há ${String(difference + 1).replace('-', '')} dias`;
}
