import { Descriptions } from "antd";
import moment from "moment";
import { NewsPreviewType } from "./type";
import AuditState from "../AuditState";
import PublishState from "../PublishState";

const NewsPreview: NewsPreviewType = ({
  news,
  title,
  category,
  author,
  content,
}) => {
  return (
    <>
    <Descriptions title={title || news?.title}>
      <Descriptions.Item label="作者">{author || news?._user.username}</Descriptions.Item>
      <Descriptions.Item label="新闻分类">{category || news?._newsCategory.name}</Descriptions.Item>
      <Descriptions.Item label="创建时间">
        {news?.createdAt ? moment(news.createdAt).format("YYYY/MM/DD HH:mm:ss") : "-"}
      </Descriptions.Item>
      <Descriptions.Item label="审核状态">
        <AuditState state={news?.auditState}/>
      </Descriptions.Item>
      <Descriptions.Item label="发布状态">
        <PublishState state={news?.publishState}/>
      </Descriptions.Item>
      <Descriptions.Item label="发布时间">
        {news?.publishTime ? moment(news.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"}
      </Descriptions.Item>
    </Descriptions>
    <div dangerouslySetInnerHTML={{__html: content || news?.content || ""}}
      style={{
        border: "0.5px solid gray",
        backgroundColor: "white",
        padding: "5px"
      }}
    ></div>
    </>
  );
};

export default NewsPreview;