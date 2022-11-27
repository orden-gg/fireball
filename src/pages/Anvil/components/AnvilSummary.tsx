import { AlchemicaPrice } from 'components/Items/common/AlchemicaPrice/AlchemicaPrice';
import { AlchemicaList, InstallationItem } from 'shared/models';

import { anvilSummaryStyles } from '../styles';

export function AnvilSummary({ summary }: { summary: InstallationItem[] }) {
    const classes = anvilSummaryStyles();

    const calculateSummary = (array: InstallationItem[]): AlchemicaList => {
        return [...array].reduce((prev: any, current: any) => {
            if (!prev.length) return current.alchemicaCost;

            return prev.map((pr, i) => pr + current.alchemicaCost[i]);
        }, []);
    };

    return (
        <div className={classes.anvilSummaryWrapper}>
            <div className={classes.anvilSummaryTotal}>
                <div className={classes.anvilSummaryTitle}>Summary</div>
                <AlchemicaPrice alchemica={calculateSummary(summary)} className={classes.anvilSummaryPrice} />
            </div>
            <div className={classes.anvilSummaryInner}>
                {summary.length > 1 &&
                    summary.map((item, i) => (
                        <div className={classes.anvilSummaryItem} key={i}>
                            <div>level: {item.level}</div>
                            <AlchemicaPrice
                                alchemica={[
                                    item.alchemicaCost[0],
                                    item.alchemicaCost[1],
                                    item.alchemicaCost[2],
                                    item.alchemicaCost[3]
                                ]}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}
