import { Card } from "antd";

const ErrorPage = ({src}: {src: string}) => {
  return (
    <Card style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center"
    }}>
      <img src={src}
        style={{
          width: "100%",
        }}
      />
    </Card>
  );
};

export default ErrorPage;