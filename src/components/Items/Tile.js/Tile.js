import CardName from '../common/CardName/CardName';
import TileImage from './TileImage';

import styles from './styles';

export default function Tile({ data }) {
    const classes = styles();

    return (
        <div className={classes.tile}>
            <span className={classes.tileBalance}>{data.balance}</span>
            <TileImage data={data} />
            <CardName
                item={data}
                itemName={data.name}
                itemRarity='legendary'
            />
        </div>
    )
}
