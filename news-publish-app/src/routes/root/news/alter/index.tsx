import { Button, Form, PageHeader, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { LoaderFunctionArgs, RouteObject, useLoaderData } from "react-router-dom";
import { reqGetNewsCategories, reqGetOneNews, reqUpdateNews } from "~/api/news";
import NewsEditor from "~/components/NewsEditor";
import NewsForm from "~/components/NewsForm";
import { FormData_News } from "~/components/NewsForm/type";

const loader = async ({ params }: LoaderFunctionArgs) => {
  const rsl_news = await reqGetOneNews({ _id: params.id || "" });
  if (rsl_news.code !== 200) {
    console.log(rsl_news);
    throw new Response("Not Found", { status: 404 });
  }
  const rsl_newsCategory = await reqGetNewsCategories();
  if (rsl_newsCategory.code !== 200) {
    console.log(rsl_newsCategory);
    throw new Response("Not Found", { status: 404 });
  }
  return {
    ...rsl_news.data,
    ...rsl_newsCategory.data
  };
};
type Return_Loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const { news, newsCategories } = useLoaderData() as Return_Loader;
  const selectOptions_newsCategory = newsCategories.map((newsCategorie) => {
    return {
      value: newsCategorie._id,
      label: newsCategorie.name
    };
  });

  // pageHeader
  const handleBack = () => {
    window.history.go(-1);
  };

  // newsForm
  const [instance_form] = Form.useForm<FormData_News>();

  // newsEditor
  const [state_newsContent, setState_newsContent] = useState(news.content);

  // news operations
  const handleClick_save = () => {
    try {
      instance_form.validateFields()
      .then( async (formData) => {
        const rsl = await reqUpdateNews({
          _id: news._id,
          title: formData.title,
          _newsCategory: formData.newsCategory,
          content: state_newsContent,
        });
        if (rsl.code === 200) {
          message.success(rsl.msg);
          window.history.go(-1);
        } else {
          console.log(rsl);
          message.error(rsl.msg);
        }});
    } catch (error) {
      message.error("无效的新闻标题或新闻分类");
    }
  };
  const handleConfirm_cancelSave = () => {
    window.history.go(-1);
  };

  useEffect(() => {
    instance_form.setFieldsValue({ title: news.title, newsCategory: news._newsCategory._id })
  }, []);

  return (
    <>
    <PageHeader title="修改新闻" style={{ padding: "0", marginBottom: "10px" }}
      onBack={handleBack}
    />
    <NewsForm formInstance={instance_form} selectOptions_newsCategory={selectOptions_newsCategory}/>
    <NewsEditor defaultValue={state_newsContent} getContent={setState_newsContent} />
    <div style={{marginTop: "10px"}}>
      <Button type="primary"
        onClick={handleClick_save}
      >保存</Button>
      <Popconfirm title="是否确定取消保存?"
        onConfirm={handleConfirm_cancelSave}
      >
        <Button>取消</Button>
      </Popconfirm>
    </div>
    </>
  )
};

const route: RouteObject = {
  path: "alter/:id",
  loader,
  Component
};
export default route;