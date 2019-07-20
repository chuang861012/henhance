import * as React from 'react';

import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { TagSetting } from '../../types/TagSetting';

library.add(fas, faThumbsUp, faThumbsDown);

interface Option {
    value: string;
    label: string;
}

interface OptionsSectionProps {
    options: Option[];
    type: string;
    setting: TagSetting | null;
    onTagAdd(namespace: string, tag: string, type: string): void;
    onTagDelete(namespace: string, tag: string, type: string): void;
}

enum Icon {
    upVote = 'thumbs-up',
    downVote = 'thumbs-down'
}

enum IconStyle{
    upVote = 'blue',
    downVote = 'red'
}

export default class extends React.Component<OptionsSectionProps> {
    state = {
        selected: { value: 'artist', label: 'artist' },
        inputValue: ''
    }

    handleSelectChange(selected): void {
        this.setState({ selected });
    }

    handleInputChange(e: React.FormEvent<HTMLInputElement>): void {
        this.setState({ inputValue: e.currentTarget.value });
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.setState({ inputValue: '' });
        this.props.onTagAdd(this.state.selected.value, this.state.inputValue, this.props.type);
    }

    renderTags(tag: string) {
        return <h5 className="options__section--list--item" onClick={() => {
            this.props.onTagDelete(this.state.selected.value, tag, this.props.type);
        }}>{tag}</h5>
    }

    render() {
        return (
            <div className="options__section">
                <div className="options__section--control">
                    <FontAwesomeIcon icon={['fas', Icon[this.props.type]]} size="lg" style={{ color: IconStyle[this.props.type], marginRight: '1rem' }} />
                    <Select value={this.state.selected} options={this.props.options} onChange={this.handleSelectChange.bind(this)} />
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <input type="text" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} className="textInput" />
                        <input type="submit" value="add" className="button" />
                    </form>
                </div>

                <div className="options__section--list">
                    {
                        this.props.setting && this.props.setting[this.state.selected.value].length > 0 ?
                            this.props.setting[this.state.selected.value].map(this.renderTags.bind(this)) : <h3 style={{ textAlign: 'center' }}>No tags of this namespace.</h3>
                    }
                </div>
            </div>
        );
    }
}