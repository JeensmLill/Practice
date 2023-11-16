import { Form, Input, InputNumber, Select, Switch, Upload } from "antd";
import { ComponentType } from "./type";
import { LoadingOutlined, PlusOutlined, StopTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { UploadProps, RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { beforeUpload, getBase64, getValueFromEvent_formItem_upload, getValueProps_formItem_upload, mapLabelToValue } from "./utils";

const Componet: ComponentType = (prop) => {
  const {
    type,
    value,
    rowEidting,
  } = prop;
  
  if(prop.editable !== false) {
    /**
     * receive component Props to provide more custom options of components for programer
     * when wrap components
     */
    const {
      formItemProp
    } = prop;

    switch(type) {
      case "string":
        const {
          columnTitle,
        } = prop;

        return rowEidting ? (
          <Form.Item
            rules={[
              {
                required: true,
                message: `${columnTitle}不能为空`
              }
            ]}
            initialValue={value}
            {...formItemProp}
          >
            <Input/>
          </Form.Item>
        ) : value;
      case "number":
        return rowEidting ? (
          <Form.Item
            {...formItemProp}
          >
            <InputNumber defaultValue={value}/>
          </Form.Item>
        ) : value;
      case "image":
        const {
          authorization,
          uploadProp,
          imgStyle
        } = prop;
  
        const [state_loading, setState_loading] = useState(false);
        const [state_imgUrl, setState_imgUrl] = useState(value);
        const handleChange_upload: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
          switch(info.file.status) {
            case "uploading":
              setState_loading(true);
              return;
            case "done":
              getBase64(info.file.originFileObj as RcFile, (url) => {
                setState_loading(false);
                setState_imgUrl(url);
              });
          }
        };
        const produceElement_img = (src: string) => {
          return (
            <img
              style={imgStyle ? imgStyle : {width: "80px", height: "80px"}}
              src={src}
            />
          );
        };
        const element_uploadChildren = state_imgUrl ? (
          produceElement_img(state_imgUrl)
        ) : (
          <div>
            {state_loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        useEffect(() => {
          if(!rowEidting) {
            // reset state_imgUrl when non-editing
            setState_imgUrl(value);
          }
        }, [rowEidting]);

        return rowEidting ? (
          <Form.Item
            getValueProps={getValueProps_formItem_upload}
            getValueFromEvent={getValueFromEvent_formItem_upload}
            {...formItemProp}
          >
            <Upload
              accept="image/*"
              headers={{
                authorization: authorization ? authorization : ""
              }}
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange_upload}
              {...uploadProp}
            >
              {element_uploadChildren}
            </Upload>
          </Form.Item>
        ) : produceElement_img(value);
      case "switch":
        return rowEidting ? (
          <Form.Item
            valuePropName={"checked"}
            initialValue={value}
            {...formItemProp}
          >
            <Switch/>
          </Form.Item>
        ) : (
          <Switch checked={value} disabled={true}/>
        );
      case "select":
        const {
          selectOptions
        } = prop;
        const value_select = mapLabelToValue(value, selectOptions);

        return rowEidting ? (
          <Form.Item
            {...formItemProp}
          >
            <Select options={selectOptions} defaultValue={value_select}/>
          </Form.Item>
        ) : value;
    }
  } else {
    if(rowEidting) {
      return (<StopTwoTone style={{fontSize: "18px"}} twoToneColor={"#ff4d4f"}/>);
    } else {
      switch(type) {
        case "image":
          const {
            imgStyle
          } = prop;

          return (
            <img
              src={value}
              style={imgStyle ? imgStyle : {width: "80px", height: "80px"}}
            />
          );
        case "switch":
          return (
            <Switch defaultChecked={value} disabled={true}/>
          );
        default:
          return value;
      }
    }
  }
};

const EidtableTableCell = Componet;
export default EidtableTableCell;