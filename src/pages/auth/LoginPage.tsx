import React from 'react';
import { Button, Form, Input, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: LoginFormValues) => {
    // This is a placeholder for the actual login logic
    console.log('Login form values:', values);
    
    // Simulate login success (replace with actual authentication)
    setTimeout(() => {
      // Store authentication token
      localStorage.setItem('token', 'sample-auth-token');
      message.success('Login successful');
      // Redirect to dashboard
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <Card bordered={false} style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={2}>Login</Title>
        <Typography.Paragraph type="secondary">
          Sign in to access the RAMA SSI admin panel
        </Typography.Paragraph>
      </div>
      
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Username" 
            size="large" 
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Password" 
            size="large" 
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            block
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;