import { Tag } from "antd";
import { RightCodeType } from "./type";

const RightCode: RightCodeType = ({
  type,
  value
}) => {
  let color = "";
  switch(type) {
    case 1:
      color = "gold";
      break;
    case 2:
      color = "blue";
      break;
  }

  return (
    <Tag color={color}>
      {value}
    </Tag>
  );
};

export default RightCode;