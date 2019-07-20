import * as React from "react";
import { TagSettings } from "../../types/TagSetting";

const store: TagSettings = {
    upVote: undefined,
    downVote: undefined
};

export default React.createContext(store);
