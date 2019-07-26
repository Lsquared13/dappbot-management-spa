import * as React from "react";
import { render, mount } from "enzyme";
import Brand from "./Brand";

describe("Brand", () => {
  it("Brand lettermark - blue", () => {
    const base = mount(<Brand type="lettermark" theme="blue" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand lettermark - blue-on-white", () => {
    const base = render(<Brand type="lettermark" theme="blue-on-white" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand lettermark - dark", () => {
    const base = render(<Brand type="lettermark" theme="dark" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand lettermark - dark-on-white", () => {
    const base = render(<Brand type="lettermark" theme="dark-on-white" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand lettermark - white", () => {
    const base = render(<Brand type="lettermark" theme="white" />);
    expect(base).toMatchSnapshot();
  });
  it("Brand lettermark - white-on-blue", () => {
    const base = render(<Brand type="lettermark" theme="white-on-blue" />);
    expect(base).toMatchSnapshot();
  });
  it("Brand lettermark - white-on-dark", () => {
    const base = render(<Brand type="lettermark" theme="white-on-dark" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand token - blue", () => {
    const base = mount(<Brand type="token" theme="blue" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand token - blue-on-white", () => {
    const base = render(<Brand type="token" theme="blue-on-white" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand token - dark", () => {
    const base = render(<Brand type="token" theme="dark" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand token - dark-on-white", () => {
    const base = render(<Brand type="token" theme="dark-on-white" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand token - white", () => {
    const base = render(<Brand type="token" theme="white" />);
    expect(base).toMatchSnapshot();
  });
  it("Brand token - white-on-blue", () => {
    const base = render(<Brand type="token" theme="white-on-blue" />);
    expect(base).toMatchSnapshot();
  });
  it("Brand token - white-on-dark", () => {
    const base = render(<Brand type="token" theme="white-on-dark" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand wordmark - blue", () => {
    const base = mount(<Brand type="wordmark" theme="blue" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand wordmark - blue-on-white", () => {
    const base = render(<Brand type="wordmark" theme="blue-on-white" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand wordmark - dark", () => {
    const base = render(<Brand type="wordmark" theme="dark" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand wordmark - dark-on-white", () => {
    const base = render(<Brand type="wordmark" theme="dark-on-white" />);
    expect(base).toMatchSnapshot();
  });

  it("Brand wordmark - white", () => {
    const base = render(<Brand type="wordmark" theme="white" />);
    expect(base).toMatchSnapshot();
  });
  it("Brand wordmark - white-on-blue", () => {
    const base = render(<Brand type="wordmark" theme="white-on-blue" />);
    expect(base).toMatchSnapshot();
  });
  it("Brand wordmark - white-on-dark", () => {
    const base = render(<Brand type="wordmark" theme="white-on-dark" />);
    expect(base).toMatchSnapshot();
  });
});
