import React, { useEffect, useRef, useState } from 'react';
import Citadel from '../../../components/Citadel/Citadel';


export default function ClientCitadelMap() {

    const [initialize, setInitialize] = useState(false);

	useEffect( () => {
		
        setTimeout(() => {
            setInitialize(true);
        }, 100)
	}, []);

    // if(loadingRealm || !realm.length) {
    //     return <Box  className={classes.loaderBox}>
    //         <GhostLoader
    //             animate={loadingRealm || !realm.length}
    //             text={!loadingRealm && !realm.length ? 'No realm here :(' : null}8oiuythn9
    //         />
    //     </Box>
    // }

    return ''
}