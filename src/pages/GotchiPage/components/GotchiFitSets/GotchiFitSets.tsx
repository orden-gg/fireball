// import { Erc1155Categories } from 'shared/constants';
// import { CardImage } from 'components/ItemCard/components';
import { wearableSets } from 'data/wearableSets.data';
import { useEffect, useState } from 'react';

interface GotchiFitSetsProps {
    gotchi : any;
    className?: string;
}

export function GotchiFitSets({ gotchi, className } : GotchiFitSetsProps) {
    const [availableSets, setAvailableSets] = useState<any[]>([]);

    useEffect(() => {
        const filteredTraits = [...gotchi.numericTraits].splice(0, 4);
        const sets: any[] = wearableSets.filter((set: any[]) =>
            getIsSetAvailable(filteredTraits, [...set[3]].splice(1, 4))
        );

        setAvailableSets(sets);
    }, [gotchi]);

    const getIsSetAvailable = (traits: number[], wearablesModifiers: number[]): boolean => {
        const isSetAvailable: boolean = traits.every((trait: number, index: number) =>
            trait >= 50 ? (
                wearablesModifiers[index] >= 0
            ) : (
                wearablesModifiers[index] <= 0
            )
        );

        return isSetAvailable;
    };

    return <div className={className}>
        {availableSets.map((set: any[], index: number) => {
            return <span key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
                {/* {set[2].map((id: number) => <CardImage id={id} category={Erc1155Categories.Wearable} />)} */}
                <div>{[...set[3]].splice(1,4).join('/')}</div>
                <div>{[...gotchi.numericTraits].splice(0, 4).join('/')}</div>
                <div>{set[0]}</div>
            </span>;
        })}
    </div>;
}
