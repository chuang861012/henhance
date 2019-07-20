import { TagSetting } from "./TagSetting";

export interface ChromeStorage {
    run?: boolean;
    upVote?: TagSetting;
    downVote?: TagSetting;
}
