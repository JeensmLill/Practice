import { PageHeader } from "antd";
import { LoaderFunctionArgs, RouteObject, useLoaderData } from "react-router-dom";
import { reqGetOneNews } from "~/api/news";
import NewsPreview from "~/components/NewsPreview";

const loader = async ({ params }: LoaderFunctionArgs) => {
  const rsl = await reqGetOneNews({ _id: params.id || "" });
  if (rsl.code !== 200) {
    console.log(rsl);
    throw new Response("Not Found", { status: 404 });
  }
  return rsl.data;
};
type Return_Loader = Awaited<ReturnType<typeof loader>>;
const Component = () => {
  // data
  const {news} = useLoaderData() as Return_Loader;

  const handleBack = () => {
    window.history.go(-1);
  };

  return (
    <>
    <PageHeader title="预览新闻" style={{padding: "0", marginBottom: "10px"}}
      onBack={handleBack}
    />
    <NewsPreview news={news}/>
    </>
  )
};

const route: RouteObject = {
  path: "preview/:id",
  loader,
  Component
};
export default route;