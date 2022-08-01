import { EthAddress } from 'components/EthAddress/EthAddress';

import { styles } from './styles';

// TODO: rework addres panel
export function EthAddressPanel({ address }: { address: string }) {
    const classes = styles();

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <EthAddress
                    address={address}
                    isShowIcon={true}
                    isCopyButton={true}
                    isPolygonButton={true}
                />
            </div>
        </div>
    );
}
