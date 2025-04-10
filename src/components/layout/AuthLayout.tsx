import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Avatar, Dropdown, Flex } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  FileTextOutlined,
  LinkOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AuthLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    // Remove authentication token
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  // User menu items for dropdown
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  // Main navigation menu items
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: 'connections',
      icon: <LinkOutlined />,
      label: 'Connections',
      onClick: () => navigate('/connections'),
    },
    {
      key: 'credentials',
      icon: <SafetyCertificateOutlined />,
      label: 'Credentials',
      onClick: () => navigate('/credentials'),
    },
    {
      key: 'proofs',
      icon: <FileTextOutlined />,
      label: 'Verifications',
      onClick: () => navigate('/verifications'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        style={{ 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
          zIndex: 100,
        }}
      >
        <div style={{ 
          height: 64, 
          padding: 16, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}>
          {!collapsed ? (
            <h2 style={{ margin: 0, color: '#1890ff' }}>RAMA SSI</h2>
          ) : (
            <h2 style={{ margin: 0, color: '#1890ff' }}>R</h2>
          )}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{ borderRight: 0 }}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Flex align="center" style={{ marginRight: 24 }}>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text" icon={<Avatar icon={<UserOutlined />} />} style={{ marginRight: 8 }}>
                Admin User
              </Button>
            </Dropdown>
          </Flex>
        </Header>
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: 280,
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;