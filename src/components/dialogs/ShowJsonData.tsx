import { Button, Modal } from "antd";

interface ShowJsonDataProps {
  open: boolean;
  title: string;
  data: unknown;
  onClose: () => void;
}

const ShowJsonData: React.FC<ShowJsonDataProps> = (props) => {
  return (
    <>
      <Modal
        width={800}
        open={props.open}
        title={props.title}
        closable={false}
        styles={{ body: { maxHeight: '70vh', overflow: 'auto', padding: '12px' } }}
        footer={[
          <Button
            //shape="round"
            type="primary"
            key="close"
            onClick={() => props.onClose()}
          >
            Close
          </Button>,
        ]}
      >
        <div className="overflow-scroll border-gray-100 border-2 max-h-[600px] ">
          <pre>{JSON.stringify(props.data, null, 2)}</pre>
        </div>
      </Modal>
    </>
  );
};
export default ShowJsonData;