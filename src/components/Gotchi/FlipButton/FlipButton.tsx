import { CustomTooltip } from 'components/custom/CustomTooltip';
import { FiregemIcon } from 'components/Icons/Icons';

import { styles } from './styles';

export function FlipButton({ onFlipCard }: { onFlipCard: () => void }) {
    const classes = styles();

    return (
        <CustomTooltip
            title='show stats'
            enterTouchDelay={0}
            placement='top'
            followCursor
        >
            <div className={classes.flipButtonWrapper}>
                <button
                    onClick={() => onFlipCard()}
                    className={classes.flipButton}
                >
                    <FiregemIcon className={classes.flipButtonIcon} width={15} height={15} />
                </button>
            </div>
        </CustomTooltip>
    );
}
