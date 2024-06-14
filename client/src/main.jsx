import App from './App.jsx'
import store from './Redux/store.js'

import './index.css'  

import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client' 
import { BrowserRouter } from 'react-router-dom' 
import { Toaster } from 'react-hot-toast'



const toastOptions ={
  // duration: 2000,
  style: {
    width: '300px',
    fontSize: '16px',
    padding: '12px',
    background: '#333',
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  // Specific styles 
  success: {
    style: {
      background: 'green',
      color: 'white',
    },
  },
  error: {
    style: {
      background: 'red',
      color: 'white',
      fontWeight: 'bold',
    },
  },
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8} 
        containerStyle={{
          top: 50,
        }}
        toastOptions={toastOptions}
      />
    </BrowserRouter>
  </Provider>
)
