import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../hooks/auth.jsx'
import { Provider } from '@/components/ui/provider'
import { BrowserRouter } from "react-router-dom"
createRoot(document.getElementById('root')).render(
        <Provider>
                <BrowserRouter>
                        <AuthProvider>
                                <App/>
                        </AuthProvider> 
                </BrowserRouter>
        </Provider>
)
