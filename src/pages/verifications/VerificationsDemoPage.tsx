import React, { useState } from 'react';
import { Typography, Table, Button, Tag, Input, Space, Card, Tabs } from 'antd';
import { FileSearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Title } = Typography;
const { TabPane } = Tabs;

interface Verification {
  id: string;
  name: string;
  type: string;
  requestedFrom: string;
  requestedAt: string;
  status: 'pending' | 'verified' | 'rejected' | 'expired';
}

const VerificationsDemoPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  
  // Mock data for sent verification requests
  const sentRequests: Verification[] = [
    {
      id: '1',
      name: 'Medical License Verification',
      type: 'Professional License',
      requestedFrom: 'City Hospital',
      requestedAt: '2023-08-15T14:30:00Z',
      status: 'verified',
    },
    {
      id: '2',
      name: 'Doctor Certificate Verification',
      type: 'Certification',
      requestedFrom: 'Medical Board',
      requestedAt: '2023-07-22T11:45:00Z',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Hospital Employee ID Verification',
      type: 'Identification',
      requestedFrom: 'Regional Hospital',
      requestedAt: '2023-09-05T09:15:00Z',
      status: 'rejected',
    },
  ];

  // Mock data for received verification requests
  const receivedRequests: Verification[] = [
    {
      id: '4',
      name: 'Staff Credential Verification',
      type: 'Employment',
      requestedFrom: 'Health Department',
      requestedAt: '2023-08-10T10:20:00Z',
      status: 'pending',
    },
    {
      id: '5',
      name: 'Professional Registration Verification',
      type: 'Registration',
      requestedFrom: 'External Clinic',
      requestedAt: '2023-07-18T13:40:00Z',
      status: 'expired',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'green';
      case 'pending':
        return 'blue';
      case 'rejected':
        return 'red';
      case 'expired':
        return 'orange';
      default:
        return 'default';
    }
  };

  const columns: TableProps<Verification>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => 
        record.name.toLowerCase().includes((value as string).toLowerCase()) || 
        record.type.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Requested From/By',
      dataIndex: 'requestedFrom',
      key: 'requestedFrom',
    },
    {
      title: 'Requested Date',
      dataIndex: 'requestedAt',
      key: 'requestedAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text, record) => (
        <Space size="small">
          <Button type="link" size="small">View</Button>
          {record.status === 'pending' && (
            <Button type="link" size="small">
              {record.id.startsWith('4') || record.id.startsWith('5') ? 'Verify' : 'Remind'}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Verifications</Title>
      <p>Manage proof requests and verification processes</p>

      <Card style={{ marginTop: 16 }}>
        <Tabs defaultActiveKey="sent">
          <TabPane tab="Sent Verification Requests" key="sent">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Input.Search
                placeholder="Search sent verification requests..."
                onSearch={(value) => setSearchText(value)}
                style={{ width: 300 }}
              />
              <Button type="primary" icon={<FileSearchOutlined />}>
                New Verification Request
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={sentRequests}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Received Verification Requests" key="received">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Input.Search
                placeholder="Search received verification requests..."
                onSearch={(value) => setSearchText(value)}
                style={{ width: 300 }}
              />
              <Button type="primary" icon={<CheckCircleOutlined />}>
                Bulk Verify
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={receivedRequests}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default VerificationsDemoPage;