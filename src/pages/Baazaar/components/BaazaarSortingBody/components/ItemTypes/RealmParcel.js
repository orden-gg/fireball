import React from "react";
import Parcel from "../../../../../../components/Items/Parcel/Parcel";

export default function RealmParcel({item}) {
    return (
        <div>
            <Parcel
                parcel={
                    {
                        ...item.parcel,
                        priceInWei: item.priceInWei,
                        baazaarId: item.id
                    }
                }
                isBaazaarCard={true}
            />
        </div>
    );
}
