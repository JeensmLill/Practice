import { Form, Input, Select } from "antd";
import { NewsFormType } from "./type";

const NewsForm: NewsFormType = ({
  formInstance,
  selectOptions_newsCategory,
  formProp,
}) => {
  return (
    <Form {...formProp}
      form={formInstance}
    >
      <Form.Item name="title" label="新闻标题"
        rules={[{required: true}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item name="newsCategory" label="新闻分类"
        rules={[{required: true}]}
      >
        <Select options={selectOptions_newsCategory}/>
      </Form.Item>
    </Form>
  );
};

export default NewsForm;