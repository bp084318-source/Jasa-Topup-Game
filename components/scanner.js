export function calculateRisk(data) {
  let risk = 0;

  if (data.location) risk += 30;
  if (data.phone) risk += 40;
  if (data.sameuser) risk += 20;

  return risk;
}
