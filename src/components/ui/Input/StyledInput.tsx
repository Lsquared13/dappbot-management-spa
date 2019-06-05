import styled from "styled-components";
export const StyledInput = styled.input`
  &form div {
  margin-bottom: 1em;
}

/* For Firefox */
&input[type="number"] {
  -moz-appearance: textfield;
}

/* Webkit browsers like Safari and Chrome */
&input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

&::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #9aa2af;
}

&::-moz-placeholder {
  /* Firefox 19+ */
  color: #9aa2af;
}

&:-ms-input-placeholder {
  /* IE 10+ */
  color: #9aa2af;
}

&:-moz-placeholder {
  /* Firefox 18- */
  color: #9aa2af;
}

&input {
  overflow: visible;
}

&input,
optgroup,
select,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

&.input-group {
  display: table;
  border-collapse: separate;
  position: relative;
  width: 100%;
}

&.input-group .form-control,
.input-group-addon,
.input-group-btn {
  display: table-cell;
}

&.input-group .form-control {
  position: relative;
  z-index: 2;
  float: left;
  width: 100%;
  margin-bottom: 0;
  border-radius: 4px !important;
  padding-right: 65px;
}

&.input-group .input-group-addon {
  position: absolute;
  padding: 0;
  border: 0;
  border-radius: 0;
  right: 15px;
  top: 12px;
  width: auto;
  white-space: inherit;
  background-color: transparent;
  display: inline;
  color: #9aa2af;
  font-size: 16px;
  z-index: 9;
  font-family: "DINRoundPro", sans-serif;
}

&.form-control {
  display: block;
  width: 100%;
  padding: 8px 15px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: none;
  border: 1px solid #e0e3e8;
  height: 43px;
  color: #2b333f;
  font-size: 13px;
  font-family: "DINRoundPro", sans-serif;
}

&.form-control:focus {
  border-color: #b7bec6;
  outline: 0;
  color: #2b333f;
  box-shadow: none;
}

&.form-control[disabled],
.form-control[readonly],
fieldset[disabled] .form-control {
  background: #f7f8f9;
  border: 1px solid #e0e3e8;
  cursor: not-allowed;
}

&.has-error .form-control {
  border-color: #cc4149;
  box-shadow: none;
  -webkit-box-shadow: none;
}

&.has-error .form-control:focus {
  border-color: #cc4149;
  box-shadow: none;
  -webkit-box-shadow: none;
}

&.has-error .input-group-addon {
  background-color: transparent;
  border: 0;
  color: #cc4149;
}

&.has-error .input-error-block {
  color: #cc4149;
  font-family: "DINRoundPro", sans-serif;
  font-size: 13px;
  display: inline-block;
  margin: 8px 0 0;
}

&.has-success .input-error-block {
  color: #34b47e;
  font-family: "DINRoundPro", sans-serif;
  font-size: 13px;
  display: inline-block;
  margin: 8px 0 0;
}

&.has-success .form-control {
  border-color: #34b47e;
  box-shadow: none;
  -webkit-box-shadow: none;
}

&.has-success .form-control:focus {
  border-color: #34b47e;
  box-shadow: none;
  -webkit-box-shadow: none;
}

&.has-success .input-group-addon {
  background-color: transparent;
  border: 0;
  color: #34b47e;
}

&.has-warning .input-error-block {
  color: #f6be7d;
  font-family: "DINRoundPro", sans-serif;
  font-size: 13px;
  display: inline-block;
  margin: 8px 0 0;
}

&.has-warning .form-control {
  border-color: #f6be7d;
  box-shadow: none;
  -webkit-box-shadow: none;
}

&.has-warning .form-control:focus {
  border-color: #f6be7d;
  box-shadow: none;
  -webkit-box-shadow: none;
}

&.has-warning .input-group-addon {
  background-color: transparent;
  border: 0;
  color: #f6be7d;
}

&.has-idle .input-error-block {
  color: #2b333f;
  font-family: "DINRoundPro", sans-serif;
  font-size: 13px;
  display: inline-block;
  margin: 8px 0 0;
}

&.select_wrap select::-ms-expand {
  display: none;
}

&.select_wrap select {
  -webkit-appearance: none;
  appearance: none;
}

&.select_wrap {
  position: relative;
}

&.select_wrap:after {
  font: normal normal normal 14px/1 FontAwesome;
  position: absolute;
  content: "\F0D7";
  left: auto;
  right: 15px;
  top: 13px;
  font-size: 18px;
  color: #626b76;
}

`;

export const StyledErrorMessage = styled.span`
  &.textField &.errorMsg {
    color: red;
    font-weight: 200 !important;
    font-size: 0.5rem !important;
  }

  &.hide {
    display: hidden;
  }
`
export default StyledInput;
