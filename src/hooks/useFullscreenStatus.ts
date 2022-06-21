import { useEffect, useState } from 'react';

export function useFullscreenStatus(elRef: any) {
    const [isFullscreen, setIsFullscreen] = useState<any>(false);

    const setFullscreen = (): void => {
        if (elRef.current === null) {
            return;
        }

        if (getBrowserFullscreenElementProp() === null) {
            return setIsFullscreen(null);
        }

        elRef.current
            .requestFullscreen()
            .then(() => {
                setIsFullscreen(
                    document[`${getBrowserFullscreenElementProp()}`] !== null
                );
            })
            .catch(() => {
                setIsFullscreen(false);
            });
    };

    useEffect(() => {
        const fullscreenProp = getBrowserFullscreenElementProp();

        setIsFullscreen(
            fullscreenProp !== null ? document[fullscreenProp] !== null : null
        );
    }, []);

    useEffect(() => {
        document.onfullscreenchange = () =>
            setIsFullscreen(
                document[`${getBrowserFullscreenElementProp()}`] !== null
            );

        return () => (document.onfullscreenchange = undefined as any);
    });

    return [isFullscreen, setFullscreen];
}

function getBrowserFullscreenElementProp() {
    if (typeof document.fullscreenElement !== 'undefined') {
        return 'fullscreenElement';
    } else if (typeof document['mozFullScreenElement'] !== 'undefined') {
        return 'mozFullScreenElement';
    } else if (typeof document['msFullscreenElement'] !== 'undefined') {
        return 'msFullscreenElement';
    } else if (typeof document['webkitFullscreenElement'] !== 'undefined') {
        return 'webkitFullscreenElement';
    } else {
        return null;
    }
}
