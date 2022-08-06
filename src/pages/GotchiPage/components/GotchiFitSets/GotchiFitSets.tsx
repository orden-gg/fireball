import { useEffect, useState } from 'react';

import { Erc1155Categories } from 'shared/constants';
import { CardImage } from 'components/ItemCard/components';
import sets from 'data/sets.data.json';

interface GotchiFitSetsProps {
    gotchi : any;
    className?: string;
}
// This is test component, please avoid commenting it, or tell me, i'll move it out of project :)
export function GotchiFitSets({ gotchi, className } : GotchiFitSetsProps) {
    const [availableSets, setAvailableSets] = useState<any[]>([]);

    useEffect(() => {
        const filteredTraits = [...gotchi.numericTraits].splice(0, 4);
        const wearableSets: any[] = sets.filter((set: any[]) =>
            getIsSetAvailable(filteredTraits, [...set[3]].splice(1, 4))
        );

        setAvailableSets(wearableSets);
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
                {set[2].map((id: number) => <CardImage id={id} key={id} category={Erc1155Categories.Wearable} />)}
                <div>{[...set[3]].splice(1,4).join('/')}</div>
                <div>{[...gotchi.numericTraits].splice(0, 4).join('/')}</div>
                <div>{set[0]}</div>
            </span>;
        })}
    </div>;
}
