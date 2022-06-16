import { Grid } from '@mui/material';

import { Gotchi } from 'components/Gotchi/Gotchi';

import { baazaarSortingBodyStyles } from '../../../../styles';

export function Aavegotchi({ item }: { item: any }) {
    const classes = baazaarSortingBodyStyles();

    return (
        <div>
            <div className={classes.baazaarListItem}>
                <Grid item xs={12}>
                    {
                        item.gotchi.__typename === 'Aavegotchi' ?
                            <Gotchi
                                gotchi={item.gotchi}
                                render={[
                                    {
                                        badges: [
                                            'collateral',
                                            'rs',
                                            'skillpoints',
                                            'kinship',
                                            'level'
                                        ]
                                    },
                                    'svg',
                                    'name',
                                    'traits',
                                    'wearablesLine',
                                    'listing'
                                ]}
                            /> :
                            <Gotchi
                                key={item.gotchi.id}
                                gotchi={{
                                    ...item.gotchi,
                                    listings: [{ id: item.id, priceInWei: item.priceInWei }],
                                    historicalPrices: []
                                }}
                                renderSvgByStats={true}
                                portal={true}
                                render={[
                                    {
                                        badges: [
                                            'collateral',
                                            'rs',
                                            'skillpoints',
                                            'kinship',
                                            'level'
                                        ]
                                    },
                                    'svg',
                                    'name',
                                    'traits',
                                    'wearablesLine',
                                    'listing'
                                ]}
                            />
                    }
                </Grid>
            </div>
        </div>
    );
}
