import { AlchemicaPrice } from 'components/Items/common/AlchemicaPrice/AlchemicaPrice';
import { AlchemicaList, InstallationItem } from 'shared/models';

import { AnvilCalculatorOptions } from '../../models';
import { styles } from './styles';

export function AnvilSummary({ summary, options }: { summary: InstallationItem[]; options: AnvilCalculatorOptions }) {
    const classes = styles();

    const calculateSummary = (array: InstallationItem[]): AlchemicaList => {
        return [...array].reduce((prev: any, current: InstallationItem) => {
            if (!prev.length) return current.alchemicaCost;

            return prev.map((pr, i) => pr + current.alchemicaCost[i]);
        }, []);
    };

    const calculateGltr = (array: InstallationItem[]): number => {
        return [...array].reduce((prev: number, current: InstallationItem) => prev + current.craftTime, 0);
    };

    return (
        <div className={classes.anvilSummaryWrapper}>
            <div className={classes.anvilSummaryTotal}>
                <div className={classes.anvilSummaryTitle}>Summary</div>
                <AlchemicaPrice
                    alchemica={calculateSummary(summary)}
                    gltr={options.showGltr ? calculateGltr(summary) : 0}
                    className={classes.anvilSummaryPrice}
                />
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
                                gltr={options.showGltr ? item.craftTime : 0}
                                className={!options.showDetailedAlchemica ? classes.anvilSummaryDetailed : ''}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}
