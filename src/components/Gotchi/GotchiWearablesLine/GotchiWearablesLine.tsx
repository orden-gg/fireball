import { useTheme } from '@mui/material';

import classNames from 'classnames';

import { Erc1155Categories, WEARABLE_SLOTS } from 'shared/constants';
import { ItemCard } from 'components/ItemCard/containers';
import { CardGroup, CardImage, CardListing, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { ItemUtils } from 'utils';

import { styles } from './styles';

export function GotchiWearablesLine({ gotchi }: { gotchi: any }) {
    const classes = styles();

    const theme = useTheme();
    const wearables: any = gotchi.equippedWearables;

    return (
        <div className={classes.gotchiWLineWrapper}>
            {
                gotchi.equippedSetName ? (
                    <div className={classes.gotchiSetName}>
                        {gotchi.equippedSetName}
                    </div>
                ) : null
            }
            {
                WEARABLE_SLOTS.map((name, index) => {
                    const id: number = wearables[index];
                    const category: string = Erc1155Categories.Wearable;
                    const rarityColor: string = ItemUtils.getItemRarityById(id);

                    return (
                        <CustomTooltip
                            title={
                                id !== 0 ? (
                                    <div className={classNames(classes.gotchiWTooltipTitle, 'tooltip-wearable')}>
                                        <ItemCard type={rarityColor} id={id} category={category}>
                                            <CardGroup name='body'>
                                                <CardSlot id={id} />
                                                <CardImage className={classes.cardImage} id={id} category={category} />
                                                <CardName className={classes.cardName} id={id} />
                                                <CardStats className={classes.cardStats} id={id} category={category} />
                                            </CardGroup>
                                            <CardGroup name='footer' className={classes.cardFoter}>
                                                <CardListing />
                                            </CardGroup>
                                        </ItemCard>
                                    </div>
                                ) : (
                                    <span>
                                        <span className={classes.gotchiWTooltipName}>{name}</span>
                                        Empty
                                    </span>
                                )
                            }
                            enterTouchDelay={0}
                            placement='top'
                            key={index}
                        >
                            <div
                                className={classes.gotchiWLineItem}
                                style={{ backgroundColor: theme.palette.rarity[rarityColor] }}
                                key={index}
                            ></div>
                        </CustomTooltip>
                    );
                })
            }
        </div>
    );
}
