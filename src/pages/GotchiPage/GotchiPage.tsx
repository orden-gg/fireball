import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Erc721Categories } from 'shared/constants';
import { SalesHistoryModel } from 'shared/models';
import { GotchiPreview } from 'components/GotchiPreview/GotchiPreview';
import { GotchiMain } from 'components/GotchiPreview/components/GotchiMain/GotchiMain';
import { GotchiListings } from 'components/GotchiPreview/components/GotchiListings/GotchiListings';
import { TheGraphApi } from 'api';

import { styles } from './styles';

export function GotchiPage() {
    const classes = styles()

    const routeParams = useParams();

    const [gotchi, setGotchi] = useState(null);
    const [saleshistory, setSaleshistory] = useState<SalesHistoryModel[]>([]);
    const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);

    useEffect(() => {
        const id = Number(routeParams.gotchiId);

        TheGraphApi.getGotchiById(id)
            .then(response => setGotchi(response.data.aavegotchi))
            .catch((error) => console.log(error));

        TheGraphApi.getErc721SalesHistory(id, Erc721Categories.Aavegotchi)
            .then((response: SalesHistoryModel[]) => {
                setSaleshistory(response);
            })
            .catch((error) => console.log(error))
            .finally(() => setHistoryLoaded(true));
    }, [routeParams]);

    if (!gotchi) {
        return <div>There is no Gotchi with such ID :(</div>;
    }

    return <GotchiPreview className={classes.content}>
        {gotchi && <GotchiMain gotchi={gotchi} />}
        {saleshistory && <GotchiListings historyLoaded={historyLoaded} salesHistory={saleshistory} />}
    </GotchiPreview>
}
