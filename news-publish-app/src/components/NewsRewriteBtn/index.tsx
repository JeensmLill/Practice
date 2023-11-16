import { DeleteOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip, message, notification } from "antd";
import { reqDeleteNews } from "~/api/news";
import { NewsRewriteBtnType } from "./type";

const NewsRewriteBtn: NewsRewriteBtnType = ({
  newsId,
  onRecordRemoved,
  onRewrite,
}) => {
  const handleConfirm_delete = async () => {
    const rsl = await reqDeleteNews({
      _id: newsId,
    })
    if (rsl.code === 200) {
      notification["warning"]({
        message: "删除新闻成功",
        description: "可以前往【新闻管理-撰写新闻】添加新的新闻",
        placement: "bottomRight",
      })
      onRecordRemoved()
    } else {
      console.log(rsl);
      message.error(rsl.msg);
    }
  };
  return (
    <>
      <Tooltip title="重写新闻" color="#FF9900">
        <Button type="primary" icon={<RedoOutlined />}
          className="btn-primary-warning"
          onClick={onRewrite}
        />
      </Tooltip>
      <Tooltip title="删除新闻" color="red">
        <Popconfirm title="是否确定删除？"
          onConfirm={handleConfirm_delete}
        >
          <Button danger type="dashed" icon={<DeleteOutlined />} />
        </Popconfirm>
      </Tooltip>
    </>
  );
};

export default NewsRewriteBtn;