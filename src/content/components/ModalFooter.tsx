import * as React from 'React';

// npm packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faFile, faHeart, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far, faFile, faHeart, faBookOpen);

interface ModalFooterProps {
    gid: number;
    token: string;
}

const popUp = (url: string, w: number, h: number): void => {
    window.open(url, "_pu" + (Math.random() + "").replace(/0\./, ""), "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=" + w + ",height=" + h + ",left=" + ((screen.width - w) / 2) + ",top=" + ((screen.height - h) / 2));
}

export default ({ gid, token }: ModalFooterProps): JSX.Element => {
    return (
        <div className="modal__footer">
            <div className="modal__footer__button button-blue" onClick={() => {
                popUp(`https://${location.host}/gallerytorrents.php?gid=${gid}&t=${token}`, 610, 590);
            }}>
                <FontAwesomeIcon icon={['far', 'file']} size="sm" style={{ marginRight: '0.5rem' }} />Torrent
            </div>
            <a className="modal__footer__button button-red" href={`https://${location.host}/g/${gid}/${token}`} target="_blank">
                <FontAwesomeIcon icon={['fas', 'book-open']} size="sm" style={{ marginRight: '0.5rem' }} />Gallery Page
            </a>
            <div className="modal__footer__button button-green" onClick={() => {
                popUp(`https://${location.host}/gallerypopups.php?gid=${gid}&t=${token}&act=addfav`, 675, 415);
            }}>
                <FontAwesomeIcon icon={['fas', 'heart']} size="sm" style={{ marginRight: '0.5rem' }} />Add to favorite
            </div>
        </div>
    );
}