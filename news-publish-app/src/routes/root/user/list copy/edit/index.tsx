import style from "./index.module.scss";
import { Button, Card, message } from "antd";
import { ActionFunction, LoaderFunction, RouteObject, useLoaderData, useSubmit } from "react-router-dom";
import { reqGetUserList } from "~/api/user";
import { ColumnRecord, Form_Edit, LoaderData } from "./type";
import { imageUrl } from "~/utils/url";
import { useContext} from "react";
import { Context_UserList } from "..";
import { API_Upload } from "~/api/upload";
import { produceAuthorization, produceRequestUrl } from "~/utils/request";
import EditableTable from "~/components/table/EidtableTable";
import { EditableColumns_EditableTable } from "~/components/table/EidtableTable/type";

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
  const editableColumns: EditableColumns_EditableTable = [
    {
      title: "区域",
      dataIndex: ["_area", "name"],
      cellType: "select",
      selectOptions: selectOptions_area ? selectOptions_area : []
    },
    {
      title: "角色名称",
      dataIndex: ["_role", "name"],
      cellType: "select",
      selectOptions: selectOptions_role ? selectOptions_role : []
    },
    {
      title: "用户名称",
      dataIndex: ["username"],
      cellType: "string",
    },
    {
      title: "用户头像",
      dataIndex: ["avatar"],
      cellType: "image",
      authorization: produceAuthorization(),
      uploadPropName: "image",
      uploadPropAction: produceRequestUrl(API_Upload.UPLOAD_IMAGE_USER_AVATAR),
    },
    {
      title: "用户名称",
      dataIndex: ["enable"],
      cellType: "switch",
    },
  ];

  return (
    <Card style={{width: "100%", height: "100%", overflowY: "scroll"}}>
      <Button type="primary" onClick={handleClick_addUserBtn}>添加用户</Button>
      <EditableTable
        editableColumns={editableColumns}
        rowKey="_id"
        tableProp={{
          dataSource: dataSource_table,
        }}
        cbIsRoWEditable={(record) => {
          return record.default ? false : true;
        }}
      />
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