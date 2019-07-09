import * as React from 'React'
import ReactDOM from "react-dom";

import { App } from './components/app';

(() => {
    // append modal
    const modal = document.createElement("div");
    document.body.prepend(modal);

    ReactDOM.render(React.createElement(App), modal);
})();
