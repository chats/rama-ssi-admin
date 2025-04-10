//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConfigProvider, theme } from 'antd'
import thTH from "antd/locale/th_TH";

{ /* 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/}

const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1DA57A',
    colorLink: '#1DA57A',
  },
}

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={thTH} theme={customTheme}>
      <App />
  </ConfigProvider>,
)