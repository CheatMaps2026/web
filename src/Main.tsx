import ReactDOM from 'react-dom/client'
import {StrictMode} from "react"
import {App} from './App'
import './index.css'     
import { BrowserRouter } from 'react-router-dom';
import { configureAmplify } from './utils/amplifyConfig';

configureAmplify();


const rootElement = document.getElementById('root')

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <StrictMode>
                <App/>
        </StrictMode>,
    )
} else {
    console.error("Root element not found.")
}
