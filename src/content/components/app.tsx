// react core
import * as React from 'React'

// npm packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTag, fas, faFile, faHeart, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// custom components
import Rating from './Rating';
import ImageLoader from './ImageLoader';
import MetaBox from './MetaBox';
import LanguageTag from './LanguageTag';

// custom functions
import { init } from '../init';
import { Category } from '../Category';

// custom types
import { Gdata } from "../Gdata";


library.add(fas, far, faFile, faTag, faHeart, faBookOpen);

interface state {
    gdata: Gdata[];
    show: boolean;
    current: Gdata | null;
    index: number;
}

export class App extends React.Component {
    state: state = {
        gdata: [],
        show: false,
        current: null,
        index: 0
    }

    async componentDidMount() {
        this.setState({ gdata: await init() });
        document.querySelector('.itg').addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target instanceof Element) {
                const target = e.target.closest('*[class^="gl1"],tr');
                const i = Array.prototype.slice.call(target.parentElement.children).indexOf(target);
                this.setState({ show: true, current: this.state.gdata[i], index: i });
            }
        });
        //remove loader
        document.getElementById("load").remove();
    }

    closeWindow(e) {
        if (!e.target.closest('.modal__window')) this.setState({ show: false });
    }

    handlePageChange(page: number) {
        this.setState({ index: page, current: this.state.gdata[page] })
    }

    renderTags(key: string) {
        const currentTags = this.state.current.tags[key];
        if (key === 'translated' || key === 'language') {
            return <noscript></noscript>;
        } else if (currentTags.length > 0) {
            return (
                <div key={key} className="modal__item__tags">
                    <h1 className={"tag_type " + key}>{key}</h1>
                    <div className="tag_box">
                        {this.state.current.tags[key].map((tag: string) => {
                            return (
                                <a className="tag" key={tag} href={`https://${location.host}/tag/${key}:${tag}`} target="_blank">
                                    <FontAwesomeIcon icon={['fas', 'tag']} size="xs" /> {tag}
                                </a>
                            )
                        })
                        }
                    </div>
                </div>
            );
        }
    }

    popUp(url: string, w: number, h: number) {
        window.open(url, "_pu" + (Math.random() + "").replace(/0\./, ""), "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=" + w + ",height=" + h + ",left=" + ((screen.width - w) / 2) + ",top=" + ((screen.height - h) / 2));
    }


    render() {
        if (this.state.current) {
            const current = this.state.current;
            const language = current.tags.language || 'japanese';
            return (
                <div className={"modal " + (this.state.show ? "" : "close")} onClick={this.closeWindow.bind(this)}>
                    <div className="modal__window">
                        <h1 className="modal__title" style={{ backgroundColor: Category[current.category].d }}>
                            <span>{current.title}</span>
                            <Rating rating={current.rating} />
                        </h1>
                        <div className="modal__container" style={{ backgroundColor: Category[current.category].l }}>
                            {(() => {
                                if (this.state.index !== 0) {
                                    return (
                                        <div className="page_button" onClick={() => {
                                            this.handlePageChange.bind(this)(this.state.index - 1);
                                        }}>&#10092;</div>
                                    )
                                } else {
                                    return <div className="page_button disable">&#10092;</div>
                                }
                            })()}
                            <div className="modal__item" style={{ maxWidth: "200px" }}>
                                <ImageLoader src={current.thumb} />
                                <MetaBox uploader={current.uploader} filecount={current.filecount} posted={current.posted} />
                            </div>
                            <div className="modal__item" style={{ flex: 1 }}>
                                <div className="modal__item__tags">
                                    <h1 className={"tag_type language"}>language</h1>
                                    <div className="tag_box">
                                        <LanguageTag language={language} />
                                        {current.tags.translated ? <span className="tag"><span style={{ color: "blue", fontWeight: "bold" }}>&#10003;</span> translated</span> : ""}
                                    </div>
                                </div>
                                {Object.keys(current.tags).map(this.renderTags.bind(this))}
                            </div>
                            {(() => {
                                if (this.state.index < this.state.gdata.length - 1) {
                                    return (
                                        <div className="page_button" onClick={() => {
                                            this.handlePageChange.bind(this)(this.state.index + 1);
                                        }}>&#10093;</div>
                                    )
                                } else {
                                    return <div className="page_button disable">&#10093;</div>
                                }
                            })()}
                        </div>
                        <div className="modal__footer">
                            <div className="modal__footer__button button-blue" onClick={() => {
                                this.popUp(`https://${location.host}/gallerytorrents.php?gid=${current.gid}&t=${current.token}`, 610, 590);
                            }}>
                                <FontAwesomeIcon icon={['far', 'file']} size="sm" style={{ marginRight: '0.5rem' }} />Torrent
                            </div>
                            <a className="modal__footer__button button-red" href={`https://${location.host}/g/${current.gid}/${current.token}`} target="_blank">
                                <FontAwesomeIcon icon={['fas', 'book-open']} size="sm" style={{ marginRight: '0.5rem' }} />Gallery Page
                            </a>
                            <div className="modal__footer__button button-green" onClick={() => {
                                this.popUp(`https://${location.host}/gallerypopups.php?gid=${current.gid}&t=${current.token}&act=addfav`, 675, 415);
                            }}>
                                <FontAwesomeIcon icon={['fas', 'heart']} size="sm" style={{ marginRight: '0.5rem' }} />Add to favorite
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return <div></div>
    }
}