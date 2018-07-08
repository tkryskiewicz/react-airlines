import { shallow } from "enzyme";
import * as React from "react";
import { MemoryRouter, Route } from "react-router";

import { App } from "./App";

describe("App", () => {
  it("should render", () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Route component={App} />
      </MemoryRouter>,
    );

    expect(wrapper).toBeDefined();
  });
});
