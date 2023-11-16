export const data_quill = {
  /* 
  * Quill modules to attach to editor
  * See https://quilljs.com/docs/modules/ for complete options
  */
  modules: {
    toolbar: [
      [{ "header": ["1", "2", "3", "4", "5"]}, { "font": [] }],
      [{size: []}],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ "color": [] }, { "background": [] }],
      [{"list": "ordered"}, {"list": "bullet"}, 
      {"indent": "-1"}, {"indent": "+1"}],
      ["link", "image", "video"],
      ["clean"]
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  },
  /* 
  * Quill editor formats
  * See https://quilljs.com/docs/formats/
  */
  formats: [
    "header", "font", "size",
    "bold", "italic", "underline", "strike", "blockquote",
    "color", "background",
    "list", "bullet", "indent",
    "link", "image", "video"
  ]
};