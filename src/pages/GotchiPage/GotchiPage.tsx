import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Erc721Categories } from 'shared/constants';
import { SalesHistoryModel } from 'shared/models';
import { GotchiMain } from 'components/GotchiPreview/components/GotchiMain/GotchiMain';
import { GotchiListings } from 'components/GotchiPreview/components/GotchiListings/GotchiListings';
import { TheGraphApi } from 'api';

import { styles } from './styles';

export function GotchiPage() {
    const classes = styles()

    const routeParams = useParams();

    const [gotchiLoaded, setGotchiLoaded] = useState<boolean>(false);
    const [gotchi, setGotchi] = useState<any>({});
    const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
    const [saleshistory, setSaleshistory] = useState<SalesHistoryModel[]>([]);

    console.log(gotchi);

    useEffect(() => {
        const id = Number(routeParams.gotchiId);

        TheGraphApi.getGotchiById(id)
            .then((response: any) => setGotchi(response.data.aavegotchi))
            .catch((error) => console.log(error))
            .finally(() => setGotchiLoaded(true));

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

    return <div className={classes.content}>
        {gotchiLoaded &&
            <>
                <GotchiMain gotchi={gotchi} />
                {gotchi.timesTraded > 0 && <GotchiListings historyLoaded={historyLoaded} salesHistory={saleshistory} />}
            </>
        }
    </div>
}
