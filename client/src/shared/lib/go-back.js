import React from 'react';
import { useHistory } from 'react-router-dom';

const MyComponent = () => {
  const history = useHistory();
  
  const handleNavigateBack = () => {
    const currentPath = history.location.pathname;
    const ignoredRoutes = ['/registration', '/login'];
    if (ignoredRoutes.includes(currentPath)) {
      history.push('/alternative-route');
    } else {
      history.goBack();
    }
  };

  return handleNavigateBack();
};

export default MyComponent;
