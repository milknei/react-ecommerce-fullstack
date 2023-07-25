import { getWishListLocalStorage } from '../model/local-storage';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getWishListByEmail = async (email) => {
  return fetch(`${serverUrl}/wish-lists/?filters[userEmail][$eq]=${email}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => console.log('Error getting wish list: ', error));
};

export const putWishListById = async (id, wishList) => {
  return fetch(`${serverUrl}/wish-lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ data: { items: wishList } }),
  })
    .then((response) => response.json())
    .catch((error) => console.log('Error getting wish list: ', error));
};

export const postWishList = async (email) => {
  const localStorageWishList = await getWishListLocalStorage();

  return fetch(`${serverUrl}/wish-lists`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        userEmail: email,
        items: localStorageWishList || [],
      },
    }),
  }).catch((error) => console.log(error));
};
