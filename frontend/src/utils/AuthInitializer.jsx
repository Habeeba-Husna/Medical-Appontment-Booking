
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchCurrentUser } from '../store/slices/authSlice';
import { useAppDispatch } from '../hooks';


export const AuthInitializer = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          await dispatch(fetchCurrentUser()).unwrap();
        } catch (error) {
          Cookies.remove('token');
          Cookies.remove('refreshToken');
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return children;
};