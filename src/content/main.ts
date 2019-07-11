import * as React from "React";
import ReactDOM from "react-dom";

import { App } from "./components/app";
import { addLoader } from "./utils";

chrome.storage.sync.get(
    null,
    ({ run }: { run: boolean }): void => {
        if (run) {
            addLoader();
            // append modal
            const modal = document.createElement("div");
            document.body.prepend(modal);

            ReactDOM.render(React.createElement(App), modal);
        }
    }
);
