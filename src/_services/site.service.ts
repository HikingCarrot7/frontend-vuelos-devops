import axios from 'axios';
import { Site } from 'types/entities/Site';

const BASE_SITE_URL = `${process.env.REACT_APP_BASE_API_URL}/sites`;

const getAllSites = (): Promise<Site[]> => {
  return axios.get<Site[]>(BASE_SITE_URL).then(({ data: sites }) => {
    return sites.map((site) => arrange(site));
  });
};

const createSite = (site: Site): Promise<Site> => {
  return axios
    .post<Site>(BASE_SITE_URL, site)
    .then(({ data: site }) => arrange(site));
};

const updateSite = (site: Site) => {
  const { id } = site;

  site.country = parseInt(`${site.country}`);

  return axios
    .put<Site>(`${BASE_SITE_URL}/${id}`, site)
    .then(({ data: site }) => arrange(site));
};

const deleteSite = (siteId) => {
  return axios
    .delete<Site>(`${BASE_SITE_URL}/${siteId}`)
    .then(({ data: site }) => arrange(site));
};

// Para que estén en orden las columnas de la tabla.
const arrange = (site: Site) => {
  return {
    id: site.id,
    country: site.country.id,
    state: site.state,
    city: site.city,
  };
};

export const useSiteService = () => {
  return { getAllSites, createSite, updateSite, deleteSite };
};
