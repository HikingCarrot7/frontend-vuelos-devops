import { useLocation } from 'react-router-dom';

export const usePrevLocation = () => {
  const location = useLocation();

  const { from } = location.state || { from: '/' };

  return { from };
};
