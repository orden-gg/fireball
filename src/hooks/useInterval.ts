import { useEffect, useRef } from 'react';

export function useInterval(callback: any, delay: number) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);

            return () => clearInterval(id);
        }
    }, [delay]);
}
