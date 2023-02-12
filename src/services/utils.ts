export const fetchGql = ({body=''}): Promise<unknown> => {
  const headers: any = {
    'Content-Type': 'application/json',
  };
  if (getCookie('jwt')) {
    headers['Authorization'] = 'Bearer '+getCookie('jwt');
  }

  return fetch('http://localhost:3000/', <RequestInit>{
    method: 'POST',
    headers,
    body  : JSON.stringify({query: body}),
  })
    .then((res) => res.json());
};

export const getCookie = (name: string) => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(name+'='))
    ?.split('=')[1];
};

export const randInt = (min=0, max=500) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getDate = (timestamp: number) => new Date(timestamp)
  .toLocaleString('FR')
  .split(' ')[0];

export const getDatetime = (timestamp: number) => new Date(timestamp)
  .toLocaleString('FR')
  .replace(' ', ' - ');