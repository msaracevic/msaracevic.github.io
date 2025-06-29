export function workDuration(d1, d2) {
  let monthsDiff;
  const open = !d2;

  if (open) d2 = new Date();

  monthsDiff = (d2.getFullYear() - d1.getFullYear()) * 12;
  monthsDiff -= d1.getMonth();
  monthsDiff += d2.getMonth();
  monthsDiff += 1;

  let response = "";
  let years = Math.floor(monthsDiff / 12);
  let months = monthsDiff - years * 12;

  if (years === 1) response += `1Y and `;
  else if (years > 1) response += `${years}Y and `;
  if (months === 1) response += `1M`;
  else if (months > 1) response += `${months}M`;

  return response;
}

export function decodeHtmlEntity(entity) {
  const txt = document.createElement("textarea");
  txt.innerHTML = entity;
  return txt.value;
}
