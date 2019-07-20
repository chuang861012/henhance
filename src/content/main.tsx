import * as React from "React";
import ReactDOM from "react-dom";

import App from "./components/App";
import { addLoader } from "./utils";

import { init } from './init';

import { ChromeStorage } from '../types/ChromeStorage';

chrome.storage.sync.get(
    ['run', 'upVote', 'downVote'],
    async ({ run, upVote, downVote }: ChromeStorage) => {
        if (run) {
            addLoader();
            // append modal
            const modal = document.createElement("div");
            document.body.prepend(modal);
            const gdata = await init();

            ReactDOM.render(
                <App
                    gdata={gdata}
                    tagSettings={{ upVote, downVote }}
                />
                , modal);
        }
    }
);
