import * as Enzyme from "enzyme";
import * as ReactAdapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new ReactAdapter(),
});
