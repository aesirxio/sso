/* SERVICES */
let cache;
const assign = (a, b) => {
  Object.keys(b).forEach((key) => {
    if (b[key] !== undefined) a[key] = b[key];
  });
  return a;
};

const trackerService = async (endpoint, payload) => {
  const fetchData = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: assign({ 'Content-Type': 'application/json' }, { ['x-tracker-cache']: cache }),
  });
  const response = await fetchData.json();
  return response;
};

export { trackerService };
