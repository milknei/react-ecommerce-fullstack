const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getItemsBase = async (type = 'games', pageSize = '24', page = '1') => {
  try {
    const response = await fetch(`${apiUrl}/${type}?key=${apiKey}&page=${page}&page_size=${pageSize}`);
    const data = await response.json();
    data.results.map((item) => (item.price = (item.added % 1000) / 10));
    return data;
  } catch (error) {
    throw error;
  }
};

export const getItemsByUrl = async (url) => {
  try {
    const response = await fetch(url);
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

export const searchItem = async (searchQuery, pageSize = 24, page = 1) => {
  try {
    const response = await fetch(
      `${apiUrl}/games?key=${apiKey}&page=${page}&page_size=${pageSize}&search=${searchQuery}`
    );
    const data = await response.json();
    data.results.map((item) => (item.price = (item.added % 1000) / 10));
    return data;
  } catch (error) {
    throw error;
  }
};

export const getFilteredItems = async (filters, searchFilter, ordering, pageSize = 24, page = 1) => {
  let filtersString = '';
  console.log(ordering);

  if (searchFilter) filtersString += `&search=${searchFilter}`;

  filters.forEach((f) => {
    if (f.items.length > 0) filtersString += `&${f.name}=${f.items.join(',')}`;
  });

  if (ordering) filtersString += `&ordering=${ordering}`;

  try {
    const response = await fetch(`${apiUrl}/games?key=${apiKey}&page=${page}&page_size=${pageSize}${filtersString}`);
    const data = await response.json();
    data.results.map((item) => (item.price = (item.added % 1000) / 10));
    return data;
  } catch (error) {
    throw error;
  }
};
