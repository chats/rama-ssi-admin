import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, Breadcrumb, Button, Dropdown, Flex, Layout, Menu, theme } from "antd";
import {
    UserOutlined,
    DashboardOutlined,
    FileTextOutlined,
    LinkOutlined,
    SafetyCertificateOutlined,
    SettingOutlined,
    LogoutOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

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
            children: [
                {
                    key: 'issuer-connection',
                    label: 'Issuer Connection',
                    onClick: () => navigate('/connections/issuer'),
                },
                {
                    key: 'holder-connection',
                    label: 'Holder Connection',
                    onClick: () => navigate('/connections/holder'),
                },
                {
                    key: 'verifier-connection',
                    label: 'Verifier Connection',
                    onClick: () => navigate('/connections/verifier'),
                }
            ],
        },
        {
            key: 'credentials',
            icon: <SafetyCertificateOutlined />,
            label: 'Credentials',
            children: [
                {
                    key: 'issued-records',
                    label: 'Issued Credentials',
                    onClick: () => navigate('/credentials/issued'),
                },
                {
                    key: 'proofs-records',
                    label: 'Proof Records',
                    onClick: () => navigate('/credentials/proofs'),
                },
                {
                    key: 'holder-credentials',
                    label: 'Holder Credentials',
                    onClick: () => navigate('/credentials/holder'),
                },
                {
                    key: 'verify-test',
                    label: 'VerifyTest',
                    onClick: () => navigate('/credential/verify-test'),
                },        
            ],
        },
        {
            key: 'issue-credential',
            icon: <FileTextOutlined />,
            label: 'Issue Credential',
            children: [
                {
                    key: 'credentials-sample',
                    label: 'Medical Certificate',
                    onClick: () => navigate('/issue-credential/offer-medical-cert'),
                },
            ],
        },
        {
            key: 'present-proof',
            icon: <FileTextOutlined />,
            label: 'Present Proof',
            children: [
                {
                    key: 'proof-records',
                    label: 'Proof Records',
                    onClick: () => navigate('/present-proof/proof-medical-cert'),
                },
            ],
        },
    ];


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ 
                padding: '0 16px', 
                background: colorBgContainer,
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/RamaSri-Flat-Primary-En-C-NoBorder.png" alt="Logo" style={{ height: 40, marginRight: 16 }} />
                </div>
                <Flex align="center" style={{ marginRight: 24 }}>
                    <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                        <Button type="text" icon={<Avatar icon={<UserOutlined />} />} style={{ marginRight: 8 }}>
                            Admin User
                        </Button>
                    </Dropdown>
                </Flex>
            </Header>
            <Layout>
                <Sider width={230}
                    trigger={null} 
                    collapsible 
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
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
                            <h2 style={{ margin: 0, color: '#1890ff' }}>SSI Manager</h2>
                        ) : (
                            <h2 style={{ margin: 0, color: '#1890ff' }}>SSI</h2>
                        )}
                        </div>
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['dashboard']}
                        defaultOpenKeys={
                            [
                                'connections', 
                                'credentials', 
                                'issue-credential', 
                                'present-proofs'
                            ]
                        }
                        style={{ borderRight: 0 }}
                        items={menuItems}
                    />
                </Sider>
                <Layout>
                    <Content style={{ 
                        margin: '24px 16px', 
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        minHeight: 280,
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                SSI Manager ©2023 Created by Rama5G Project
            </Footer>
        </Layout>
    );
}
export default AuthLayout;