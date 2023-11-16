import style from "./index.module.scss";
import { Button, Card, Form, Table, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ActionFunction, LoaderFunction, RouteObject, useLoaderData, useSubmit } from "react-router-dom";
import { reqGetUserList } from "~/api/user";
import { ColumnRecord, Form_Edit, LoaderData } from "./type";
import { imageUrl } from "~/utils/url";
import EidtableTableCell from "~/components/table/EidtableTable/EidtableTableCell";
import { useContext, useState } from "react";
import { Context_UserList } from "..";
import { API_Upload } from "~/api/upload";
import { produceAuthorization, produceRequestUrl } from "~/utils/request";

const loader: LoaderFunction = async ({params}) => {
  const {page = "1", limit = "10"} = params;
  if(page && limit) {
    const rsl = await reqGetUserList({page, limit});
    if(rsl.code === 200) {
      return rsl.data;
    } else {
      message.error(rsl.msg);
    }
  }
  return null;
};
const action: ActionFunction = async () => {
  return null;
};
const Component = () => {
  const contextState_userList = useContext(Context_UserList);
  const selectOptions_role = contextState_userList?.roles?.map((role) => {
    return {
      value: role._id,
      label: role.name
    };
  });
  const selectOptions_area = contextState_userList?.areas?.map((area) => {
    return {
      value: area._id,
      label: area.name
    };
  });

  const submit = useSubmit();
  const handleClick_addUserBtn = () => {
    submit(null, {action: "../add"});
  }

  const loaderData = useLoaderData() as LoaderData;
  const dataSource_table = loaderData.users.map((user) => {
    const avatar = imageUrl(user.avatar);
    return {
      ...user,
      avatar
    };
  });
  const [vnInstance_form] = Form.useForm();
  const [state_editingRecordId, setState_editingRecordId] = useState("");
  const isColumnEidting = (record: ColumnRecord) => {
    return state_editingRecordId === record._id
      ? true
      : false;
  }
  const innerHandleClick_edit = (record: ColumnRecord) => {
    setState_editingRecordId(record._id);
  }
  const handleClick_cancleEdit = () => {
    setState_editingRecordId("");
  }
  const innerHandleClick_saveEdit = async (record: ColumnRecord) => {
    try {
      const formData = (await vnInstance_form.validateFields()) as Form_Edit;
      console.log("formData",formData);
    } catch(err) {
      message.error("保存失败");
    }
    setState_editingRecordId("");
  }
  const innerHandleClick_delete = async (record: ColumnRecord) => {};
  const columns: ColumnsType<ColumnRecord> = [
    {
      title: "区域",
      dataIndex: ["_area", "name"],
      render: (text: string, record: ColumnRecord) => {
        return (
          <EidtableTableCell
            type="select"
            content={text}
            rowEidting={isColumnEidting(record)}
            formItemProp={{
              name: "_area"
            }}
            selectOptions={selectOptions_area ? selectOptions_area : []}
          />
        );
      }
    },
    {
      title: "角色名称",
      dataIndex: ["_role", "name"],
      render: (text: string, record: ColumnRecord) => {
        return (
          <EidtableTableCell
            type="select"
            content={text}
            rowEidting={isColumnEidting(record)}
            formItemProp={{
              name: "_role"
            }}
            selectOptions={selectOptions_role ? selectOptions_role : []}
          />
        );
      }
    },
    {
      title: "用户名称",
      dataIndex: ["username"],
      render: (text: string, record: ColumnRecord) => {
        return (
          <EidtableTableCell
            type="string"
            content={text}
            rowEidting={isColumnEidting(record)}
            formItemProp={{
              name: "username"
            }}
            columnTitle="用户名称"
          />
        );
      }
    },
    {
      title: "用户头像",
      dataIndex: ["avatar"],
      render: (text: string, record: ColumnRecord) => {
        return (
          <EidtableTableCell
            type="image"
            content={text}
            rowEidting={isColumnEidting(record)}
            formItemProp={{
              name: "avatar"
            }}
            authorization={produceAuthorization()}
            uploadProp={{
              name: "image",
              action: produceRequestUrl(API_Upload.UPLOAD_IMAGE_USER_AVATAR),
            }}
          />
        );
      }
    },
    {
      title: "用户状态",
      dataIndex: ["enable"],
      render: (text: boolean, record: ColumnRecord) => {
        return (
          <EidtableTableCell
            type="switch"
            content={text}
            rowEidting={isColumnEidting(record)}
            formItemProp={{
              name: "enable"
            }}
          />
        );
      }
    },
    {
      title: "操作",
      // key: "operation",
      render: (_, record: ColumnRecord) => {
        return isColumnEidting(record) ? (
          <div>
            <div onClick={() => innerHandleClick_saveEdit(record)}>save</div>
            <div onClick={handleClick_cancleEdit}>cancle</div>
          </div>
        ) : (
          <div>
            <button disabled={state_editingRecordId !== ""} onClick={() => innerHandleClick_edit(record)}>eidt</button>
            <button disabled={state_editingRecordId !== ""} onClick={() => innerHandleClick_delete(record)}>delete</button>
          </div>
        );
      }
    },
  ];
  return (
    <Card>
      <Button type="primary" onClick={handleClick_addUserBtn}>添加用户</Button>
      <Form form={vnInstance_form} component={false}>
        <Table
          dataSource={dataSource_table}
          rowKey={"_id"}
          columns={columns}
          bordered
          pagination={{current: 1, pageSize: 10, total: loaderData.total}}
        />
      </Form>
    </Card>
  );
};

const route: RouteObject = {
  path: "edit",
  loader,
  action,
  Component,
};
export default route;