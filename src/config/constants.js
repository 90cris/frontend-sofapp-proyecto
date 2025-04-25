// const dotenv = require('dotenv').config();

export const URLBASE = import.meta.env.VITE_URL_BACKEND;
console.log(URLBASE);

export const ENDPOINT = {
  products: `${URLBASE}/producto`,
  users: `${URLBASE}/usuario`
}
