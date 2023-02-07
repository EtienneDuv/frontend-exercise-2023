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