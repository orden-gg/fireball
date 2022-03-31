import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';

import styles from './styles';

export default function GotchiTraits({ traits, currentTraits }) {
    const classes = styles();

    const renderDefaultTrait = (trait, id) => {
        if (id < traits.length-2) {
            return <span className={classes.defaultVal}>
                ({trait})
            </span>
        }
    }

    return (
        <div className={classes.gotchiTraits}>
            {
                traits.map((traitVal, index) => {
                    const traitKey = itemUtils.getTraitKey(index, true);

                    return (
                        <div
                            className={classNames(classes.gotchiTrait, itemUtils.getRarityByTrait(traitVal))}
                            key={index}
                        >
                            <img alt='trait icon' src={traitKey} className={classes.gotchiTraitIcon} />
                            <p className={classes.mainVal}>
                                <span className={classes.modifiedValue}>{currentTraits[index]}</span>
                                {renderDefaultTrait(traitVal, index)}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    );
}
