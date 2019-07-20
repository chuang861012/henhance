// react core
import * as React from 'React'
import { useState, useEffect } from 'react';

// custom components
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

// custom functions
import { init } from '../init';

// custom types
import { Gdata } from "../Gdata";

// interface appState {
//     gdata: Gdata[];
//     show: boolean;
//     current: Gdata | null;
//     index: number;
// }

// export class App extends React.Component {
//     state = {
//         gdata: [],
//         show: false,
//         current: null,
//         index: 0
//     }

//     async componentDidMount() {
//         this.setState({ gdata: await init() });
//         const galleryTable = document.querySelector('.itg');
//         if (galleryTable) {
//             galleryTable.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 if (e.target instanceof Element) {
//                     const target = e.target.closest('*[class^="gl1"],tr');
//                     if (target && target.parentElement) {
//                         const i = Array.prototype.slice.call(target.parentElement.children).indexOf(target);
//                         this.setState({ show: true, current: this.state.gdata[i], index: i });
//                     }
//                 }
//             });
//         }

//         //remove loader
//         const loader = document.getElementById("loader");
//         if (loader) {
//             loader.remove();
//         }
//     }

//     closeWindow(e: React.MouseEvent<HTMLDivElement>): void {
//         if (!(e.target as HTMLElement).closest('.modal__window')) this.setState({ show: false });
//     }

//     handlePageChange(page: number): void {
//         this.setState({ index: page, current: this.state.gdata[page] })
//     }

//     render() {
//         if (this.state.current) {
//             const current = this.state.current;

//             return (
//                 <div className={"modal " + (this.state.show ? "" : "close")} onClick={this.closeWindow.bind(this)}>
//                     <div className="modal__window">
//                         <ModalTitle title={current.title} rating={current.rating} category={current.category} />
//                         <ModalBody
//                             gallery={current}
//                             index={this.state.index}
//                             total={this.state.gdata.length}
//                             onPageChange={(page: number): void => {
//                                 this.handlePageChange.bind(this)(page);
//                             }}
//                         />
//                         <ModalFooter gid={current.gid} token={current.token} />
//                     </div>
//                 </div>
//             )
//         }
//         return <div></div>;
//     }
// }

export default ({ gdata }: { gdata: Gdata[] }) => {
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
                    <ModalBody
                        gallery={current}
                        index={index}
                        total={gdata.length}
                        onPageChange={handlePageChange}
                    />
                    <ModalFooter gid={current.gid} token={current.token} />
                </div>
            </div>
        )
    }
    return <div></div>;
}