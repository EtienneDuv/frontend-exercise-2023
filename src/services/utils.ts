export const fetchGql = ({body='', headers={}}): Promise<unknown> => {
  return fetch('http://localhost:3000/', <RequestInit>{
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({query: body}),
  })
    .then((res) => res.json());
};

export const getJwt = () => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('jwt='))
    ?.split('=')[1];
};

export const randInt = (min=0, max=500) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getDate = (timestamp: number) => new Date(timestamp)
  .toISOString()
  .split('T')[0];

export const getDatetime = (timestamp: number) => new Date(timestamp)
  .toISOString()
  .replace('T', ' - ')
  .slice(0, 21);