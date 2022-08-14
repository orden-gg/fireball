import InfoIcon from '@mui/icons-material/Info';

import classNames from 'classnames';

import { TraitsEffectsTypes, TRAITS_KEYS } from 'shared/constants';
import { CommonUtils, ItemUtils } from 'utils';

import { styles } from './styles';

import { traitsDefinitions, traitsEffects } from 'data/traits.data';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { TraitsDefinition, TraitsEffect } from 'shared/models/traits.model';

interface GotchiTraitsProps {
    numericTraits: any;
    modifiedNumericTraits: any;
    className?: string;
}

export function GotchiTraits({ numericTraits, modifiedNumericTraits, className }: GotchiTraitsProps) {
    const classes = styles();

    const renderDefaultTrait = (trait: number, index: number): JSX.Element => {
        if (index < modifiedNumericTraits.length - 2) {
            return <span className={classes.defaultValue}>({trait})</span>;
        } else {
            return <></>;
        }
    };

    const renderEffect = (effect: TraitsEffect): JSX.Element => {
        const [increase, decrease]: number[][] = [
            effect[TraitsEffectsTypes.Increase], effect[TraitsEffectsTypes.Decrease]
        ];

        return <CustomTooltip
            title={
                <>
                    {
                        increase.map((id: number, index: number) => {
                            const definition: TraitsDefinition = traitsDefinitions[id];

                            return <div className={classes.defination} key={index}>
                                <span className={classes.increaseName}>+ {definition.name}</span>
                                <div className={classes.definationInfo}>{definition.info}</div>
                            </div>;
                        })
                    }
                    {
                        decrease.map((id: number, index: number) => {
                            const definition: TraitsDefinition = traitsDefinitions[id];

                            return <div className={classes.defination} key={index}>
                                <span className={classes.decreaseName}>- {definition.name}</span>
                                <div className={classes.definationInfo}>{definition.info}</div>
                            </div>;
                        })
                    }
                </>
            }
            arrow={true}
            placement='left'
        >
            <span className={classes.tooltipInner}>
                <span className={classes.traitEffectName}>{effect[TraitsEffectsTypes.Name]}</span>
                <InfoIcon className={classes.effectsInfo} />
            </span>
        </CustomTooltip>;
    };

    return (
        <div className={classNames(classes.gotchiTraits, className)}>
            {
                modifiedNumericTraits.map((traitValue: string, index: number) => {
                    const traitName: string = TRAITS_KEYS[index];
                    const imageUrl: string = ItemUtils.getTraitIconByName(traitName);
                    const effect: TraitsEffect | undefined = traitsEffects[index].find((item: TraitsEffect) => {
                        const range: number[] = item[TraitsEffectsTypes.Range];

                        return CommonUtils.inRange(traitValue, range[0], range[1]);
                    });

                    return <div className={classNames(classes.gotchiTrait, traitName)} key={index}>
                        <img alt='trait icon' src={imageUrl} width={24} height={24} />
                        <p className={classes.traitValue}>
                            <span>{traitValue}</span>
                            {renderDefaultTrait(numericTraits[index], index)}
                        </p>
                        {effect !== undefined && renderEffect(effect)}
                    </div>;
                })
            }
        </div>
    );
}
