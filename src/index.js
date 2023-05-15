import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import App from "./App";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

// (async () => {
//     const sdk = await new AppExtensionsSDK().initialize({ size: { height: 700, width: 800 } });
// })();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);
