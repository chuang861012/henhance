import * as React from "React";
import ReactDOM from "react-dom";

import { App } from "./components/app";

chrome.storage.sync.get(null, ({ run }) => {
    if (run) {
        // append modal
        const modal = document.createElement("div");
        document.body.prepend(modal);

        ReactDOM.render(React.createElement(App), modal);
    }
});
