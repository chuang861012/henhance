import * as React from 'React'
import Image_Loader from "react-load-image";

export default (props)=> {
    return (
        <Image_Loader src={props.src} className="img-loader-container">
            <img className={props.className} />
            <div className="img-loader-error">Error</div>
            <img src={`chrome-extension://${chrome.runtime.id}/loader.svg`} className="img-loader-loader" />
        </Image_Loader>
    );
}