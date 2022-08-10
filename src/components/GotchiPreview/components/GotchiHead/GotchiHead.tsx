import { EthAddress } from 'components/EthAddress/EthAddress';

import { gotchiHeadStyles } from './styles';

interface GotchiHeadProps {
    name: string;
    owner: string;
}

export function GotchiHead({ name, owner }: GotchiHeadProps) {
    const classes = gotchiHeadStyles();

    return <div className={classes.title}>
        <span className={classes.name}>{name}</span>
        <EthAddress
            address={owner}
            isShowIcon
            isCopyButton
            isPolygonButton
            isClientLink
        />
    </div>;
}
