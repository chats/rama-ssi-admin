import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Typography, Table, Button, Space, Card, Modal, message, Input } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { CredentialService } from '@/services/credentialService';
import { HolderAgent } from '@/config/config';
import dayjs from 'dayjs';
import { camelToTitleCase } from '@/utils/string.utils';
import { get } from 'node_modules/axios/index.d.cts';

const { Title } = Typography;

interface CredentialW3C {
  record_id: string;
  cred_value: {
    credentialSubject: {
      type: string[];
      id: string;
    };
    issuanceDate: string;
  };
}

interface TableRecord {
  index: number;
  credential_id: string;
  credential_type: string;
  issuance_date: string;
  key: string;
}


const CredentialsPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);

  // Real one
  const [credentials, setCredentials] = useState<CredentialW3C[]>([]);
  const credentialService = React.useMemo(() => new CredentialService(HolderAgent), []);

  
  const getCredentials = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await credentialService.getCredentials();
      console.log('Fetched credentials:', data);
      if (data) {
        console.log("Has data")
        setCredentials(data.results);
      }
    } catch (error) {
      messageApi.error('Failed to fetch credential records');
      console.error('Error fetching credentials:', error);
    } finally {
      setLoading(false);
    }
  }, [credentialService, messageApi]);

  const handleView = useCallback((credential_id: string) => {
    const selected = credentials.find((cred) => cred.record_id === credential_id);
    console.log("Credentials:", credentials);
    console.log("Selected credential:", selected);
    if (selected) {
      setModalContent(selected.cred_value.credentialSubject);
    }
    setIsModalOpen(true);
  }, [credentials]);

  const handleDelete = useCallback((credential: Credential) => {
    setSelectedCredential(credential);
    setIsConfirmOpen(true);
  }, []);

  useEffect(() => {
    getCredentials();
  }, [getCredentials]);

  const columns = useMemo(() => [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "right" as const,
      width: 100,
    },
    {
      title: 'Credential ID',
      dataIndex: 'credential_id',
      key: 'credential_id',
    },
    {
      title: 'Type',
      dataIndex: 'credential_type',
      key: 'credential_type',
      render: (text: string) => {
        return camelToTitleCase(text);
      }
    },
    {
      title: 'Issuance Date',
      dataIndex: 'issuance_date',
      key: 'issuance_date',
      sorter: (a: TableRecord, b: TableRecord) =>
        dayjs(a.issuance_date).unix() - dayjs(b.issuance_date).unix(),
    },
   
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: TableRecord) => (
        <Space size="small">
          <Button type="link" size="small" onClick={() => handleView(record.credential_id)}>View</Button>
          <Button type="link" size="small" danger onClick={() => handleDelete(record)}>
              Delete
          </Button>
        </Space>
      )
    },
  ], [handleView, handleDelete]);

  const dataSource = useMemo(() => 
    loading
      ? []
      : credentials.map((row, index) => ({
          index: index + 1,
          credential_id: row.record_id,
          credential_type: row.cred_value.credentialSubject.type[0],
          issuance_date: dayjs(row.cred_value.issuanceDate).format("YYYY-MM-DD HH:mm:ss"),
          key: row.record_id,
        })), 
    [loading, credentials]
  );

  return (
    <>
      {contextHolder}
      <Title level={2}>Credentials</Title>
      <p>Manage verifiable credentials that have been issued or received</p>

      <Card style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Input.Search
            placeholder="Search connections..."
            onSearch={(value) => setSearchText(value)}
            style={{ width: 300 }}
          />
          <Button 
            type="primary" 
            icon={<ReloadOutlined />}
            onClick={()=> getCredentials()}
          >
            Refresh
          </Button>
        </div>
        <Table
            columns={columns}
            loading={loading}
            dataSource={dataSource}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={modalContent && modalContent.type ? camelToTitleCase(modalContent.type[0]) : "Unknown Type"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
        styles={{ body: { maxHeight: '70vh', overflow: 'auto', padding: '12px' } }}
      >
        {modalContent && (
          <Card 
            //bordered={false}
            variant='outlined'
            className="credential-detail-card"
            style={{ 
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              background: 'linear-gradient(to right, #f7f9fc, #eef2f7)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(modalContent).map(([key, value]) => {
                // Skip rendering if key is 'type' or 'id'
                if (key === 'type' || key === 'id') return null;
                
                return (
                  <div 
                    key={key}
                    style={{ 
                      padding: '10px', 
                      borderBottom: key !== Object.keys(modalContent).filter(k => k !== 'type' && k !== 'id').pop() ? '1px solid #f0f0f0' : 'none',
                    }}
                  >
                    <Typography.Text 
                      strong 
                      style={{ 
                        color: '#1890ff', 
                        fontSize: '14px',
                        display: 'block',
                        marginBottom: '4px'
                      }}
                    >
                      {camelToTitleCase(key)}
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: '16px' }}>
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </Typography.Text>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </Modal>

      <Modal
        title="Confirm Delete"
        open={isConfirmOpen}
        onOk={() => {
          // Add revoke logic here
          setIsConfirmOpen(false);
        }}
        onCancel={() => setIsConfirmOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        {selectedCredential && (
          <p>Are you sure you want to revoke the credential "{selectedCredential.name}"?</p>
        )}
      </Modal>
    </>
  );
};

export default CredentialsPage;