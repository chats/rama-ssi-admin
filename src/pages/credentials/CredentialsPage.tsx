import React, { useState } from 'react';
import { Typography, Table, Button, Tag, Input, Space, Card, Tabs } from 'antd';
import { PlusOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Title } = Typography;
const { TabPane } = Tabs;

interface Credential {
  id: string;
  name: string;
  type: string;
  issuer: string;
  issuedDate: string;
  status: 'active' | 'revoked' | 'expired';
}

const CredentialsPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  
  // Mock data for issued credentials
  const issuedCredentials: Credential[] = [
    {
      id: '1',
      name: 'Medical License',
      type: 'Professional License',
      issuer: 'RAMA SSI Admin',
      issuedDate: '2023-03-10T09:30:00Z',
      status: 'active',
    },
    {
      id: '2',
      name: 'Doctor Certification',
      type: 'Certification',
      issuer: 'RAMA SSI Admin',
      issuedDate: '2023-04-15T14:45:00Z',
      status: 'active',
    },
    {
      id: '3',
      name: 'Hospital Employee ID',
      type: 'Identification',
      issuer: 'RAMA SSI Admin',
      issuedDate: '2023-05-22T11:15:00Z',
      status: 'revoked',
    },
  ];

  // Mock data for received credentials
  const receivedCredentials: Credential[] = [
    {
      id: '4',
      name: 'Hospital Affiliation',
      type: 'Affiliation',
      issuer: 'City Hospital',
      issuedDate: '2023-02-05T10:20:00Z',
      status: 'active',
    },
    {
      id: '5',
      name: 'Medical Board Registration',
      type: 'Registration',
      issuer: 'Medical Board',
      issuedDate: '2023-01-18T13:40:00Z',
      status: 'expired',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'revoked':
        return 'red';
      case 'expired':
        return 'orange';
      default:
        return 'default';
    }
  };

  const columns: TableProps<Credential>['columns'] = [
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
      title: 'Issuer',
      dataIndex: 'issuer',
      key: 'issuer',
    },
    {
      title: 'Issued Date',
      dataIndex: 'issuedDate',
      key: 'issuedDate',
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
          {record.status === 'active' && record.issuer === 'RAMA SSI Admin' && (
            <Button type="link" size="small" danger>
              Revoke
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Credentials</Title>
      <p>Manage verifiable credentials that have been issued or received</p>

      <Card style={{ marginTop: 16 }}>
        <Tabs defaultActiveKey="issued">
          <TabPane tab="Issued Credentials" key="issued">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Input.Search
                placeholder="Search issued credentials..."
                onSearch={(value) => setSearchText(value)}
                style={{ width: 300 }}
              />
              <Button type="primary" icon={<PlusOutlined />}>
                Issue New Credential
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={issuedCredentials}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab="Received Credentials" key="received">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <Input.Search
                placeholder="Search received credentials..."
                onSearch={(value) => setSearchText(value)}
                style={{ width: 300 }}
              />
            </div>
            <Table
              columns={columns}
              dataSource={receivedCredentials}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default CredentialsPage;