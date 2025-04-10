import React from 'react';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import { 
  LinkOutlined, 
  SafetyCertificateOutlined, 
  FileTextOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <p>Welcome to the RAMA SSI Admin Dashboard</p>
      
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Active Connections" 
              value={42} 
              prefix={<LinkOutlined />} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Issued Credentials" 
              value={156} 
              prefix={<SafetyCertificateOutlined />} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Verification Requests" 
              value={38} 
              prefix={<FileTextOutlined />} 
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Verified Proofs" 
              value={104} 
              prefix={<CheckCircleOutlined />} 
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Recent Activity">
            <p>No recent activities to display</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Connections">
            <p>No recent connections to display</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Credentials">
            <p>No recent credentials to display</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;