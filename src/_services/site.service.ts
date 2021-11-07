import axios from 'axios';

const BASE_SITE_URL = `${process.env.REACT_APP_BASE_API_URL}/sites`;

const getAllSites = () => {
  return axios.get(BASE_SITE_URL);
};

const updateSite = () => {};

const deleteSite = () => {};

export const useSiteService = () => {
  return { getAllSites, updateSite, deleteSite };
};
