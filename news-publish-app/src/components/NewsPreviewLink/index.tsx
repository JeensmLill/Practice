import { useSubmit } from "react-router-dom";
import { NewsPreviewLinkType } from "./type";

const NewsPreviewLink: NewsPreviewLinkType = ({
  newsId,
  newsTitle,
}) => {
  const submit = useSubmit();
  const handleClick_preview = () => {
    submit(null, {action: `/news/preview/${newsId}`})
  };
  return (
    <a onClick={handleClick_preview}>{newsTitle}</a>
  );
}

export default NewsPreviewLink;