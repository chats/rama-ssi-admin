import { Button, Table, Tooltip, message } from "antd";
import {
  ReloadOutlined,
  DeleteOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { VerifierAgent } from "@/config/config";
import ShowJsonData from "@/components/dialogs/ShowJsonData";
import { PresentProofService } from "@/services/presentProofService";

const states = [
  "abandoned",
  "presentation_sent",
  "presentation_received",
  "presentation_acked",
  "proposal_sent",
  "proposal_received",
  "request_sent",
  "request_received",
  "verified",
];

const stateFilters = states.map((state) => ({
  text: state,
  value: state,
}));

const ProofRecords: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [proofRecords, setProofRecords] = useState([]);
  const [singleRecord, setSingleRecord] = useState({});

  const presentProofService = useMemo(() => new PresentProofService(VerifierAgent),[]);

  const getPresentProofRecords = useCallback(async() => {
    setLoading(true);
    try {
      const res = await presentProofService.getRecords();
      if (res) {
        setProofRecords(res["results"]);
      }
    } catch (error) {
      messageApi.error("Failed to load proof records");
      console.error("Error fetching proof records:", error);
    } finally {
      setLoading(false);
    }
  },[messageApi, presentProofService]);

  const showDetailDialog = (presExId: string) => {
    const record = proofRecords.find(
      (record) => record["pres_ex_id"] === presExId,
    );

    if (record) {
      setSingleRecord(record);
      setOpenDialog(true);
    }
  };

  const hideDetailDialog = () => {
    setOpenDialog(false);
  };

  const deleteRecord = (presExId: string) => {
    setLoading(true);
    presentProofService.deleteRecord(presExId).then(() => {
      const newList = proofRecords.filter(
        (record) => record["pres_ex_id"] !== presExId,
      );
      setProofRecords(newList);
      messageApi.success(`Presentation exchange id ${presExId} deleted`);
      setLoading(false);
      //getPresentProofRecords();
    });
  };

  const cols = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "right" as const,
      width: "100px",
    },
    {
      title: "Presentation Exchange ID",
      dataIndex: "pres_ex_id",
      key: "pres_ex_id",
    },
    {
      title: "Connection ID",
      dataIndex: "connection_id",
      key: "connection_id",
    },
    //{ title: "Name", dataIndex: "name", key: "name" },
    { title: "Verified", dataIndex: "verified", key: "verified" },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) =>
        moment(a.updated_at).unix() - moment(b.updated_at).unix(),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      filters: stateFilters,
      onFilter: (value: any, record: any) => record.state.indexOf(value) === 0,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center" as const,
      width: "200px",
      render: (_: any, record: any) => (
        <>
          <Tooltip title="Show details">
            <Button
              type="link"
              icon={<AuditOutlined />}
              size="large"
              onClick={() => showDetailDialog(record["pres_ex_id"])}
            />
          </Tooltip>
          <Tooltip title="Delete record">
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
              size="large"
              onClick={() => deleteRecord(record["pres_ex_id"])}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const data = loading
    ? []
    : proofRecords.map((row, index) => ({
        index: index + 1,
        pres_ex_id: row["pres_ex_id"],
        connection_id: row["connection_id"],
        //name: row["presentation_request"]["name"],
        verified: row["verified"],
        created_at: moment(row["created_at"]).format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment(row["updated_at"]).format("YYYY-MM-DD HH:mm:ss"),
        state: row["state"],
        key: row["pres_ex_id"],
      }));

  useEffect(() => {
    getPresentProofRecords();
  }, [getPresentProofRecords]);

  return (
    <>
      {contextHolder}
      <div className="flex w-full justify-between py-4 mb-4">
        <h1 className="text-2xl font-semibold">Proof Records</h1>
        <div className="flex flex-row gap-4">
          <Button
            type="link"
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={() => getPresentProofRecords()}
          >
            Refresh
          </Button>
        </div>
      </div>
      <div>
        <div style={{ width: "100%", minHeight: "400px" }}>
          <Table
            loading={loading}
            dataSource={data}
            columns={cols}
            showSorterTooltip={{ target: "sorter-icon" }}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: ["10", "25", "50", "100", "200"],
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} จาก ${total} รายการ`,
            }}
          />
          <ShowJsonData
            open={openDialog}
            data={singleRecord}
            title={"Proof Record"}
            onClose={hideDetailDialog}
          />
        </div>
      </div>
    </>
  );
};

export default ProofRecords;