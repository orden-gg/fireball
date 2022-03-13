import React from 'react';
import AutopetContextProvider from './AutopetContextProvider';
import AutopetHeader from './components/AutopetHeader';
import AutopetFooter from './components/AutopetHeader';
import AutopetSteps from './components/AutopetSteps';
import styles from './styles';

export default function Autopet() {
    const classes = styles();

    return (
        <AutopetContextProvider>
            <div className={classes.autopetWrapper}>

                <AutopetHeader />

                <AutopetSteps />
                {/* <AutopetFooter /> */}
            </div>

        </AutopetContextProvider>
    );
}
