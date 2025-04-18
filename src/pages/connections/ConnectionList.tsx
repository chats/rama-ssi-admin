import { Button, Table, Tag, Tooltip } from "antd";
import { AuditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const states = [
    "abandoned",
    "active",
    "completed",
    "error",
    "init",
    "invitation",
    "request",
    "response",
    "start",
];

const stateFilters = states.map((state) => ({
    text: state,
    value: state,
  }));


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


const ConnectionList: React.FC<any> = ({
    connections,
    onDeleteClicked,
    onAuditClicked,
    loading,
    size = "large",
  }) => {
    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
        align: "right" as const,
        width: "100px",
      },
      {
        title: "Connection ID",
        dataIndex: "connection_id",
        key: "connection_id",
      },
      //{ title: "Source DID", dataIndex: "my_did", key: "my_did" },
      { title: "Their Label", dataIndex: "their_label", key: "their_label" },
      //{ title: "Target DID", dataIndex: "their_did", key: "their_did" },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        defaultSortOrder: "descend",
        sorter: (a: { created_at: moment.MomentInput; }, b: { created_at: moment.MomentInput; }) =>
          moment(a.created_at).unix() - moment(b.created_at).unix(),
      },
      {
        title: "Updated At",
        dataIndex: "updated_at",
        key: "updated_at",
        defaultSortOrder: "descend",
        sorter: (a: { created_at: moment.MomentInput; }, b: { created_at: moment.MomentInput; }) =>
          moment(a.created_at).unix() - moment(b.created_at).unix(),
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        filters: stateFilters,
        onFilter: (value: string, record: { state: string | string[]; }) => record.state.indexOf(value as string) === 0,
        render: (state) => (
            <Tag color={getStatusColor(state)}>
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </Tag>
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "center" as const,
        width: "200px",
        render: (_: never, record: never) => (
          <>
            <Tooltip title="Show details">
              <Button
                type="link"
                icon={<AuditOutlined />}
                size="large"
                onClick={() => onAuditClicked(record["connection_id"])}
              />
            </Tooltip>
            <Tooltip title="Delete connection">
              <Button
                type="link"
                icon={<DeleteOutlined />}
                danger
                size="large"
                disabled={record["state"] === "active"}
                onClick={() => onDeleteClicked(record["connection_id"])}
              />
            </Tooltip>
          </>
        ),
      },
    ];

    const dataSource  = connections.map((row: never, index: never) => ({
        index: index + 1,
        connection_id: row["connection_id"],
        my_did: row["my_did"],
        their_label: row["their_label"],
        their_did: row["their_did"],
        created_at: moment(row["created_at"]).format("YYYY-MM-DD HH:mm:ss"),
        updated_at: moment(row["updated_at"]).format("YYYY-MM-DD HH:mm:ss"),
        state: row["state"],
        key: row["connection_id"],
    }));


    return (
      <>
        <Table
          loading={loading}
          size={size}
          dataSource={dataSource}
          columns={columns}
          showSorterTooltip={{ target: "sorter-icon" }}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "25", "50", "100", "200"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} จาก ${total} รายการ`,
          }}
        />
      </>
    );
};

export default ConnectionList;