import { Button, Form, Popconfirm, Table, message } from "antd";
import { useState } from "react";
import { ComponentType } from "./type";
import { ColumnsType } from "antd/lib/table";
import EditableCell from "./EditableCell";
import { Type_DataIndex, dataIndexToString, defaultValueCull, isEditableColumn_EditableTable__true__ } from "./utils";
import { QuestionCircleOutlined, StopTwoTone } from "@ant-design/icons";

const Component: ComponentType = (prop) => {
  const {
    editableColumns,
    rowKey,
    tableProp,
    editable = true,
    deletable = true,
    editButtonProp,
    deleteButtonProp,
    operationColumn,
    cbIsRoWEditable = () => true,
    onCancelEdit,
    onSaveEdit,
    onDelete,
    addOperation,
  } = prop;

  const [instance_form] = Form.useForm();
  const [state_editingRecordKey, setState_editingRecordKey] = useState<string | number>("");
  const [state_initialFormData, setState_initialFormData] = useState<any>(null);
  const isRowEidting = (record: any) => {
    return state_editingRecordKey === record[rowKey]
      ? true
      : false;
  };
  const innerHandleClick_edit = async (record: any) => {
    setState_editingRecordKey(record[rowKey]);
    instance_form.resetFields();
    if(!state_initialFormData) setState_initialFormData(await instance_form.getFieldsValue(true));
  }
  const innerHandleClick_saveEdit = async (record: any) => {
    try {
      const formData = await instance_form.validateFields();
      defaultValueCull(formData, state_initialFormData);
      if(onSaveEdit) await onSaveEdit(formData, record);

      setState_editingRecordKey("");
      setState_initialFormData(null);
    } catch(err) {
      message.error("请输入必要的有效数据");
    }
  }
  const innerHandleClick_cancleEdit = async (record: any) => {
    const formData = instance_form.getFieldsValue(true);
    defaultValueCull(formData, state_initialFormData);
    if(onCancelEdit) await onCancelEdit(formData, record);

    setState_editingRecordKey("");
    setState_initialFormData(null);
  }
  const innerHandleConfirm_delete = async (record: any) => {
    if(onDelete) await onDelete(record);
  };
  const ifOperationDisable = () => {
    return state_editingRecordKey !== "";
  };
  const column_operation: ColumnsType<any>[number] = {
    title: "操作",
    fixed: "right",
    align: "center",
    ...operationColumn,
    render: (_, record) => {
      const element_editButton = (
        <Button
          type="primary"
          {...editButtonProp}
          disabled={ifOperationDisable()}
          onClick={() => innerHandleClick_edit(record)}
        >eidt</Button>
      );
      const element_deleteButton = (
        <Popconfirm
          title="Are you sure?" icon={<QuestionCircleOutlined style={{color: "red"}}/>}
          onConfirm={() => innerHandleConfirm_delete(record)}
        >
          <Button danger {...deleteButtonProp}
            disabled={ifOperationDisable()}
          >delete</Button>
        </Popconfirm>
      );

      return isRowEidting(record) ? (
        <div>
          <Button type="primary" onClick={() => innerHandleClick_saveEdit(record)}>save</Button>
          <Button onClick={() => innerHandleClick_cancleEdit(record)}>cancle</Button>
        </div>
      ) : (
        <div>
          {cbIsRoWEditable(record)
          ? (editable && deletable
            ? (
              <>
              {element_editButton}
              {element_deleteButton}
              </>
            ) : (editable
              ? element_editButton
              : (deletable
                ? element_deleteButton
                : null)))
          : <StopTwoTone style={{fontSize: "36px"}} twoToneColor={"#ff4d4f"}/>}
          {addOperation ? addOperation(ifOperationDisable(), record) : null}
        </div>
      );
    }
  };
  const columns: ColumnsType<any> = editableColumns.map((editableColumn) => {
    const type = editableColumn.cellType;
    const formName = dataIndexToString(editableColumn.dataIndex as Type_DataIndex);
    // use Type Predicate
    if(isEditableColumn_EditableTable__true__(editableColumn)) {
      switch(type) {
        case "string":
          return {
            ...editableColumn,
            render: (value, record) => ( 
              <EditableCell
                type={type}
                value={value as string}
                rowEidting={isRowEidting(record)}
                editable={true}
                formItemProp={{
                  name: formName
                }}
                columnTitle={editableColumn.title as string}
              />
            )
          };
        case "number":
          return {
            ...editableColumn,
            render: (value, record) => (
              <EditableCell
                type={type}
                value={value as number}
                rowEidting={isRowEidting(record)}
                editable={true}
                formItemProp={{
                  name: formName
                }}
              />
            )
          };
        case "image":
          return {
            ...editableColumn,
            render: (value, record) => (
              <EditableCell
                type={type}
                value={value as string}
                rowEidting={isRowEidting(record)}
                editable={true}
                formItemProp={{
                  name: formName
                }}
                authorization={editableColumn.authorization}
                uploadProp={{
                  name: editableColumn.uploadPropName,
                  action: editableColumn.uploadPropAction
                }}
              />
            )
          };
        case "switch":
          return {
            ...editableColumn,
            render: (value, record) => (
              <EditableCell
                type={type}
                value={value as boolean}
                rowEidting={isRowEidting(record)}
                editable={true}
                formItemProp={{
                  name: formName
                }}
              />
            )
          };
        case "select":
          return {
            ...editableColumn,
            render: (value, record) => (
              <EditableCell
                type={type}
                value={value as string}
                rowEidting={isRowEidting(record)}
                editable={true}
                formItemProp={{
                  name: formName
                }}
                selectOptions={editableColumn.selectOptions}
              />
            )
          };
      }
    } else {
      switch(type) {
        case "string":
          return {
            ...editableColumn,
            render: (value, record) => ( 
              <EditableCell
                type={type}
                value={value as string}
                rowEidting={isRowEidting(record)}
                editable={false}
              />
            )
          };
        case "number":
          return {
            ...editableColumn,
            render: (value, record) => (
              <EditableCell
                type={type}
                value={value as number}
                rowEidting={isRowEidting(record)}
                editable={false}
              />
            )
          };
        case "image":
          return {
            ...editableColumn,
            render: (value, record) => (
              <EditableCell
                type={type}
                value={value as string}
                rowEidting={isRowEidting(record)}
                editable={false}
              />
            )
          };
        case "switch":
          return {
            ...editableColumn,
            render: (value, record) => (
              <EditableCell
                type={type}
                value={value as boolean}
                rowEidting={isRowEidting(record)}
                editable={false}
              />
            )
          };
        case "select":
          return {
            ...editableColumn,
            render: (value, record) => (
              <EditableCell
                type={type}
                value={value as string}
                rowEidting={isRowEidting(record)}
                editable={false}
              />
            )
          };
      }
    }
  });
  if(editable || deletable) columns.push(column_operation);

  return (
    <Form
      form={instance_form}
      component={false}
    >
      <Table
        bordered
        scroll={{x: "calc(540px + 50%)", y: 600}}
        {...tableProp}
        columns={columns}
        rowKey={rowKey}
      />
    </Form>
  );
};

const EditableTable = Component;
export default EditableTable;