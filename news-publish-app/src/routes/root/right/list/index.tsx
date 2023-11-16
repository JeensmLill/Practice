import { Switch, Table, TableProps, message } from "antd";
import { SwitchChangeEventHandler } from "antd/lib/switch";
import { LoaderFunctionArgs, RouteObject, useLoaderData, useRevalidator } from "react-router-dom";
import { reqGetRight, reqUpdateRightEnable } from "~/api/user";
import RightCode from "~/components/RightCode";

const loader = async ({}: LoaderFunctionArgs) => {
  const rsl = await reqGetRight();
  if (rsl.code !== 200) {
    console.log(rsl);
    throw new Response("Not Found", { status: 404 });
  }
  return rsl.data;
};
type Return_Loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const { right } = useLoaderData() as Return_Loader;
  const revalidetor = useRevalidator();

  // table
  type Record = (typeof right);
  const columns: TableProps<Record>["columns"] = [
    {
      title: "权限",
      dataIndex: ["name"],
    },
    {
      title: "权限值",
      dataIndex: ["code"],
      render: (value, record) => {
        return (
          <RightCode type={record.type} value={value} />
        );
      }
    },
    {
      title: "启用/禁用",
      align: "center",
      width: "160px",
      fixed: "right",
      render: (_, record) => {
        const handleChange_enable: SwitchChangeEventHandler = async (checked) => {
          const rsl = await reqUpdateRightEnable({
            _id: record._id,
            enable: checked,
          });
          if (rsl.code === 200) {
            message.success(rsl.msg);
            revalidetor.revalidate();
          } else {
            console.log(rsl);
            message.error(rsl.msg);
          }
        };
        return (
          <Switch checked={record.enable} onChange={handleChange_enable} />
        );
      }
    }
  ];

  return (
    <Table dataSource={right._children} columns={columns} rowKey={"_id"} bordered
      expandable={{ childrenColumnName: "_children" }} pagination={false}
      scroll={{ x: "calc(160px + 50%)", y: 600 }}
    />
  )
};

const route: RouteObject = {
  path: "list",
  loader,
  Component
};
export default route;