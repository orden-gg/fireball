import { useEffect, useState } from 'react';

import { Erc1155Categories } from 'shared/constants';
import { GotchiModel } from 'shared/models';
import { CardImage, CardName } from 'components/ItemCard/components';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { MainApi } from 'api';
import { GotchiUtils, ItemUtils } from 'utils';

import { gotchiBadgesStyles } from './styles';

export function GotchiBadges({ id }: { id: number }) {
    const classes = gotchiBadgesStyles();

    const [badges, setBadges] = useState<number[]>([]);

    useEffect(() => {
        MainApi.getAavegotchiById(id).then((response: any[]) => {
            const gotchi: GotchiModel = GotchiUtils.convertDataFromContract(response);
            const badges: number[] = gotchi.inventory.filter((id: number) => {
                const slot = ItemUtils.getSlotsById(id);

                return slot.length === 0;
            });

            setBadges(badges.reverse());
        });
    }, [id]);

    return <div className={classes.badges}>
        {
            badges.map((id, index) =>
                <CustomTooltip
                    title={
                        <CardName id={id} className={classes.name} />
                    }
                    placement='top'
                    key={index}
                    arrow
                >
                    <div className={classes.badge}>
                        <CardImage
                            id={id}
                            category={Erc1155Categories.Wearable}
                            className={classes.badgeImage}
                        />
                    </div>
                </CustomTooltip>
            )
        }
    </div>;
}
