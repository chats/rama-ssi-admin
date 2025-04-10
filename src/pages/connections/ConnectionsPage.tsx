import React, { useState } from 'react';
import { Typography, Table, Button, Tag, Input, Space, Card } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const { Title } = Typography;

interface Connection {
  id: string;
  label: string;
  theirLabel?: string;
  status: 'active' | 'pending' | 'inactive' | 'error';
  createdAt: string;
}

const ConnectionsPage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  
  // Mock data for connections
  const mockConnections: Connection[] = [
    {
      id: '1',
      label: 'Hospital Connection',
      theirLabel: 'City Hospital',
      status: 'active',
      createdAt: '2023-05-15T10:30:00Z',
    },
    {
      id: '2',
      label: 'University Connection',
      theirLabel: 'State University',
      status: 'active',
      createdAt: '2023-06-20T14:45:00Z',
    },
    {
      id: '3',
      label: 'Government Agency',
      theirLabel: 'Ministry of Health',
      status: 'pending',
      createdAt: '2023-07-05T09:15:00Z',
    },
    {
      id: '4',
      label: 'Insurance Provider',
      theirLabel: 'Health Insurance Corp',
      status: 'inactive',
      createdAt: '2023-04-10T11:20:00Z',
    },
    {
      id: '5',
      label: 'Corporate Partner',
      theirLabel: 'Tech Solutions Inc',
      status: 'error',
      createdAt: '2023-08-01T16:00:00Z',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending':
        return 'blue';
      case 'inactive':
        return 'gray';
      case 'error':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns: TableProps<Connection>['columns'] = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => 
        record.label.toLowerCase().includes((value as string).toLowerCase()) || 
        (record.theirLabel || '').toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: 'Their Label',
      dataIndex: 'theirLabel',
      key: 'theirLabel',
      render: (theirLabel) => theirLabel || 'Unknown',
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
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text, record) => (
        <Space size="small">
          <Button type="link" size="small">View</Button>
          <Button type="link" size="small">Message</Button>
          {record.status !== 'active' && (
            <Button type="link" size="small">
              {record.status === 'pending' ? 'Accept' : 'Reconnect'}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Connections</Title>
      <p>Manage your SSI connections with other entities</p>

      <Card style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Input.Search
            placeholder="Search connections..."
            onSearch={(value) => setSearchText(value)}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />}>
            New Connection
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={mockConnections}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default ConnectionsPage;