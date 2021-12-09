// Solución cutre para que también funcione en Windows y pueda pasar a exponer @Shadic
const getBaseApiUrl = () => {
  const TEMPLATE_URL = 'http://*/api/v1';

  if (process.env.NODE_ENV !== 'production') {
    return TEMPLATE_URL.replace('*', 'b92c-189-214-1-166.ngrok.io');
  }

  if (window.navigator.userAgent.indexOf('Linux') !== -1) {
    return TEMPLATE_URL.replace(
      '*',
      process.env.REACT_APP_PRODUCTION_LINUX_HOST
    );
  }

  return TEMPLATE_URL.replace(
    '*',
    process.env.REACT_APP_PRODUCTION_WINDOWS_HOST
  );
};

export const BASE_API_URL = getBaseApiUrl();
