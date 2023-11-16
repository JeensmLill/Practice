import { Button, Form, Result, Steps, StepsProps, message } from "antd";
import { useContext, useState } from "react";
import { LoaderFunctionArgs, RouteObject, useLoaderData, useSubmit } from "react-router-dom";
import { reqAddNews, reqGetNewsCategories } from "~/api/news";
import 'react-quill/dist/quill.snow.css';
import NewsEditor from "~/components/NewsEditor";
import NewsPreview from "~/components/NewsPreview";
import { Context_Root } from "../..";
import { AuditOutlined, InboxOutlined } from "@ant-design/icons";
import { mapFieldInData } from "~/utils/map";
import { stroeSelector_account } from "~/store";
import { FormData_News } from "~/components/NewsForm/type";
import NewsForm from "~/components/NewsForm";
import { map_routeToKey_menu } from "../../data";

/*
 * [1] use Regular to judge HTML string is not invalid
 * [2] use React Ref + React Context to reset scrollbar
 */
const loader = async ({}: LoaderFunctionArgs) => {
  const rsl = await reqGetNewsCategories();
  if(rsl.code !== 200) {
    console.log(rsl);
    throw new Response("Not Found", {status: 404});
  }
  return rsl.data;
};
type Return_loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const {newsCategories} = useLoaderData() as Return_loader;
  const selectOptions_newsCategory = newsCategories.map((newsCategorie) => {
    return {
      value: newsCategorie._id,
      label: newsCategorie.name
    };
  });
  const items_steps: StepsProps["items"] = [
    {
      title: "基本信息",
      description: "新闻标题，新闻分类",
    },
    {
      title: "撰写内容",
      description: "新闻主体内容",
    },
    {
      title: "保存提交",
      description: "保存草稿或提交审核",
    },
  ];
  const submit = useSubmit();

  // steps
  const [state_currentStep, setState_currentStep] = useState(0);
  const [instance_form] = Form.useForm<FormData_News>();
  const [state_formData, setState_formData] = useState<FormData_News>({title: "", newsCategory: ""});
  const [state_newsContent, setState_newsContent] = useState("");
  const context = useContext(Context_Root);
  const [state_stepsEnd, setState_stepsEnd] = useState(false);
  const [state_submitDraft, setState_submitDraft] = useState(true);
  const produceElement_stepContent = () => {
    switch(state_currentStep) {
      case 0:
        return (
          <NewsForm formInstance={instance_form}
            selectOptions_newsCategory={selectOptions_newsCategory}
            formProp={{
              labelCol: {span: 4},
              wrapperCol: {span: 18},
            }}
          />
        );
      case 1:
        // [2] reset scrollbar
        context?.ref_card.current.scrollTo(0, 0);
        return (
          <NewsEditor
            defaultValue={state_newsContent}
            getContent={setState_newsContent}
          />
        );
      case 2:
        // [2] reset scrollbar
        context?.ref_card.current.scrollTo(0, 0);
        return (
          <NewsPreview title={state_formData.title}
            category={mapFieldInData({
              field_a: "value",
              field_b: "label",
              value_a: state_formData.newsCategory,
              data: selectOptions_newsCategory,
            })}
            author={stroeSelector_account().username || ""} content={state_newsContent}
          />
        );
    }
  };
  const produceElement_stepBtn = () => {
    let element_nextBtn: React.ReactNode = null;
    if(state_currentStep < items_steps.length -1) {
      const handleClick_nextStep = async () => {
        switch(state_currentStep) {
          case 0:
            instance_form.validateFields()
            .then((val) => {
              setState_formData(val);
              setState_currentStep(state_currentStep + 1);
            })
            .catch(() => {
              message.error("无效的新闻标题或新闻分类");
            });
            return;
          case 1:
            // [1] use Regular to judge HTML string is not invalid
            const content = state_newsContent.match(/(?<=>)(\s*[^><\s]+\s*)+(?=<)/);
            if(content) {
              setState_currentStep(state_currentStep + 1);
            } else {
              message.error("新闻内容不能为空");
            }
            return;
        }
      };
      element_nextBtn = (
        <Button
          type="primary"
          style={{margin: "0 3px 0 0"}}
          onClick={handleClick_nextStep}
        >Next</Button>
      );
    } else {
      const innerHandleClick_submit = async (submitDraft: boolean = true) => {
        setState_submitDraft(submitDraft);
        const rsl = await reqAddNews({
          title: state_formData.title,
          _newsCategory: state_formData.newsCategory,
          _user: stroeSelector_account()._id,
          content: state_newsContent,
          auditState: submitDraft ? 0 : 1,
        });
        if(rsl.code === 200) {
          setState_stepsEnd(true);
        } else {
          console.log(rsl);
          message.error(rsl.msg);
        }
      };
      element_nextBtn = (
        <>
        <Button
          type="primary" icon={<InboxOutlined />}
          onClick={() => innerHandleClick_submit()}
        >Submit as Draft</Button>
        <Button
          type="primary" icon={<AuditOutlined />}
          className="btn-primary-warning"
          style={{margin: "0 3px 0 0"}}
          onClick={() => innerHandleClick_submit(false)}
        >Submit to Audit</Button>
        </>
      );
    }

    let element_previousBtn: React.ReactNode = null;
    if(state_currentStep > 0) {
      const handleClick_previousStep = () => {
        setState_currentStep(state_currentStep - 1);
      };
      element_previousBtn = (
        <Button
          style={{margin: "0 3px 0 0"}}
          onClick={handleClick_previousStep}
        >Previous</Button>
      );
    }

    return (
      <>
      {element_nextBtn}
      {element_previousBtn}
      </>
    );
  };
  const produceElement_content = () => {
    const handleClick_continue = () => {
      setState_currentStep(0);
      setState_stepsEnd(false);
      setState_newsContent("");
      instance_form.resetFields();
    };
    const innerHandleClick_navigate = (action: string) => {
      context?.setState_selectedKey_menu(map_routeToKey_menu.get(action) || "");
      submit(null, {action});
    };
    const element_resultBtn = (
      <>
      <Button type="primary"
        onClick={handleClick_continue}
      >继续撰写新闻</Button>
      <Button onClick={() => state_submitDraft ? innerHandleClick_navigate("/news/draftList") : innerHandleClick_navigate("/audit/list")}>
        {state_submitDraft ? "查看草稿箱" : "查看审核列表"}
      </Button>
      </>
    );

    return !state_stepsEnd ? (
      <>
      <div style={{
        minHeight: "200px",
        marginTop: "16px",
        padding: "36px 10px 10px 10px",
        backgroundColor: "#fafafa",
        border: "1px dashed #e9e9e9",
        borderRadius: "2px",
      }}>
        {produceElement_stepContent()}
      </div>
      <div style={{marginTop: "24px"}}>
        {produceElement_stepBtn()}
      </div>
      </>
    ) : (
      <Result status={"success"}
        title={"添加新闻成功"}
        subTitle={state_submitDraft ? "新的新闻已被添加到草稿箱中" : "新的新闻已被提交审核"}
        extra={element_resultBtn}
      />
    );
  }
  
  return (
    <>
    <Steps items={items_steps} current={state_currentStep}/>
    {produceElement_content()}
    </>
  )
};

const route: RouteObject = {
  path: "write",
  loader,
  Component
};
export default route;