import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>    {/* ✅ Correct: store passed to Provider */}
      <App />                   {/* ✅ Don't pass store to App */}
    </Provider>
    
  </StrictMode>,
)
