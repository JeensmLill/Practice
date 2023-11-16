import { Button, Form, Input, Modal, message } from "antd";
import { LoaderFunctionArgs, RouteObject, useLoaderData, useRevalidator, useSubmit } from "react-router-dom";
import { FormData_Add, FormData_Edit } from "./type";
import { useState } from "react";
import { reqAddNewsCategory, reqDeleteNewsCategory, reqGetNewsCategoryList, reqUpdateNewsCategory } from "~/api/news";
import EditableTable from "~/components/table/EditableTable";
import { EditableColumns_EditableTable, Prop_EditableTable } from "~/components/table/EditableTable/type";
import { requestListData } from "~/routes/@utils/pagination";
import { usePagination } from "~/routes/@hooks/pagination";
import { submitAfterRecordRemoved } from "~/routes/@utils/pagination";

const loader = async ({request}: LoaderFunctionArgs) => {
  return await requestListData({request, api: reqGetNewsCategoryList});
};
type Return_loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const {
    total,
    newsCategories,
  } = useLoaderData() as Return_loader;
  const submit  = useSubmit();

  // add
  const [state_adding, setState_adding] = useState(false);
  const handleClick_addBtn = () => {
    setState_adding(true);
  };
  const [instance_form] = Form.useForm<FormData_Add>();
  const revalidator = useRevalidator();
  const handleOk_add = async () => {
    try {
      const {
        name,
      } = await instance_form.validateFields();
      
      const rsl = await reqAddNewsCategory({name});
      if(rsl.code === 200) {
        instance_form.resetFields();
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
    instance_form.resetFields();
  };

  // pagination
  const {
    state_currentPage,
    setState_currentPage,
    state_pageSize,
    handleChange_pagination,
  } = usePagination();

  // edit and delete
  type Record = (typeof newsCategories)[number];
  const editableColumns: EditableColumns_EditableTable = [
    {
      title: "id",
      dataIndex: ["_id"],
      cellType: "string",
      editable: false,
    },
    {
      title: "分类名称",
      dataIndex: ["name"],
      cellType: "string",
    },
  ];
  const handleSaveEdit: Prop_EditableTable<Record>["onSaveEdit"] = async (formData: FormData_Edit, record) => {
    const {
      name,
    } = formData;

    const rsl = await reqUpdateNewsCategory({
      _id: record._id,
      name,
    });
    if(rsl.code === 200) {
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
    const rsl = await reqDeleteNewsCategory({_id: record._id});
    if(rsl.code === 200) {
      message.success(rsl.msg);
      submitAfterRecordRemoved({
        submit,
        recordsLength: newsCategories.length,
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
    <Button type="primary" onClick={handleClick_addBtn}>添加新闻分类</Button>
    <Modal title="添加新闻分类"
      open={state_adding} maskClosable={false}
      onOk={handleOk_add} onCancel={handleCancel_add}
    >
      <Form form={instance_form}
        labelCol={{span: 4}} wrapperCol={{span: 20}}
      >
        <Form.Item name={"name"} label="分类名称"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
    <EditableTable editableColumns={editableColumns} rowKey="_id"
      operationColumn={{width: "210px"}}
      tableProp={{
        dataSource: newsCategories,
        pagination: {
          total: total,
          current: state_currentPage,
          pageSize: state_pageSize,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, range) => `(${range[0]}~${range[1]} of ${total} items)`,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: handleChange_pagination,
        },
        scroll: {x: "calc(210px + 50%)"}
      }}
      onSaveEdit={handleSaveEdit} onDelete={handleDelete}
    />
    </>
  )
};

const route: RouteObject = {
  path: "category",
  loader,
  Component
};
export default route;