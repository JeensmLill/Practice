import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { data_quill } from "./data";
import { useState } from 'react';
import { NewsEditorType } from './type';

const NewsEditor: NewsEditorType = ({defaultValue, getContent}) => {
  const [state_quillValue, setState_quillValue] = useState(defaultValue || "");
  
  return (
    <div onBlur={() => {
      if(getContent) getContent(state_quillValue);
    }}>
      <ReactQuill theme="snow"
        modules={data_quill.modules} formats={data_quill.formats}
        value={state_quillValue} onChange={setState_quillValue}
      />
    </div>
  );
};

export default NewsEditor; 