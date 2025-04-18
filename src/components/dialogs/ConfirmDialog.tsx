import { Button, Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface ConfirmDialogProps {
  open: boolean;
  onCanel: () => void;
  onOk: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  return (
    <Modal
      open={props.open}
      closable={false}
      title={
        <Space>
          <div className="text-orange-500 text-2xl">
            <ExclamationCircleOutlined />
          </div>
          <span className="text-lg">{props.title}</span>
        </Space>
      }
      //onCancel={props.onCanel}
      //onOk={props.onOk}
      footer={[
        <Button key="back" onClick={props.onCanel} shape="round">
          Cancel
        </Button>,
        <Button key="submit" shape="round" type="primary" onClick={props.onOk}>
          Ok
        </Button>,
      ]}
    >
      <div className="pt-2 pb-4">
        <p>{props.message}</p>
      </div>
    </Modal>
  );
};
export default ConfirmDialog;