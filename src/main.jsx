import ReactDOM from 'react-dom/client'
import './index.css'
import router from './Router/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import store from "./store/index";
import {Provider} from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
     <RouterProvider router={router} />
  </Provider>

 
)
