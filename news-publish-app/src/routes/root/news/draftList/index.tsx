import { UploadOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table, TableProps, Tooltip, message, notification } from "antd";
import { LoaderFunctionArgs, RouteObject, useLoaderData, useRevalidator, useSubmit } from "react-router-dom";
import { reqDeleteNews, reqGetNewsDraftList_user, reqUpdateNews } from "~/api/news";
import NewsPreviewLink from "~/components/NewsPreviewLink";
import { usePagination } from "~/routes/@hooks/pagination";
import { getURLSearchParams } from "~/routes/@utils/loader";
import { submitAfterRecordRemoved } from "~/routes/@utils/pagination";
import { stroeSelector_account } from "~/store";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const urlSearchParams = getURLSearchParams({ request, names: ["page", "pageSize"] });

  const rsl = await reqGetNewsDraftList_user({
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
  const revalidator = useRevalidator();

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
      title: "操作",
      align: "center",
      width: "240px",
      fixed: "right",
      render: (_, record) => {
        const handleClick_alter = () => {
          submit(null, { action: `../alter/${record._id}` });
        };
        const handleConfirm_delete = async () => {
          const rsl = await reqDeleteNews({ _id: record._id });
          if (rsl.code === 200) {
            message.success(rsl.msg);
            submitAfterRecordRemoved({
              submit,
              recordsLength: news.length,
              state_currentPage,
              state_pageSize,
              setState_currentPage
            })
            submit(null);
          } else {
            console.log(rsl);
            message.error(rsl.msg);
          }
        };
        const handleClick_submitAudit = async () => {
          const rsl = await reqUpdateNews({
            _id: record._id,
            auditState: 1,
          })
          if (rsl.code === 200) {
            notification["success"]({
              message: "提交审核成功",
              description: "等待管理员审核通过后，可以前往【发布管理-待发布】发布该新闻",
              placement: "bottomRight",
            })
            revalidator.revalidate();
          } else {
            console.log(rsl);
            message.error(rsl.msg);
          }
        };
        return (
          <>
            <Tooltip title="提交审核" color="blue">
              <Button type="primary" icon={<UploadOutlined />}
                onClick={handleClick_submitAudit}
              />
            </Tooltip>
            <Button className="btn-primary-warning"
              onClick={handleClick_alter}
            >修改
            </Button>
            <Popconfirm title="Are you sure?"
              onConfirm={handleConfirm_delete}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </>
        );
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
      scroll={{x: "calc(240px + 50%)", y: 600}}
    />
  );
};

const route: RouteObject = {
  path: "draftList",
  loader,
  Component,
};
export default route;