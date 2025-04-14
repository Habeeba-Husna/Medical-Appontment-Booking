import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorBoundary from './utils/ErrorBoundary';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
    </Provider>
  </StrictMode>
)
