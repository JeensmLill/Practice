import { Button, Table, TableProps, message, notification } from "antd";
import { NotificationInstance } from "antd/lib/notification";
import { LoaderFunctionArgs, RouteObject, useLoaderData, useSubmit } from "react-router-dom";
import { reqGetNewsAuditList_user, reqUpdateNews } from "~/api/news";
import AuditState from "~/components/AuditState";
import NewsPreviewLink from "~/components/NewsPreviewLink";
import NewsRewriteBtn from "~/components/NewsRewriteBtn";
import PublishState from "~/components/PublishState";
import { usePagination } from "~/routes/@hooks/pagination";
import { getURLSearchParams } from "~/routes/@utils/loader";
import { submitAfterRecordRemoved } from "~/routes/@utils/pagination";
import { stroeSelector_account } from "~/store";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const urlSearchParams = getURLSearchParams({ request, names: ["page", "pageSize"] });

  const rsl = await reqGetNewsAuditList_user({
    userId: stroeSelector_account()._id,
    page: urlSearchParams["page"] || 1,
    limit: urlSearchParams["pageSize"] || 5,
  });
  if (rsl.code !== 200) {
    console.log(rsl);
    throw new Response("Not Found", { status: 404 });
  }
  return rsl.data;
};
type Return_Loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const {
    total,
    news,
  } = useLoaderData() as Return_Loader;
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
      title: "审核状态",
      dataIndex: ["auditState"],
      render: (value) => {
        return (
          <AuditState state={value} />
        );
      }
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
        const innerHandleClick_auditHandle = async (kind: 1 | 2 | 3) => {
          let auditState: number | undefined,
            publishState: number | undefined,
            publishTime: number | undefined,
            kind_notification: keyof NotificationInstance = "success",
            message_notification = "",
            description_notification = "";
          switch(kind) {
            case 1:
              auditState = 0;
              kind_notification = "warning"
              message_notification = "撤销审核成功";
              description_notification = "可以前往【新闻管理-草稿箱】中重新提交审核";
              break;
            case 2:
              publishState = 2;
              publishTime = Date.now();
              message_notification = "发布新闻成功";
              description_notification = "可以前往【发布管理-已发布】查看已发布的新闻";
              break;
            case 3:
              auditState = 0;
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
        switch (record.auditState) {
          case 1:
            return (
              <Button danger type="dashed"
                onClick={() => innerHandleClick_auditHandle(1)}
              >撤销</Button>
            );
          case 2:
            return (
              <Button type="primary"
                onClick={() => innerHandleClick_auditHandle(2)}
              >发布</Button>
            );
          case 3:
            return (
              <NewsRewriteBtn newsId={record._id}
                onRewrite={() => innerHandleClick_auditHandle(3)}
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
      },
    },
  ];

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

const route: RouteObject = {
  path: "list",
  loader,
  Component
};
export default route;