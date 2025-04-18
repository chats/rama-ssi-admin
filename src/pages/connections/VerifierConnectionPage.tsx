import React, { use, useEffect, useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { Typography, Table, Button, Tag, Input, Space, Card, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ConnectionService } from '@/services/connectionService';
import {VerifierAgent } from '@/config/config';
import ConnectionList from './ConnectionList';
import ShowJsonData from '@/components/dialogs/ShowJsonData';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';

const { Title } = Typography;

const VerifierConnectionPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<unknown>({});
  const [openJsonDialog, setOpenJsonDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [connections, setConnections] = useState<unknown[]>([]);

  const getConnection = async() => {
    setLoading(true);

    try {
      const connectionService = new ConnectionService(VerifierAgent);
      const data = await connectionService.getConnections();
      setConnections(data.results);
    } catch (error) {
      messageApi.error("Failed to load connections");
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  }

  const showDetails = (connectionId: string) => {
    setLoading(true);
    const con = connections.find((c) => c["connection_id"] === connectionId);
    if (con) {
      setSelectedConnection(con);
      setLoading(false);
      setOpenJsonDialog(true);
    }
  }

  const deleteConnection = async (connectionId: string) => {
    const connectionService = new ConnectionService(VerifierAgent);
    await connectionService.deleteConnection(connectionId);
    setConnections(connections.filter((connection) => connection.id !== connectionId));
  };

  useEffect(() => {
    getConnection();
  }, []);



  return (
    <>
      {contextHolder}
      <Title level={2}>Verifier Connections</Title>
      <p>Manage SSI verifier's connections with other entities</p>

      <Card style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Input.Search
            placeholder="Search connections..."
            onSearch={(value) => setSearchText(value)}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} disabled>
            New Connection
          </Button>
        </div>

        <ConnectionList 
          loading={loading}
          connections={connections}
          onAuditClicked={showDetails}
          onDeleteClicked={deleteConnection}
        />
        <ShowJsonData
          open={openJsonDialog}
          data={selectedConnection}
          title={"Connection Details"}
          onClose={() => setOpenJsonDialog(false)}
        />
        <ConfirmDialog
          open={openConfirmDialog}
          onCanel={() => setOpenConfirmDialog(false)}
          onOk={() =>
            deleteConnection(selectedConnection["connection_id"], true)
          }
          title={"Delete this active connection?"}
          message={`"Connection id ${selectedConnection["connection_id"]} is active, delete it might affected to issued credential."`}
        />
      </Card>
    </>
  );
};

export default VerifierConnectionPage;