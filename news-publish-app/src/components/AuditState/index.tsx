import { Tag } from "antd";
import { AuditStateType } from "./type";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

const AuditState: AuditStateType = ({state = 0}) => {
  switch(state) {
    case 0:
      return (
        <Tag icon={<ClockCircleOutlined />} color="default">
          待审核
        </Tag>
      );
    case 1:
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          审核中
        </Tag>
      );
    case 2:
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          已通过
        </Tag>
      );
    case 3:
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          未通过
        </Tag>
      );
  }
};

export default AuditState;