import React, { useEffect  } from 'react';

const AdsComponent = () => {

    useEffect(() => {
    
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {

        }

    },[]);



    return (
        <>
            <ins className="adsbygoogle"
            style= {{display: "block"}}
            data-ad-client="ca-pub-8827502587721246"
            data-ad-slot="8457520385"
            data-ad-format="auto"
            data-full-width-responsive="true">
            </ins>
        </>
    );
};

export default AdsComponent;