// react core
import * as React from 'React'
import { useState, useEffect } from 'react';

// custom components
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

import TagSettingsContext from '../contexts/TagSettings';

// custom types
import { Gdata } from "../../types/Gdata";
import { TagSettings } from '../../types/TagSetting';

interface AppProps {
    gdata: Gdata[];
    tagSettings: TagSettings
}

export default ({ gdata, tagSettings }: AppProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [current, setCurrent] = useState<Gdata | null>(null);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const galleryTable = document.querySelector('.itg');
        if (galleryTable) {
            galleryTable.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target instanceof Element) {
                    const target = e.target.closest('*[class^="gl1"],tr');
                    if (target && target.parentElement) {
                        const i = Array.prototype.slice.call(target.parentElement.children).indexOf(target);
                        setShow(true);
                        setCurrent(gdata[i]);
                        setIndex(i);
                    }
                }
            });
        }

        //remove loader
        const loader = document.getElementById("loader");
        if (loader) {
            loader.remove();
        }
    }, []);

    const closeWindow = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (!(e.target as HTMLElement).closest('.modal__window')) setShow(false);
    }

    const handlePageChange = (page: number): void => {
        setIndex(page);
        setCurrent(gdata[page]);
    }

    if (current) {
        return (
            <div className={"modal " + (show ? "" : "close")} onClick={closeWindow}>
                <div className="modal__window">
                    <ModalTitle title={current.title} rating={current.rating} category={current.category} />
                    <TagSettingsContext.Provider value={tagSettings}>
                        <ModalBody
                            gallery={current}
                            index={index}
                            total={gdata.length}
                            onPageChange={handlePageChange}
                        />
                    </TagSettingsContext.Provider>
                    <ModalFooter gid={current.gid} token={current.token} />
                </div>
            </div>
        )
    }
    return <div></div>;
}