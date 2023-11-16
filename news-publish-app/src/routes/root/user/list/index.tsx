import { LoaderFunctionArgs, RouteObject, useLoaderData, useRevalidator, useSubmit } from "react-router-dom";
import { FormData_Add, FormData_Edit } from "./type";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { reqAddUser, reqDeleteUser, reqGetUserList, reqUpdateUser } from "~/api/user";
import { imageUrl } from "~/utils/url";
import { produceAuthorization } from "~/utils/request";
import { FileField_Upload } from "~/api/upload";
import { EditableColumns_EditableTable, Prop_EditableTable } from "~/components/table/EditableTable/type";
import EditableTable from "~/components/table/EditableTable";
import { useState } from "react";
import { beforeUpload, getBase64, getValueFromEvent_formItem_upload, getValueProps_formItem_upload } from "~/components/@utils/FormItem/upload";
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { revokeUploadAvatar } from "./utils";
import { action_uploadAvatar } from "./data";
import { requestListData } from "~/routes/@utils/pagination";
import { usePagination } from "~/routes/@hooks/pagination";
import { submitAfterRecordRemoved } from "~/routes/@utils/pagination";

const loader = async ({request}: LoaderFunctionArgs) => {
  return await requestListData({request, api: reqGetUserList});
};
type Return_loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const {
    total,
    users,
    roles,
    areas
  } = useLoaderData() as Return_loader;
  const submit  = useSubmit();

  const selectOptions_role = roles.map((role) => {
    return {
      value: role._id,
      label: role.name
    };
  });
  const selectOptions_area = areas.map((area) => {
    return {
      value: area._id,
      label: area.name
    };
  });
  const dataSource = users.map((user) => {
    const avatar = imageUrl(user.avatar);
    return {
      ...user,
      avatar
    };
  });

  // add
  const [state_adding, setState_adding] = useState(false);
  const handleClick_addUserBtn = () => {
    setState_adding(true);
    instance_form.resetFields();
  };

  const [instance_form] = Form.useForm<FormData_Add>();
  const [state_uploadLoading, setState_uploadLoading] = useState(false);
  const [state_uploadImg, setState_uploadImg] = useState("");
  const element_uploadChildren = state_uploadImg ? (
    <img
      style={{width: "80px", height: "80px"}}
      src={state_uploadImg}
    />
  ) : (
    <div>
      {state_uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange_upload: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    switch(info.file.status) {
      case "uploading":
        setState_uploadLoading(true);
        return;
      case "done":
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setState_uploadLoading(false);
          setState_uploadImg(url);
        });
    }
  };

  const [state_confirmLoading_add, setState_confirmLoading_add] = useState(false);
  const revalidator = useRevalidator();
  const handleOk_add = async () => {
    try {
      setState_confirmLoading_add(true);
      const {
        username,
        password,
        _area,
        _role,
        avatar,
      } = await instance_form.validateFields();
      
      revokeUploadAvatar(avatar);
      const rsl = await reqAddUser({
        username,
        password,
        _area,
        _role,
        avatar: avatar?.file.response?.data.imgUrl,
      });
      if(rsl.code === 200) {
        setState_confirmLoading_add(false);
        setState_uploadImg("");
        setState_adding(false);
        message.success(rsl.msg);
        revalidator.revalidate();
      } else {
        setState_confirmLoading_add(false);
        message.error(rsl.msg);
      }
    } catch (error) {
      message.error("请输入必要的有效数据");
    }
  };
  const handleCancel_add = async () => {
    setState_adding(false);
    const {avatar} = (await instance_form.getFieldsValue(true)) as Pick<FormData_Add, "avatar">;
    revokeUploadAvatar(avatar);
    setState_uploadImg("");
  };

  // pagination
  const {
    state_currentPage,
    setState_currentPage,
    state_pageSize,
    handleChange_pagination,
  } = usePagination();

  // edit and delete
  type Record = (typeof dataSource)[number];
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
      uploadPropName: FileField_Upload.IMAGE,
      uploadPropAction: action_uploadAvatar,
    },
    {
      title: "用户状态",
      dataIndex: ["enable"],
      cellType: "switch",
    },
  ];
  const handleSaveEdit: Prop_EditableTable<Record>["onSaveEdit"] = async (formData: FormData_Edit, record) => {
    const {
      username,
      password,
      _area_name,
      _role_name,
      avatar,
      enable
    } = formData;

    revokeUploadAvatar(avatar);
    const rsl = await reqUpdateUser({
      _id: record._id,
      username,
      password,
      _area: _area_name,
      _role: _role_name,
      avatar: avatar?.file.response?.data.imgUrl,
      enable
    });
    if(rsl.code === 200) {
      message.success(rsl.msg);
      submit([
        ["page", state_currentPage],
        ["pageSize", state_pageSize]
      ]);
    } else {
      console.log("rsl",rsl);
      message.error(rsl.msg);
    }
  };
  const handleCancelEdit: Prop_EditableTable<Record>["onCancelEdit"] = async (formData) => {
    const {avatar} = (await formData) as Pick<FormData_Edit, "avatar">;
    revokeUploadAvatar(avatar);
  };
  const handleDelete: Prop_EditableTable<Record>["onDelete"] = async (record) => {
    const rsl = await reqDeleteUser({_id: record._id});
    if(rsl.code === 200) {
      message.success(rsl.msg);
      submitAfterRecordRemoved({
        submit,
        recordsLength: users.length,
        state_currentPage,
        state_pageSize,
        setState_currentPage
      })
    } else {
      message.error(rsl.msg)
    }
  };

  return (
    <>
    <Button type="primary" onClick={handleClick_addUserBtn}>添加用户</Button>
    <Modal title="添加用户"
      open={state_adding} confirmLoading={state_confirmLoading_add} maskClosable={false}
      onOk={handleOk_add} onCancel={handleCancel_add}
    >
      <Form
        form={instance_form}
        labelCol={{span: 4}} wrapperCol={{span: 20}}
      >
        <Form.Item name={"username"} label="用户名称"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name={"password"} label="用户密码"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name={"_area"} label="区域" rules={[{required: true}]}>
          <Select options={selectOptions_area}/>
        </Form.Item>
        <Form.Item name={"_role"} label="角色" rules={[{required: true}]}>
          <Select options={selectOptions_role}/>
        </Form.Item>
        <Form.Item name={"avatar"} label="上传头像"
          getValueProps={getValueProps_formItem_upload}
          getValueFromEvent={getValueFromEvent_formItem_upload}
        >
          <Upload
            accept="image/*" listType="picture-card" showUploadList={false}
            name={FileField_Upload.IMAGE} headers={{authorization: produceAuthorization()}} action={action_uploadAvatar}
            beforeUpload={beforeUpload} onChange={handleChange_upload}
          >
            {element_uploadChildren}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
    <EditableTable editableColumns={editableColumns} rowKey="_id"
      tableProp={{
        dataSource: dataSource,
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
      cbIsRoWEditable={(record) => {
        return record.default ? false : true;
      }}
      onSaveEdit={handleSaveEdit} onCancelEdit={handleCancelEdit} onDelete={handleDelete}
    />
    </>
  );
};

const route: RouteObject = {
  path: "list",
  loader,
  Component
};
export default route;