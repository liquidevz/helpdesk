import { jsx } from "react/jsx-runtime";
import { V as createSvgIcon } from "../server-entry.mjs";
const InboxIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-3h3.56c.69 1.19 1.97 2 3.45 2s2.75-.81 3.45-2H19v3zm0-5h-4.99c0 1.1-.9 2-2 2s-2-.9-2-2H5V5h14v9z" }),
  "InboxOutlined"
);
const FolderIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "m9.17 6 2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" }),
  "FolderOutlined"
);
const KeyboardArrowUpIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z" }),
  "KeyboardArrowUpOutlined"
);
const EmailIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" }),
  "EmailOutlined"
);
const CommentIcon = createSvgIcon(
  /* @__PURE__ */ jsx("path", { d: "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM20 4v13.17L18.83 16H4V4h16zM6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z" }),
  "CommentOutlined"
);
export {
  CommentIcon as C,
  EmailIcon as E,
  FolderIcon as F,
  InboxIcon as I,
  KeyboardArrowUpIcon as K
};
//# sourceMappingURL=Comment-81d85792.mjs.map
