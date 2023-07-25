const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getItemsBase = async () => {
  try {
    const response = await fetch(`${apiUrl}/games?key=${apiKey}&page=1&page_size=24`);
    const data = await response.json();
    data.results.map((item) => (item.price = (item.added % 1000) / 10));
    return data;
  } catch (error) {
    throw error;
  }
};

export const getItem = async (game) => {
  try {
    const response = await fetch(`${apiUrl}/games/${game}?key=${apiKey}`);
    const data = await response.json();

    const date = new Date(data.released);
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();

    data.price = (data.added % 1000) / 10;
    data.released = formattedDate;

    return data;
  } catch (error) {
    throw error;
  }
};

export const getItemDetail = async (game, req) => {
  try {
    const response = await fetch(`${apiUrl}/games/${game}/${req}?key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const searchItem = async (searchQuery, pageSize, page) => {
  try {
    const response = await fetch(`${apiUrl}/games?key=${apiKey}&page=${page}&page_size=${pageSize}&search=${searchQuery}`);
    const data = await response.json();
    data.results.map((item) => (item.price = (item.added % 1000) / 10));
    return data;
  } catch (error) {
    throw error;
  }
};
