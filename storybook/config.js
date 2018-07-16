import { configure, addDecorator } from "@storybook/react";

import "antd/dist/antd.css";

import "./addons-config";

const req = require.context("../src", true, /\.story\.tsx$/);

configure(() => {
  req.keys().forEach(req);
}, module);
