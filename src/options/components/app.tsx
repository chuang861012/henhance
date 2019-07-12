import * as React from 'react';

import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faThumbsUp, faThumbsDown);

import { TagSetting } from '../../TagSetting';

interface AppState {
    upVoteSelected: { value: string, label: string };
    downVoteSelected: { value: string, label: string };
    tagSetting: { upVote: TagSetting, downVote: TagSetting } | null;
    upVoteInputValue: string;
    downVoteInputValue: string;
}

export default class extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = { upVoteInputValue: "", downVoteInputValue: "", upVoteSelected: { value: 'artist', label: 'artist' }, downVoteSelected: { value: 'artist', label: 'artist' }, tagSetting: null };
        this.handleUpVoteChange = this.handleUpVoteChange.bind(this);
        this.handleDownVoteChange = this.handleDownVoteChange.bind(this);

        this.handleUpVoteInputChange = this.handleUpVoteInputChange.bind(this);
        this.handleDownVoteInputChange = this.handleDownVoteInputChange.bind(this);

        this.handleUpVoteSubmit = this.handleUpVoteSubmit.bind(this);
        this.handleDownVoteSubmit = this.handleDownVoteSubmit.bind(this);

        this.handleTagClick = this.handleTagClick.bind(this);

        this.renderUpVoteTags = this.renderUpVoteTags.bind(this);
        this.renderDownVoteTags = this.renderDownVoteTags.bind(this);
    }

    componentDidMount() {
        chrome.storage.sync.get(null, (list): void => {
            const upVote: TagSetting = list.upVote;
            const downVote: TagSetting = list.downVote;
            this.setState({ tagSetting: { upVote, downVote } });
        });
    }

    handleUpVoteChange = (upVoteSelected) => {
        this.setState({ upVoteSelected });
    };

    handleDownVoteChange = (downVoteSelected) => {
        this.setState({ downVoteSelected });
    };

    handleUpVoteInputChange(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ upVoteInputValue: e.currentTarget.value });
    }

    handleDownVoteInputChange(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ downVoteInputValue: e.currentTarget.value });
    }

    handleUpVoteSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (this.state.tagSetting !== null) {
            const newTagSetting = this.state.tagSetting;
            if (!newTagSetting.upVote[this.state.upVoteSelected.value].includes(this.state.upVoteInputValue)) {
                newTagSetting.upVote[this.state.upVoteSelected.value].push(this.state.upVoteInputValue);

                this.setState({
                    tagSetting: newTagSetting,
                    upVoteInputValue: ''
                })
                chrome.storage.sync.set({
                    upVote: this.state.tagSetting.upVote,
                });
            }
        }
    }

    handleDownVoteSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (this.state.tagSetting !== null) {
            const newTagSetting = this.state.tagSetting;
            if (!newTagSetting.downVote[this.state.downVoteSelected.value].includes(this.state.downVoteInputValue)) {
                newTagSetting.downVote[this.state.downVoteSelected.value].push(this.state.downVoteInputValue);

                this.setState({
                    tagSetting: newTagSetting,
                    downVoteInputValue: ''
                })
                chrome.storage.sync.set({
                    downVote: this.state.tagSetting.downVote,
                });
            }
        }
    }

    handleTagClick(namespace: string, tag: string, type: string) {
        if (this.state.tagSetting) {
            const newSetting = this.state.tagSetting;
            newSetting[type][namespace].splice(newSetting[type][namespace].indexOf(tag), 1);
            this.setState({ tagSetting: newSetting });
            chrome.storage.sync.set({
                [type]: newSetting[type],
            });
        }
    }

    renderUpVoteTags(tag: string) {
        return <h5 className="options__section--list--item" onClick={() => {
            this.handleTagClick(this.state.upVoteSelected.value, tag, 'upVote');
        }}>{tag}</h5>
    }

    renderDownVoteTags(tag: string) {
        return <h5 className="options__section--list--item" onClick={() => {
            this.handleTagClick(this.state.downVoteSelected.value, tag, 'downVote');
        }}>{tag}</h5>
    }

    render() {
        if (this.state.tagSetting !== null) {
            const upVoteOptions = Object.keys(this.state.tagSetting.upVote).map((key: string) => {
                return { value: key, label: key };
            });
            const downVoteOptions = Object.keys(this.state.tagSetting.downVote).map((key: string) => {
                return { value: key, label: key };
            });
            return (
                <div className="options">

                    <div className="options__section">
                        <div className="options__section--control">
                            <FontAwesomeIcon icon={['fas', 'thumbs-up']} size="lg" style={{ color: 'blue', marginRight: '1rem' }} />
                            <Select value={this.state.upVoteSelected} options={upVoteOptions} onChange={this.handleUpVoteChange} />
                            <form onSubmit={this.handleUpVoteSubmit}>
                                <input type="text" value={this.state.upVoteInputValue} onChange={this.handleUpVoteInputChange} className="textInput" />
                                <input type="submit" value="add" className="button" />
                            </form>
                        </div>

                        <div className="options__section--list">
                            {
                                this.state.tagSetting.upVote[this.state.upVoteSelected.value].length > 0 ?
                                    this.state.tagSetting.upVote[this.state.upVoteSelected.value].map(this.renderUpVoteTags) : <h3 style={{ textAlign: 'center' }}>No tags of this namespace.</h3>
                            }
                        </div>
                    </div>

                    <div className="options__section">
                        <div className="options__section--control">
                            <FontAwesomeIcon icon={['fas', 'thumbs-down']} size="lg" style={{ color: 'red', marginRight: '1rem' }} />
                            <Select value={this.state.downVoteSelected} options={downVoteOptions} onChange={this.handleDownVoteChange} />
                            <form onSubmit={this.handleDownVoteSubmit}>
                                <input type="text" value={this.state.downVoteInputValue} onChange={this.handleDownVoteInputChange} className="textInput" />
                                <input type="submit" value="add" className="button" />
                            </form>
                        </div>

                        <div className="options__section--list">
                            {
                                this.state.tagSetting.downVote[this.state.downVoteSelected.value].length > 0 ?
                                    this.state.tagSetting.downVote[this.state.downVoteSelected.value].map(this.renderDownVoteTags) : <h3 style={{ textAlign: 'center' }}>No tags of this namespace.</h3>
                            }
                        </div>
                    </div>
                </div>
            );
        } return null;
    }
}