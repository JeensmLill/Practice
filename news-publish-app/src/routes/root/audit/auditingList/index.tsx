import { Button, Drawer, Table, TableProps, message, notification } from "antd";
import { useState } from "react";
import { LoaderFunctionArgs, RouteObject, useLoaderData, useRevalidator } from "react-router-dom";
import { reqGetNewsAuditingList, reqUpdateNews } from "~/api/news";
import NewsPreview from "~/components/NewsPreview";
import { usePagination } from "~/routes/@hooks/pagination";
import { requestListData } from "~/routes/@utils/pagination";

const loader = async ({request}: LoaderFunctionArgs) => {
  return requestListData({request, api: reqGetNewsAuditingList});
};
type Return_Loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  //data
  const {total, news} = useLoaderData() as Return_Loader;
  const revalidator = useRevalidator();

  // drawer
  const [state_drawerOpen, setState_drawerOpen] = useState(false);
  const handleClose_auditing = () => {
    setState_drawerOpen(false);
  };
  const innerHandleClick_audit = async (pass: boolean) => {
    const rsl = await reqUpdateNews({
      _id: state_auditingRecord._id,
      auditState: pass ? 2 : 3,
      publishState: pass ? 1 : 0,
    })
    if(rsl.code === 200) {
      setState_drawerOpen(false);
      notification[pass ? "success" : "warning"]({
        message: pass ? "新闻已通过审核" : "新闻未通过审核",
        description: pass ? "可以前往【发布管理-待发布】发布新闻" : "可以前往【审核管理-审核列表】对未通过审核的新闻进行操作",
        placement: "bottomRight",
      })
      revalidator.revalidate();
    } else {
      console.log(rsl);
      message.error(rsl.msg);
    }
  };

  // table
  type Record = (typeof news)[number];
  const [state_auditingRecord, setState_auditingRecord] = useState<Record>(news[0]);
  const columns: TableProps<Record>["columns"] = [
    {
      title: "id",
      dataIndex: ["_id"],
    },
    {
      title: "新闻标题",
      dataIndex: ["title"],
    },
    {
      title: "新闻分类",
      dataIndex: ["_newsCategory", "name"],
    },
    {
      title: "操作",
      align: "center",
      width: "160px",
      fixed: "right",
      render: (_, record) => {
        const handleClick_auditBtn = () => {
          setState_auditingRecord(record);
          setState_drawerOpen(true);
        };
        return (
          <>
          <Button type="primary"
            onClick={handleClick_auditBtn}
          >审核</Button>
          </>
        );
      }
    },
  ];

  // pagination
  const {
    state_currentPage,
    state_pageSize,
    handleChange_pagination,
  } = usePagination();

  return (
    <>
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
      scroll={{x: "calc(160px + 50%", y: 600}}
    />
    <Drawer title="审核新闻" placement="right" closable={false} width="60%"
      style={{ position: 'absolute' }}
      open={state_drawerOpen}
      onClose={handleClose_auditing}
    >
      <NewsPreview news={state_auditingRecord}/>
      <div style={{marginTop: "10px"}}>
        <Button type="primary"
          onClick={() => innerHandleClick_audit(true)}
        >审核通过</Button>
        <Button onClick={() => innerHandleClick_audit(false)}>未通过</Button>
      </div>
    </Drawer>
    </>
  );
};

const route: RouteObject = {
  path: "auditingList",
  loader,
  Component
};
export default route;