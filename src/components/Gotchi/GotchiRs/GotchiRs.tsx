import { styles } from './styles';

export function GotchiRs({ gotchi }: { gotchi: any }) {
    const classes = styles();

    return (
        <div className={classes.gotchiRsWrapper}>
            <span className={classes.modifiedRs}>{gotchi.modifiedRarityScore}</span>
            <span>({gotchi.baseRarityScore})</span>
        </div>
    );
}
