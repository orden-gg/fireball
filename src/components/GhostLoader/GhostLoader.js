import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import styles from './styles';

export default function GhostLoader({animate, text}) {
    const classes = styles();
    const [render, setRender] = useState(animate);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        if(animate) setRender(true);
    }, [animate]);

    useEffect(() => {
        if(text) {
            setTimeout(() => setTitle(text), 2000);
        } else {
            setTitle(null);
        }
    }, [text]);
    
    const onAnimationEnd = () => {
        if(!animate) setRender(false);
    };

    return (
        render && (
            <div className={classNames(classes.wrapper, animate ? 'slideIn' : 'slideOut')} onAnimationEnd={onAnimationEnd}>
                <div className={classNames(classes.fly, title && 'no-anim')}>
                    <div className={classNames(classes.ghost, title && 'prepare-speach')}>
                        <div className={classes.head}>
                            <div className={classNames(classes.eyes, title && 'blink')}></div>
                            <div className={classNames(classes.mouth, title && 'bla-bla')}></div>
                        </div>
                        <div className={classes.tail}>
                            <div className={classes.rip}></div>
                        </div>
                        {title ? (
                            <div className={classes.tooltip}>
                                {title}
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                </div>

                <svg xmlns='http://www.w3.org/2000/svg' version='1.1' style={{ display: 'none' }}>
                    <defs>
                        <filter id='goo'>
                        <feGaussianBlur
                            in='SourceGraphic'
                            stdDeviation='10'
                            result='ghost-blur' />
                        <feColorMatrix
                            in='ghost-blur'
                            mode='matrix'
                            values='
                                    1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 16 -7'
                            result='ghost-gooey' />
                        </filter>
                    </defs>
                </svg>
            </div>
        )
    )
}