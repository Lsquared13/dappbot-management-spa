import * as React from "react";
import { render, shallow } from "enzyme";
import Checkbox from "./Checkbox";
import { StyledCheckboxInput } from "./StyledCheckbox";

test("Checkbox", () => {
  const tree = render(<Checkbox id="id" onChange={() => {}} />);
  expect(tree).toMatchSnapshot();
});

test("Checkbox checked", () => {
  const tree = render(<Checkbox id="id" onChange={() => {}} checked />);
  expect(tree).toMatchSnapshot();
});

test("Checkbox indeterminate", () => {
  const tree = render(<Checkbox id="id" onChange={() => {}} indeterminate />);
  expect(tree).toMatchSnapshot();
});

test("Checkbox small", () => {
  const tree = render(<Checkbox size="sm" id="id" onChange={() => {}} />);
  expect(tree).toMatchSnapshot();
});

test("Checkbox disabled", () => {
  const tree = render(
    <Checkbox disabled size="sm" id="id" onChange={() => {}} />
  );
  expect(tree).toMatchSnapshot();
});

test("Checkbox disabled & checked", () => {
  const tree = render(
    <Checkbox disabled checked size="sm" id="id" onChange={() => {}} />
  );
  expect(tree).toMatchSnapshot();
});

test("Checkbox with error", () => {
  const tree = render(
    <Checkbox hasError size="sm" id="id" onChange={() => {}} />
  );
  expect(tree).toMatchSnapshot();
});

test("Checkbox handles click", () => {
  const mockOnClick = jest.fn();
  const wrapper = shallow(
    <Checkbox size="sm" id="id" onChange={() => {}} onClick={mockOnClick} />
  );
  wrapper
    .find(StyledCheckboxInput)
    .simulate("click", { currentTarget: { checked: true } });
  expect(mockOnClick).toHaveBeenCalledWith({
    event: { currentTarget: { checked: true } },
    checked: true
  });
});
