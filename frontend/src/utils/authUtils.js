export const setAuthTokens = (tokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  };
  
  export const clearAuthTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  
  export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };
  
  export const isAuthenticated = () => {
    return !!getAccessToken();
  };

