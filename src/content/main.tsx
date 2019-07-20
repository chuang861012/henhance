import * as React from "React";
import ReactDOM from "react-dom";

import App from "./components/app";
import { addLoader } from "./utils";

import { init } from './init';

chrome.storage.sync.get(
    null,
    async ({ run }) => {
        if (run) {
            addLoader();
            // append modal
            const modal = document.createElement("div");
            document.body.prepend(modal);
            const gdata = await init();

            ReactDOM.render(<App gdata={gdata} />, modal);
        }
    }
);
