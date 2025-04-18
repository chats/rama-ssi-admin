import { Button, Table, Tooltip, message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DeleteOutlined,
  AuditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs"; // Replace moment with dayjs for better performance
import ShowJsonData from "@/components/dialogs/ShowJsonData";
import { CredentialService } from "@/services/credentialService";
import { IssuerAgent } from "@/config/config";

// Define types for better type safety
interface IssuedCredentialRecord {
  cred_ex_record: {
    cred_proposal: {
      comment: string;
    };
    cred_ex_id: string;
    connection_id: string;
    created_at: string;
    updated_at: string;
    state: string;
  };
}

interface TableRecord {
  index: number;
  connection_id: string;
  cred_ex_id: string;
  created_at: string;
  updated_at: string;
  state: string;
  key: string;
}

// Move constants outside component
const STATES = [
  "offer_sent",
  "offer_received",
  "proposal_sent",
  "proposal_received",
  "request_received",
  "request_sent",
  "credential_issued",
  "credential_received",
  "credential_revoked",
  "credential_acked",
  "abandoned",
] as const;

const STATE_FILTERS = STATES.map((state) => ({
  text: state,
  value: state,
}));

const PAGINATION_OPTIONS = ["10", "25", "50", "100", "200"];

const IssueCredentialRecords: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [issuedRecords, setIssuedRecord] = useState<IssuedCredentialRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<IssuedCredentialRecord | null>(null);
  
  const credentialService = useMemo(() => new CredentialService(IssuerAgent), []);

  const getIssuedCredentialRecords = useCallback(async () => {
    try {
      setLoading(true);
      //const res = await issueCred.getRecords();
      const data = await credentialService.getIssuedRecords();
      if (data.results) {
        setIssuedRecord(data.results);
      }
    } catch (error) {
      messageApi.error('Failed to fetch credential records');
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  }, [credentialService, messageApi]);

  const deleteRecord = useCallback(async (cred_ex_id: string) => {
    setLoading(true);
    try {
      await credentialService.deleteIssuedRecord(cred_ex_id);
      // Remove the deleted record from the state
      setIssuedRecord(issuedRecords.filter((record) => record.cred_ex_record.cred_ex_id !== cred_ex_id));
      messageApi.success(`Credential exchange ${cred_ex_id} deleted`);
    } catch (error) {
      messageApi.error('Failed to delete record');
      console.error('Error deleting record:', error);
    } finally {
      setLoading(false);
    }
  }, [credentialService, issuedRecords, messageApi]);

  const showDetails = useCallback((cred_ex_id: string) => {
    const record = issuedRecords.find(
      (record) => record.cred_ex_record.cred_ex_id === cred_ex_id
    );
    if (record) {
      setSelectedRecord(record);
      setOpenDialog(true);
    }
  }, [issuedRecords]);

  useEffect(() => {
    getIssuedCredentialRecords();
  }, [getIssuedCredentialRecords]);

  const columns = useMemo(() => [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "right" as const,
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "cred_name",
      key: "cred_name",
    },
    {
      title: "Credential Exchange ID",
      dataIndex: "cred_ex_id",
      key: "cred_ex_id",
    },
    //{
    //  title: "Connection ID",
    //  dataIndex: "connection_id",
    //  key: "connection_id",
    //},
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      defaultSortOrder: "descend",
      sorter: (a: TableRecord, b: TableRecord) =>
        dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      defaultSortOrder: "descend",
      sorter: (a: TableRecord, b: TableRecord) =>
        dayjs(a.updated_at).unix() - dayjs(b.updated_at).unix(),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      filters: STATE_FILTERS,
      onFilter: (value: string | number | boolean, record: TableRecord) => 
        record.state.indexOf(value as string) === 0,
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      width: 200,
      render: (_: unknown, record: TableRecord) => (
        <div className="flex justify-center space-x-2">
          <Tooltip title="Show details">
            <Button
              type="link"
              icon={<AuditOutlined />}
              size="large"
              onClick={() => showDetails(record.cred_ex_id)}
            />
          </Tooltip>
          <Tooltip title="Delete record">
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              size="large"
              onClick={() => deleteRecord(record.cred_ex_id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ], [deleteRecord, showDetails]);

  const tableData = useMemo(() => 
    loading
      ? []
      : issuedRecords.map((row, index) => ({
          index: index + 1,
          connection_id: row.cred_ex_record.connection_id,
          cred_name: row.cred_ex_record.cred_proposal.comment,
          cred_ex_id: row.cred_ex_record.cred_ex_id,
          created_at: dayjs(row.cred_ex_record.created_at).format("YYYY-MM-DD HH:mm:ss"),
          updated_at: dayjs(row.cred_ex_record.updated_at).format("YYYY-MM-DD HH:mm:ss"),
          state: row.cred_ex_record.state,
          key: row.cred_ex_record.cred_ex_id,
        })), 
    [loading, issuedRecords]
  );

  return (
    <div className="space-y-6">
      {contextHolder}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Issued Credential Records</h1>
        <Button
          type="link"
          loading={loading}
          icon={<ReloadOutlined />}
          onClick={getIssuedCredentialRecords}
        >
          Refresh
        </Button>
      </div>

      <div className="min-h-[400px] w-full">
        <Table
          loading={loading}
          dataSource={tableData}
          columns={columns}
          showSorterTooltip={{ target: "sorter-icon" }}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: PAGINATION_OPTIONS,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} จาก ${total} รายการ`,
          }}
        />

        <ShowJsonData
          title="Credential Record Detail"
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          data={selectedRecord}
        />
      </div>
    </div>
  );
};

export default IssueCredentialRecords;