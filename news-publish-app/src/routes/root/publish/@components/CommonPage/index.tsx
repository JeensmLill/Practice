import { Button, Table, TableProps, message, notification } from "antd";
import { NotificationInstance } from "antd/lib/notification";
import { useLoaderData, useSubmit } from "react-router-dom";
import { reqUpdateNews } from "~/api/news";
import PublishState from "~/components/PublishState";
import { usePagination } from "~/routes/@hooks/pagination";
import { submitAfterRecordRemoved } from "~/routes/@utils/pagination";
import { Return_Loader } from "./type";
import NewsRewriteBtn from "~/components/NewsRewriteBtn";
import NewsPreviewLink from "~/components/NewsPreviewLink";

const CommonPage = () => {
  // data
  const {total, news} = useLoaderData() as Return_Loader;
  const submit = useSubmit();

  // pagination
  const {
    state_currentPage,
    setState_currentPage,
    state_pageSize,
    handleChange_pagination,
  } = usePagination();

  // table
  type Record = (typeof news)[number];
  const columns: TableProps<Record>["columns"] = [
    {
      title: "新闻标题",
      dataIndex: ["title"],
      render: (value, record) => {
        return (
          <NewsPreviewLink newsId={record._id} newsTitle={value} />
        );
      }
    },
    {
      title: "新闻分类",
      dataIndex: ["_newsCategory", "name"],
    },
    {
      title: "发布状态",
      dataIndex: ["publishState"],
      render: (value) => {
        return (
          <PublishState state={value} />
        );
      }
    },
    {
      title: "操作",
      align: "center",
      width: "160px",
      fixed: "right",
      render: (_, record) => {
        const innerHandleClick_publish = async (kind: 1 | 2 | 3) => {
          let auditState: number | undefined,
            publishState: number | undefined,
            publishTime: number | null | undefined,
            kind_notification: keyof NotificationInstance = "success",
            message_notification = "",
            description_notification = "";
          switch(kind) {
            case 1:
              publishState = 2;
              publishTime = Date.now();
              message_notification = "发布新闻成功";
              description_notification = "可以前往【已发布】查看已发布的新闻";
              break;
            case 2:
              publishState = 3;
              kind_notification = "warning";
              message_notification = "下线新闻成功";
              description_notification = "可以前往【已下线】查看已下线的新闻";
              break;
            case 3:
              auditState = 0;
              publishState = 0;
              publishTime = null;
              message_notification = "新闻已转存到草稿箱";
              description_notification = "可以前往【新闻管理-草稿箱】修改新闻，并重新提交审核";
              break;
          }
          const rsl = await reqUpdateNews({
            _id: record._id,
            auditState,
            publishState,
            publishTime,
          })
          if (rsl.code === 200) {
            notification[kind_notification]({
              message: message_notification,
              description: description_notification,
              placement: "bottomRight",
            })
            submitAfterRecordRemoved({
              submit,
              recordsLength: news.length,
              state_currentPage,
              state_pageSize,
              setState_currentPage
            })
          } else {
            console.log(rsl);
            message.error(rsl.msg);
          }
        };
        switch(record.publishState) {
          case 1:
            return(
              <Button type="primary"
                onClick={() => innerHandleClick_publish(1)}
              >发布</Button>
            );
          case 2:
            return(
              <Button danger type="primary"
                onClick={() => innerHandleClick_publish(2)}
              >下线</Button>
            );
          case 3:
            return(
              <NewsRewriteBtn newsId={record._id}
                onRewrite={() => innerHandleClick_publish(3)}
                onRecordRemoved={() => submitAfterRecordRemoved({
                  submit,
                  recordsLength: news.length,
                  state_currentPage,
                  state_pageSize,
                  setState_currentPage
                })}
              />
            );
        }
      }
    }
  ]

  return (
    <Table dataSource={news} columns={columns} rowKey={"_id"} bordered
      pagination={{
        total: total,
        current: state_currentPage,
        pageSize: state_pageSize,
        pageSizeOptions: ["5", "10", "20", "50"],
        showTotal: (total, range) => `(${range[0]}~${range[1]} of ${total} items)`,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: handleChange_pagination,
      }}
      scroll={{x: "calc(160px + 50%)", y: 600}}
    />
  )
};

export default CommonPage;