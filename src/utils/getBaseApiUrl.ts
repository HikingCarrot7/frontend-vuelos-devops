// Solución cutre para que también funcione en Windows y pueda pasar a exponer @Shadic
const getBaseApiUrl = () => {
  const TEMPLATE_URL = 'http://*:5000/api/v1';

  if (process.env.NODE_ENV !== 'production') {
    return TEMPLATE_URL.replace('*', '192.168.0.2');
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
