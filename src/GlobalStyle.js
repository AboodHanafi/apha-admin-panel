import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

export const CustomizedTextField = styled(TextField)`
  background-color: #fff;
  border-radius: 4px;

  .MuiFilledInput-root {
    background-color: #fff;
    border-radius: 4px;
  }

  .MuiFilledInput-root::before {
    border: 1px solid #e9e7e7;
  }

  .MuiFilledInput-root:after {
    border: 1px solid #e9e7e7;
  }
  .MuiFilledInput-root:hover:not(.Mui-disabled):before {
    border: 1px solid #e9e7e7;
    /* background-color: #e7e0e0; */
  }

  .MuiFilledInput-root:hover {
    background-color: #fff;
    border-radius: 4px;
  }
  .Mui-disabled {
    background-color: #e7e0e0;
    border-radius: 4px;
  }
  .MuiFilledInput-root.Mui-disabled:before {
    border: none;
    background-color: #e7e0e0;
    border-radius: 4px;
  }
  .MuiFilledInput-root.Mui-disabled {
    background-color: #e7e0e0;
    border-radius: 4px;
  }
  .Mui-focused {
    background-color: #fff !important;
  }
`;

export const CustomButton = styled(Button)`
  color: ${(props) => (props.textcolor ? props.textcolor : "#fff")};
  border-radius: 4px;
  padding: 12px 16px;
  min-width: 150px;
  box-shadow: ${(props) => (props.boxshadow ? props.boxshadow : "none")};
  border: ${(props) => (props.border ? props.border : "none")};
  width: ${(props) => (props.width ? props.width : "100%")};
  :hover {
    box-shadow: none;
  }
`;
