import React from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const PublicLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center',
        background: colorBgContainer,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, color: '#1890ff' }}>RAMA SSI Admin</h1>
        </div>
      </Header>
      <Content style={{ 
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ 
          background: colorBgContainer, 
          borderRadius: borderRadiusLG, 
          padding: 24,
          minWidth: 400,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: 'transparent' }}>
        RAMA SSI Admin ©{new Date().getFullYear()} Created by RAMA 5G Team
      </Footer>
    </Layout>
  );
};

export default PublicLayout;