import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { darktheme } from "./theme";


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
        <ThemeProvider theme={darktheme}>
          <App />
        </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);