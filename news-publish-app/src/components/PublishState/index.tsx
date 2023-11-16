import { Tag } from "antd";
import { PublishStateType } from "./type";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";

const PublishState: PublishStateType = ({state = 0}) => {
  switch(state) {
    case 0:
      return (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          未审核
        </Tag>
      );
    case 1:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          待发布
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          已发布
        </Tag>
      );
    case 3:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          已下线
        </Tag>
      );
  }
};

export default PublishState;