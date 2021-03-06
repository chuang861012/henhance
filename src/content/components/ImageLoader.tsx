import * as React from 'React';
import Image_Loader from "react-load-image";

interface ImageLoaderProps {
    src: string;
}

export default (props: ImageLoaderProps): JSX.Element => {
    return (
        <Image_Loader src={props.src} className="img-loader-container">
            <img />
            <div className="img-loader-error">Error</div>
            <img src={`chrome-extension://${chrome.runtime.id}/loader.svg`} className="img-loader-loader" />
        </Image_Loader>
    );
}