import { Button, Drawer, Form, Input, Modal, Tooltip, Tree, TreeProps, message } from "antd";
import { LoaderFunctionArgs, RouteObject, useLoaderData, useRevalidator, useSubmit } from "react-router-dom";
import { FormData_Add, FormData_Edit } from "./type";
import { useState } from "react";
import EditableTable from "~/components/table/EditableTable";
import { EditableColumns_EditableTable, Prop_EditableTable } from "~/components/table/EditableTable/type";
import { reqAddRole, reqDeleteRole, reqGetRight, reqGetRoleList, reqGetRoleRights, reqSetRoleRights, reqUpdateRole } from "~/api/user";
import { PartitionOutlined } from "@ant-design/icons";
import { requestListData } from "~/routes/@utils/pagination";
import { usePagination } from "~/routes/@hooks/pagination";
import { submitAfterRecordRemoved } from "~/routes/@utils/pagination";
import { mapTree } from "~/utils/map";
import { APIDataId } from "~/api/type";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const roleListData = await requestListData({ request, api: reqGetRoleList });
  const rsl = await reqGetRight();
  if (rsl.code !== 200) {
    console.log(rsl);
    throw new Response("Not Found", { status: 404 });
  }
  return {
    ...roleListData,
    ...rsl.data,
  };
};
type Return_loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const {
    total,
    roles,
    right,
  } = useLoaderData() as Return_loader;
  const submit = useSubmit();
  const rightTree = mapTree({
    source: {
      fields: ["name", "_id"],
      childrenField: "_children",
      root: right,
    },
    target: {
      fields: ["title", "key"],
      childrenField: "children",
    }
  });

  // add
  const [state_adding, setState_adding] = useState(false);
  const handleClick_addBtn = () => {
    setState_adding(true);
    instance_form.resetFields();
  };
  const [instance_form] = Form.useForm<FormData_Add>();
  const revalidator = useRevalidator();
  const handleOk_add = async () => {
    try {
      const {
        name,
      } = await instance_form.validateFields();

      const rsl = await reqAddRole({ name });
      if (rsl.code === 200) {
        setState_adding(false);
        message.success(rsl.msg);
        revalidator.revalidate();
      } else {
        message.error(rsl.msg);
      }
    } catch (error) {
      message.error("请输入必要的有效数据");
    }
  };
  const handleCancel_add = async () => {
    setState_adding(false);
  };

  // pagination
  const {
    state_currentPage,
    setState_currentPage,
    state_pageSize,
    handleChange_pagination,
  } = usePagination();

  // edit and delete
  type Record = (typeof roles)[number];
  const editableColumns: EditableColumns_EditableTable = [
    {
      title: "id",
      dataIndex: ["_id"],
      cellType: "string",
      editable: false,
    },
    {
      title: "角色名称",
      dataIndex: ["name"],
      cellType: "string",
    },
  ];
  const handleSaveEdit: Prop_EditableTable<Record>["onSaveEdit"] = async (formData: FormData_Edit, record) => {
    const {
      name,
    } = formData;

    const rsl = await reqUpdateRole({
      _id: record._id,
      name,
    });
    if (rsl.code === 200) {
      message.success(rsl.msg);
      submit([
        ["page", state_currentPage],
        ["pageSize", state_pageSize]
      ]);
    } else {
      message.error(rsl.msg);
    }
  };
  const handleDelete: Prop_EditableTable<Record>["onDelete"] = async (record) => {
    const rsl = await reqDeleteRole({ _id: record._id });
    if (rsl.code === 200) {
      message.success(rsl.msg);
      submitAfterRecordRemoved({
        submit,
        recordsLength: roles.length,
        state_currentPage,
        state_pageSize,
        setState_currentPage
      })
    } else {
      message.error(rsl.msg)
    }
  };

  // assign
  const [state_drawerOpen, setState_drawerOpen] = useState(false);
  const [state_assigningRoleId, setState_assigningRoleId] = useState("");
  const [state_checkedKeys, setState_checkedKeys] = useState<string[]>([]);
  const [state_halfCheckedKeys, setState_halfCheckedKeys] = useState<string[]>([]);
  const innerHandleClick_assignBtn = async (roleId: APIDataId) => {
    setState_assigningRoleId(roleId);
    const rsl = await reqGetRoleRights({ _id: roleId });
    if (rsl.code === 200) {
      setState_checkedKeys(rsl.data.rights);
      setState_drawerOpen(true);
    } else {
      console.log(rsl);
      message.error(rsl.msg);
    }
  };
  const produceElement_assignBtn: Prop_EditableTable<Record>["addOperation"] = (disabled, record) => {
    return (
      <Tooltip title="分配权限" color="#FF9900">
        <Button type="dashed" icon={<PartitionOutlined />}
          className="btn-dashed-warning" disabled={disabled}
          onClick={() => innerHandleClick_assignBtn(record._id)}
        />
      </Tooltip>
    );
  };
  const handleClose_assign = () => {
    setState_drawerOpen(false);
    setState_checkedKeys([]);
    setState_assigningRoleId("");
  };
  const handleClick_assign = async () => {
    const rsl = await reqSetRoleRights({
      _id: state_assigningRoleId,
      rightIds: [...state_checkedKeys, ...state_halfCheckedKeys],
    })
    if (rsl.code === 200) {
      message.success("分配权限成功");
      setState_drawerOpen(false);
      setState_checkedKeys([]);
      setState_assigningRoleId("");
    } else {
      console.log(rsl);
      message.error(rsl.msg);
    }
  };
  const handleCheck_rgihtTree: TreeProps["onCheck"] = (keys, info) => {
    if(Array.isArray(keys)) setState_checkedKeys(keys as string[]);
    if(info.halfCheckedKeys) setState_halfCheckedKeys(info.halfCheckedKeys as string[]);
  };

  return (
    <>
      <Button type="primary" onClick={handleClick_addBtn}>添加角色</Button>
      <Modal title="添加角色"
        open={state_adding} maskClosable={false}
        onOk={handleOk_add} onCancel={handleCancel_add}
      >
        <Form form={instance_form}
          labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}
        >
          <Form.Item name={"name"} label="角色名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <EditableTable editableColumns={editableColumns} rowKey="_id"
        addOperation={produceElement_assignBtn}
        tableProp={{
          dataSource: roles,
          pagination: {
            total: total,
            current: state_currentPage,
            pageSize: state_pageSize,
            pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total, range) => `(${range[0]}~${range[1]} of ${total} items)`,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: handleChange_pagination,
          }
        }}
        onSaveEdit={handleSaveEdit} onDelete={handleDelete}
      />
      <Drawer title="分配权限" placement="right" closable={false} width="60%"
        open={state_drawerOpen}
        onClose={handleClose_assign}
      >
        <Tree treeData={rightTree.children} checkable
          checkedKeys={state_checkedKeys}
          onCheck={handleCheck_rgihtTree}
        />
        <div style={{ marginTop: "10px" }}>
          <Button type="primary"
            onClick={handleClick_assign}
          >分配</Button>
          <Button onClick={handleClose_assign}>取消</Button>
        </div>
      </Drawer>
    </>
  )
};

const route: RouteObject = {
  path: "roleList",
  loader,
  Component
};
export default route;