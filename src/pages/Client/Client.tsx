import { Route, Routes } from 'react-router-dom';

import Helmet from 'react-helmet';

import { ClientRoutes } from './ClientRoutes';
import { ClientNav } from './components/ClientNav';
import { styles } from './styles';

export function Client() {
    const classes = styles();

    return (
        <div className={classes.container}>
            <Helmet>
                <title>client</title>
            </Helmet>

            <Routes>
                <Route path='' element={<ClientNav />} />
                <Route path=':account/*' element={<ClientRoutes />} />
            </Routes>
        </div>
    );
}
