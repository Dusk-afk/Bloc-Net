import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';
import { DAppProvider } from '@usedapp/core'
import { CHAIN_ID } from './data/index.js';

const config = {
  readOnlyChainId: CHAIN_ID,
  readOnlyUrls: {
    1337: 'http://0.0.0.0:7545',
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DAppProvider config={config}>
    <App />
    </DAppProvider>
  </React.StrictMode>,
)
