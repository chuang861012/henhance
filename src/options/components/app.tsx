import * as React from 'react';

import OptionsSection from './OptionsSection';

import { TagSetting } from '../../types/TagSetting';

interface AppState {
    tagSetting: { upVote: TagSetting | null, downVote: TagSetting | null };
}

export default class extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { tagSetting: { upVote: null, downVote: null } };

        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
    }

    componentDidMount() {
        chrome.storage.sync.get(null, (list): void => {
            const upVote: TagSetting = list.upVote;
            const downVote: TagSetting = list.downVote;
            this.setState({ tagSetting: { upVote, downVote } });
        });
    }

    handleTagAdd(namespace: string, tag: string, type: string): void {
        if (this.state.tagSetting[type] !== null) {
            const newSetting = this.state.tagSetting;
            if (!newSetting[type][namespace].includes(tag)) {
                newSetting[type][namespace].push(tag);
                this.setState({ tagSetting: newSetting });
                chrome.storage.sync.set({
                    [type]: newSetting[type],
                });
            }
        }
    }

    handleTagDelete(namespace: string, tag: string, type: string) {
        if (this.state.tagSetting[type] !== null) {
            const newSetting = this.state.tagSetting;
            newSetting[type][namespace].splice(newSetting[type][namespace].indexOf(tag), 1);
            this.setState({ tagSetting: newSetting });
            chrome.storage.sync.set({
                [type]: newSetting[type],
            });
        }
    }

    render() {
        if (this.state.tagSetting.upVote !== null && this.state.tagSetting.downVote !== null) {
            const upVoteOptions = Object.keys(this.state.tagSetting.upVote).map((key: string) => {
                return { value: key, label: key };
            });
            const downVoteOptions = Object.keys(this.state.tagSetting.downVote).map((key: string) => {
                return { value: key, label: key };
            });
            return (
                <div className="options">
                    <OptionsSection
                        type="upVote"
                        options={upVoteOptions}
                        setting={this.state.tagSetting.upVote}
                        onTagAdd={this.handleTagAdd.bind(this)}
                        onTagDelete={this.handleTagDelete.bind(this)}
                    />
                    <OptionsSection
                        type="downVote"
                        options={downVoteOptions}
                        setting={this.state.tagSetting.downVote}
                        onTagAdd={this.handleTagAdd.bind(this)}
                        onTagDelete={this.handleTagDelete.bind(this)}
                    />
                </div>
            );
        } return null;
    }
}