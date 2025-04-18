import React, { use, useEffect, useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { Typography, Table, Button, Tag, Input, Space, Card, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ConnectionService } from '@/services/connectionService';
import { IssuerAgent } from '@/config/config';
import ConnectionList from './ConnectionList';
import ShowJsonData from '@/components/dialogs/ShowJsonData';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { create } from 'node_modules/axios/index.d.cts';

const { Title } = Typography;

const IssuerConnectionPage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [jsonData, setJsonData] = useState<unknown>({});
  const [openJsonDialog, setOpenJsonDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [connections, setConnections] = useState<unknown[]>([]);
  const connectionService = new ConnectionService(IssuerAgent);

  const getConnection = async() => {
    setLoading(true)
    try {
      const connectionService = new ConnectionService(IssuerAgent);
      const data = await connectionService.getConnections();
      setConnections(data.results);
    } catch (error) {
      messageApi.error("Failed to load connections");
      console.error("Error fetching connections:", error);
    }
    finally {
      setLoading(false)
    }
  }

  const createInvitation = async() => {
    setLoading(true);
    const invitation = await connectionService.createInvitation();
    setJsonData(invitation);
    setLoading(false);
    setOpenJsonDialog(true);
  }

  const showConnection = (connectionId: string) => {
    setLoading(true);
    const con = connections.find((c) => c["connection_id"] === connectionId);
    if (con) {
      setJsonData(con);
      setLoading(false);
      setOpenJsonDialog(true);
    }
  }

  const deleteConnection = async (connectionId: string) => {
    const connectionService = new ConnectionService(IssuerAgent);
    setLoading(true);
    setOpenConfirmDialog(false);
    if (!confirm) {
      const con = connections.find((c) => c["connection_id"] === connectionId);
      if (con["state"] === "active") {
        setJsonData(con);
        setLoading(false);
        setOpenConfirmDialog(true);
        return;
      }
    }
    const response = await connectionService.deleteConnection(connectionId);
    if (response) {
      messageApi.success(`"Connection ${connectionId} deleted successfully"`);
      setConnections(connections.filter((c) => c["connection_id"] !== connectionId));
      setLoading(false)
    }
    
  };

  useEffect(() => {
    getConnection();
  }, []);



  return (
    <>
      {contextHolder}
      <Title level={2}>Issuer Connections</Title>
      <p>Manage SSI issuer's connections with other entities</p>

      <Card style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Input.Search
            placeholder="Search connections..."
            onSearch={(value) => setSearchText(value)}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} 
            disabled
            onClick={() => createInvitation()}
          >
            Create Invitation
          </Button>
        </div>

        <ConnectionList 
          loading={loading}
          connections={connections}
          onAuditClicked={showConnection}
          onDeleteClicked={deleteConnection}
        />
        <ShowJsonData
          open={openJsonDialog}
          data={jsonData}
          title={"Connection Details"}
          onClose={() => setOpenJsonDialog(false)}
        />
        <ConfirmDialog
          open={openConfirmDialog}
          onCanel={() => setOpenConfirmDialog(false)}
          onOk={() =>
            deleteConnection(jsonData["connection_id"], true)
          }
          title={"Delete this active connection?"}
          message={`"Connection id ${jsonData["connection_id"]} is active, delete it might affected to issued credential."`}
        />
      </Card>
    </>
  );
};

export default IssuerConnectionPage;