import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConfigProvider, theme } from 'antd'
import thTH from "antd/locale/th_TH";

const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#6BBBA4',
    colorLink: '#6BBBA4',
    colorSecondary: '#0078F4',
  },
};

createRoot(document.getElementById('root')!).render(
  <>
    <ConfigProvider locale={thTH} theme={customTheme}>
        <App />
    </ConfigProvider>
  </>,
)