import { WearableItemTypes, WerableBenefitTypes } from 'shared/constants';
import { WearableBenefit } from 'shared/models';

export const WEARABLES_BENEFITS: WearableBenefit[] = [
    {
        id: 99,
        name: 'Parasol',
        itemType: WearableItemTypes.Accessory,
        benefit: {
            first: WerableBenefitTypes.APCapacity,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 304,
        name: 'Paper Fan',
        itemType: WearableItemTypes.Accessory,
        benefit: {
            first: WerableBenefitTypes.APCapacity,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 12,
        name: 'Link Bubbly',
        itemType: WearableItemTypes.AlcoholicBeverage,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 120,
        name: 'Martini',
        itemType: WearableItemTypes.AlcoholicBeverage,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 121,
        name: 'Wine',
        itemType: WearableItemTypes.AlcoholicBeverage,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 124,
        name: 'Beer Helmet',
        itemType: WearableItemTypes.AlcoholicBeverage,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 158,
        name: 'Lil Pump Drank',
        itemType: WearableItemTypes.AlcoholicBeverage,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 40,
        name: 'Foxy Tail',
        itemType: WearableItemTypes.Animal,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 151,
        name: 'Common Rofl',
        itemType: WearableItemTypes.Animal,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 152,
        name: 'Uncommon Rofl',
        itemType: WearableItemTypes.Animal,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 153,
        name: 'Rare Rofl',
        itemType: WearableItemTypes.Animal,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 154,
        name: 'Legendary Rofl',
        itemType: WearableItemTypes.Animal,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 155,
        name: 'Mythical Rofl',
        itemType: WearableItemTypes.Animal,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 156,
        name: 'Godlike Rofl',
        itemType: WearableItemTypes.Animal,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 305,
        name: 'Sus Butterfly',
        itemType: WearableItemTypes.Animal,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 44,
        name: 'Sus Butterfly',
        itemType: WearableItemTypes.Artifact,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 113,
        name: 'Uranium Rod',
        itemType: WearableItemTypes.Artifact,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 100,
        name: 'Clutch',
        itemType: WearableItemTypes.Bag,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 60,
        name: 'Common Wizard Hat',
        itemType: WearableItemTypes.BigHat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 61,
        name: 'Legendary Wizard Hat',
        itemType: WearableItemTypes.BigHat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 62,
        name: 'Mythical Wizard Hat',
        itemType: WearableItemTypes.BigHat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 63,
        name: 'Godlike Wizard Hat',
        itemType: WearableItemTypes.BigHat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 67,
        name: 'Straw Hat',
        itemType: WearableItemTypes.BigHat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 101,
        name: 'Witchy Hat',
        itemType: WearableItemTypes.BigHat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 221,
        name: 'Pirate Hat',
        itemType: WearableItemTypes.BigHat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 228,
        name: '10 Gallon Hat',
        itemType: WearableItemTypes.BigHat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 52,
        name: 'Galaxy Brain',
        itemType: WearableItemTypes.BodyPart,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 131,
        name: 'Dragon Horns',
        itemType: WearableItemTypes.BodyPart,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 133,
        name: 'Pointy Horns',
        itemType: WearableItemTypes.BodyPart,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 140,
        name: 'Elf Ears',
        itemType: WearableItemTypes.BodyPart,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 7,
        name: 'Marice Cap',
        itemType: WearableItemTypes.Cap,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 10,
        name: 'Link White Hat',
        itemType: WearableItemTypes.Cap,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 136,
        name: 'Polygon Cap',
        itemType: WearableItemTypes.Cap,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 139,
        name: 'Snapshot Cap',
        itemType: WearableItemTypes.Cap,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 239,
        name: 'Wagie Cap',
        itemType: WearableItemTypes.Cap,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 300,
        name: 'Feathered Cap',
        itemType: WearableItemTypes.Cap,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 91,
        name: 'Pajama Shirt',
        itemType: WearableItemTypes.Comfywear,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 231,
        name: 'Comfy Poncho',
        itemType: WearableItemTypes.Comfywear,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 234,
        name: 'Shaaman Poncho',
        itemType: WearableItemTypes.Comfywear,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 98,
        name: 'Day Dress',
        itemType: WearableItemTypes.Dress,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 102,
        name: 'Witchy Cloak',
        itemType: WearableItemTypes.Dress,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 303,
        name: 'Kimono',
        itemType: WearableItemTypes.Dress,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 15,
        name: 'Red Plaid',
        itemType: WearableItemTypes.DressShirt,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 16,
        name: 'Blue Plaid',
        itemType: WearableItemTypes.DressShirt,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 114,
        name: 'Red Hawaiian Shirt',
        itemType: WearableItemTypes.DressShirt,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 115,
        name: 'Blue Hawaiian Shirt',
        itemType: WearableItemTypes.DressShirt,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 28,
        name: 'Marc Outfit',
        itemType: WearableItemTypes.DressSuit,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 31,
        name: 'Jordan Suit',
        itemType: WearableItemTypes.DressSuit,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 74,
        name: 'Jaay Suit',
        itemType: WearableItemTypes.DressSuit,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 85,
        name: 'Gentelman Coat',
        itemType: WearableItemTypes.DressSuit,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 9,
        name: 'Walkie Talkie',
        itemType: WearableItemTypes.Electronics,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 41,
        name: 'Trezor Wallet',
        itemType: WearableItemTypes.Electronics,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 55,
        name: 'Aagent Headset',
        itemType: WearableItemTypes.Electronics,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 204,
        name: 'Game Controller',
        itemType: WearableItemTypes.Electronics,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 212,
        name: '1337 Laptop',
        itemType: WearableItemTypes.Electronics,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 240,
        name: 'Headphones',
        itemType: WearableItemTypes.Electronics,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 261,
        name: 'Aantenna Bot',
        itemType: WearableItemTypes.Electronics,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 263,
        name: 'Signal Headset',
        itemType: WearableItemTypes.Electronics,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 14,
        name: 'Sergey Eyes',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 53,
        name: 'All-Seeing Eyes',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 214,
        name: 'Matrix Eyes',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 215,
        name: 'Cyborg Eye',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 224,
        name: 'Pirate Patch',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 249,
        name: 'Gecko Eyes',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 259,
        name: 'Bushy Eyebrows',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 262,
        name: 'Radar Eyes',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 301,
        name: 'Alluring Eyes',
        itemType: WearableItemTypes.Eye,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 13,
        name: 'Sergey Beard',
        itemType: WearableItemTypes.FacialHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 146,
        name: 'Imperial Moustache',
        itemType: WearableItemTypes.FacialHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 157,
        name: 'Lil Pump Goatee',
        itemType: WearableItemTypes.FacialHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 209,
        name: 'Horsehoe mustache',
        itemType: WearableItemTypes.FacialHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 219,
        name: 'Mutton Chops',
        itemType: WearableItemTypes.FacialHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 260,
        name: 'Beard of Wisdom',
        itemType: WearableItemTypes.FacialHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 295,
        name: 'Foker Beard',
        itemType: WearableItemTypes.FacialHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 66,
        name: 'Wizard Visor',
        itemType: WearableItemTypes.Glasses,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.VisionRange
        }
    },
    {
        id: 73,
        name: 'Jaay Glasses',
        itemType: WearableItemTypes.Glasses,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.VisionRange
        }
    },
    {
        id: 86,
        name: 'Monocle',
        itemType: WearableItemTypes.Glasses,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.VisionRange
        }
    },
    {
        id: 27,
        name: 'Marc Hair',
        itemType: WearableItemTypes.Hair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 33,
        name: 'Stani Hair',
        itemType: WearableItemTypes.Hair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 48,
        name: 'Xibot Mohawk',
        itemType: WearableItemTypes.Hair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 72,
        name: 'Jaay Hairpiece',
        itemType: WearableItemTypes.Hair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 218,
        name: 'Mohawk',
        itemType: WearableItemTypes.Hair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 1,
        name: 'Como Hat',
        itemType: WearableItemTypes.Hat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 4,
        name: 'Snow Como Hat',
        itemType: WearableItemTypes.Hat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 59,
        name: 'Aagent Fedora Hat',
        itemType: WearableItemTypes.Hat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 84,
        name: 'Gentelman Hat',
        itemType: WearableItemTypes.Hat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 97,
        name: 'Pillbox Hat',
        itemType: WearableItemTypes.Hat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 245,
        name: 'Gecko Hat',
        itemType: WearableItemTypes.Hat,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 92,
        name: 'Bedtime Milk',
        itemType: WearableItemTypes.HealthyBeverage,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 96,
        name: 'Water Bottle',
        itemType: WearableItemTypes.HealthyBeverage,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 118,
        name: 'Water Jug',
        itemType: WearableItemTypes.HealthyBeverage,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 119,
        name: 'Baby Bottle',
        itemType: WearableItemTypes.HealthyBeverage,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 122,
        name: 'Milkshake',
        itemType: WearableItemTypes.HealthyBeverage,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 123,
        name: 'Apple Juice',
        itemType: WearableItemTypes.HealthyBeverage,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 203,
        name: 'Gotchi Mug',
        itemType: WearableItemTypes.HealthyBeverage,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 82,
        name: 'Sushi Piece',
        itemType: WearableItemTypes.HealthyEdible,
        benefit: {
            first: WerableBenefitTypes.HPRegen,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 116,
        name: 'Coconut',
        itemType: WearableItemTypes.HealthyEdible,
        benefit: {
            first: WerableBenefitTypes.HPRegen,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 43,
        name: 'Eagle Armor',
        itemType: WearableItemTypes.HeavyArmor,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.ArmorPower
        }
    },
    {
        id: 105,
        name: 'Portal Mage Armor',
        itemType: WearableItemTypes.HeavyArmor,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.ArmorPower
        }
    },
    {
        id: 310,
        name: 'Plate Armor',
        itemType: WearableItemTypes.HeavyArmor,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.ArmorPower
        }
    },
    {
        id: 314,
        name: 'Yoroi Armor',
        itemType: WearableItemTypes.HeavyArmor,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.ArmorPower
        }
    },
    {
        id: 24,
        name: 'Thaave Helmet',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 87,
        name: 'Miner Helmet',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 104,
        name: 'Portal Mage Helmet',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 111,
        name: 'Hazmat Hood',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 206,
        name: 'Biker Helmet',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 252,
        name: 'Aastonaut Helmet',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 255,
        name: 'Space Helmet',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 298,
        name: 'Horned Helmet',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 309,
        name: 'Citaadel Helm',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 313,
        name: 'Kabuto Helmet',
        itemType: WearableItemTypes.Helmet,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 8,
        name: 'Marine Jacket',
        itemType: WearableItemTypes.Jacket,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 11,
        name: 'Link Mess Dress',
        itemType: WearableItemTypes.Jacket,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 34,
        name: 'Stani Vest',
        itemType: WearableItemTypes.Jacket,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 160,
        name: 'Lil Pump Threads',
        itemType: WearableItemTypes.Jacket,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 203,
        name: 'Gamer Jacket',
        itemType: WearableItemTypes.Jacket,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 207,
        name: 'Baker Jacket',
        itemType: WearableItemTypes.Jacket,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 222,
        name: 'Pirate Coat',
        itemType: WearableItemTypes.Jacket,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 141,
        name: 'Gemstone Ring',
        itemType: WearableItemTypes.Jewelry,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 142,
        name: 'Princess Tiara',
        itemType: WearableItemTypes.Jewelry,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 143,
        name: 'Gold Necklace',
        itemType: WearableItemTypes.Jewelry,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 147,
        name: 'Tiny Crown',
        itemType: WearableItemTypes.Jewelry,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 149,
        name: 'Royal Crown',
        itemType: WearableItemTypes.Jewelry,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 306,
        name: 'Flower Studs',
        itemType: WearableItemTypes.Jewelry,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 71,
        name: 'Red Santa Hat',
        itemType: WearableItemTypes.KnitHat,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 77,
        name: 'Bitcoin Beanie',
        itemType: WearableItemTypes.KnitHat,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 90,
        name: 'Pajama Hat',
        itemType: WearableItemTypes.KnitHat,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 108,
        name: 'Rasta Hat',
        itemType: WearableItemTypes.KnitHat,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 232,
        name: 'Poncho Hoodie',
        itemType: WearableItemTypes.KnitHat,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 235,
        name: 'Shaaman Hoodie',
        itemType: WearableItemTypes.KnitHat,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 22,
        name: 'Captain Aave Suit',
        itemType: WearableItemTypes.LightArmor,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 25,
        name: 'Thaave Suit',
        itemType: WearableItemTypes.LightArmor,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 293,
        name: 'Leather Tunic',
        itemType: WearableItemTypes.LightArmor,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 297,
        name: 'Animal Skins',
        itemType: WearableItemTypes.LightArmor,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 30,
        name: 'Jordan Hair',
        itemType: WearableItemTypes.LongHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 144,
        name: 'Princess Hair',
        itemType: WearableItemTypes.LongHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 145,
        name: 'Godli Locks',
        itemType: WearableItemTypes.LongHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 161,
        name: 'Lil Pump Dreads',
        itemType: WearableItemTypes.LongHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 242,
        name: 'Yellow Manbun',
        itemType: WearableItemTypes.LongHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 292,
        name: 'Brunette Ponitail',
        itemType: WearableItemTypes.LongHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 302,
        name: 'Geisha Headpiece',
        itemType: WearableItemTypes.LongHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 308,
        name: 'Red Hair',
        itemType: WearableItemTypes.LongHair,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 18,
        name: 'Aave Hero Mask',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 21,
        name: 'Captain Aave Mask',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 39,
        name: 'Foxy Mask',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 42,
        name: 'Eagle Mask',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 45,
        name: 'Ape Mask',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 199,
        name: 'Steampunk Goggles',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 199,
        name: 'Steampunk Goggles',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 202,
        name: 'VR Headset',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 211,
        name: 'Guy Fawkes Mask',
        itemType: WearableItemTypes.Mask,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 2,
        name: 'Como Pants',
        itemType: WearableItemTypes.Pants,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 5,
        name: 'Snow Como Pants',
        itemType: WearableItemTypes.Pants,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 68,
        name: 'Farmer Jeans',
        itemType: WearableItemTypes.Pants,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 78,
        name: 'Black Jeans',
        itemType: WearableItemTypes.Pants,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 88,
        name: 'Miner Jeans',
        itemType: WearableItemTypes.Pants,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 200,
        name: 'Steampunk Trousers',
        itemType: WearableItemTypes.Pants,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 230,
        name: 'Wraangler Jeans',
        itemType: WearableItemTypes.Pants,
        benefit: {
            first: WerableBenefitTypes.CarryingCapacity,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 47,
        name: 'Waifu Pillow',
        itemType: WearableItemTypes.Pillow,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 93,
        name: 'Fluffy Pillow',
        itemType: WearableItemTypes.Pillow,
        benefit: {
            first: WerableBenefitTypes.HPCapacity,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 233,
        name: 'Uncommon Cacti',
        itemType: WearableItemTypes.Plant,
        benefit: {
            first: WerableBenefitTypes.HPRegen,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 236,
        name: 'Blue Cacti',
        itemType: WearableItemTypes.Plant,
        benefit: {
            first: WerableBenefitTypes.HPRegen,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 237,
        name: 'Mythical Cacti',
        itemType: WearableItemTypes.Plant,
        benefit: {
            first: WerableBenefitTypes.HPRegen,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 238,
        name: 'Godlike Cacti',
        itemType: WearableItemTypes.Plant,
        benefit: {
            first: WerableBenefitTypes.HPRegen,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 112,
        name: 'Hazmat Suit',
        itemType: WearableItemTypes.ProtectiveSuit,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 253,
        name: 'Aastronaut Suit',
        itemType: WearableItemTypes.ProtectiveSuit,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 256,
        name: 'Lil Bubble Space Suit',
        itemType: WearableItemTypes.ProtectiveSuit,
        benefit: {
            first: WerableBenefitTypes.AlchemicaSpeed,
            second: WerableBenefitTypes.HPRegen
        }
    },
    {
        id: 50,
        name: 'GldnXross Robe',
        itemType: WearableItemTypes.Robe,
        benefit: {
            first: WerableBenefitTypes.APCapacity,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 81,
        name: 'Sushi Coat',
        itemType: WearableItemTypes.Robe,
        benefit: {
            first: WerableBenefitTypes.APCapacity,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 150,
        name: 'Royal Robes',
        itemType: WearableItemTypes.Robe,
        benefit: {
            first: WerableBenefitTypes.APCapacity,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 258,
        name: 'Taoist Robe',
        itemType: WearableItemTypes.Robe,
        benefit: {
            first: WerableBenefitTypes.APCapacity,
            second: WerableBenefitTypes.CarryingCapacity
        }
    },
    {
        id: 36,
        name: 'ETH Logo Glasses',
        itemType: WearableItemTypes.Shades,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 49,
        name: 'Coderdan Shades',
        itemType: WearableItemTypes.Shades,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 57,
        name: 'Aagent Shades',
        itemType: WearableItemTypes.Shades,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 117,
        name: 'Cool Shades',
        itemType: WearableItemTypes.Shades,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 159,
        name: 'Lil Pump Shades',
        itemType: WearableItemTypes.Shades,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 208,
        name: 'Aviators',
        itemType: WearableItemTypes.Shades,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 243,
        name: 'Tinted Shades',
        itemType: WearableItemTypes.Shades,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 246,
        name: 'APY Shades',
        itemType: WearableItemTypes.Shades,
        benefit: {
            first: WerableBenefitTypes.VisionRange,
            second: WerableBenefitTypes.APCapacity
        }
    },
    {
        id: 20,
        name: 'Aave Plush',
        itemType: WearableItemTypes.Shield,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 23,
        name: 'Captain Aave Shield',
        itemType: WearableItemTypes.Shield,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 312,
        name: 'Plate Shield',
        itemType: WearableItemTypes.Shield,
        benefit: {
            first: WerableBenefitTypes.ArmorPower,
            second: WerableBenefitTypes.HPCapacity
        }
    },
    {
        id: 29,
        name: 'REKT Sign',
        itemType: WearableItemTypes.Sign,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 32,
        name: 'Aave Flag',
        itemType: WearableItemTypes.Sign,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 75,
        name: 'OKex Sign',
        itemType: WearableItemTypes.Sign,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 110,
        name: 'Jamaican Flag',
        itemType: WearableItemTypes.Sign,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 134,
        name: 'L2 Sign',
        itemType: WearableItemTypes.Sign,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 137,
        name: 'Vote Sign',
        itemType: WearableItemTypes.Sign,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 247,
        name: 'Up Arrow',
        itemType: WearableItemTypes.Sign,
        benefit: {
            first: WerableBenefitTypes.Evasion,
            second: WerableBenefitTypes.Luck
        }
    },
    {
        id: 80,
        name: 'Sushi Bandana',
        itemType: WearableItemTypes.Sportswear,
        benefit: {
            first: WerableBenefitTypes.MovementSpeed,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 94,
        name: 'Sweatband',
        itemType: WearableItemTypes.Sportswear,
        benefit: {
            first: WerableBenefitTypes.MovementSpeed,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 95,
        name: 'Track Shorts',
        itemType: WearableItemTypes.Sportswear,
        benefit: {
            first: WerableBenefitTypes.MovementSpeed,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 125,
        name: 'Track Suit',
        itemType: WearableItemTypes.Sportswear,
        benefit: {
            first: WerableBenefitTypes.MovementSpeed,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 226,
        name: 'Red Headband',
        itemType: WearableItemTypes.Sportswear,
        benefit: {
            first: WerableBenefitTypes.MovementSpeed,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 226,
        name: '23 Jersey',
        itemType: WearableItemTypes.Sportswear,
        benefit: {
            first: WerableBenefitTypes.MovementSpeed,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 19,
        name: 'Aave Hero Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 37,
        name: 'ETH Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 46,
        name: 'Halfrekt Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 54,
        name: 'Llamacorn Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 56,
        name: 'Aagent Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 109,
        name: 'Rasta Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 135,
        name: 'Polygon Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 138,
        name: 'Snapshot Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 213,
        name: 'H4xx0r Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 220,
        name: 'Punk Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 241,
        name: 'WGMI Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 244,
        name: 'V-Neck Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 248,
        name: 'Up Only Shirt',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 250,
        name: 'CoinGecko Tee',
        itemType: WearableItemTypes.TShirt,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.RoadSpeed
        }
    },
    {
        id: 38,
        name: '32 ETH Coin',
        itemType: WearableItemTypes.Token,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 76,
        name: 'Big GHST Token',
        itemType: WearableItemTypes.Token,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 254,
        name: 'uGOTCHI Token',
        itemType: WearableItemTypes.Token,
        benefit: {
            first: WerableBenefitTypes.Luck,
            second: WerableBenefitTypes.AlchemicaSpeed
        }
    },
    {
        id: 216,
        name: 'Rainbow Vomit',
        itemType: WearableItemTypes.UnhealthyEdible,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 251,
        name: 'Candy Jaar',
        itemType: WearableItemTypes.UnhealthyEdible,
        benefit: {
            first: WerableBenefitTypes.APRegen,
            second: WerableBenefitTypes.APRegen
        }
    },
    {
        id: 35,
        name: 'Aave Boat',
        itemType: WearableItemTypes.Vehicle,
        benefit: {
            first: WerableBenefitTypes.RoadSpeed,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 79,
        name: 'Skateboard',
        itemType: WearableItemTypes.Vehicle,
        benefit: {
            first: WerableBenefitTypes.RoadSpeed,
            second: WerableBenefitTypes.MovementSpeed
        }
    },
    {
        id: 132,
        name: 'Dragon Wings',
        itemType: WearableItemTypes.Wings,
        benefit: {
            first: WerableBenefitTypes.MovementSpeed,
            second: WerableBenefitTypes.Evasion
        }
    },
    {
        id: 307,
        name: 'Fairy Wings',
        itemType: WearableItemTypes.Wings,
        benefit: {
            first: WerableBenefitTypes.MovementSpeed,
            second: WerableBenefitTypes.Evasion
        }
    },
    // weapons
    {
        id: 257,
        name: 'Bitcoin Guitar',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 296,
        name: 'Double-Sided Axe',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 315,
        name: 'Haanzo Katana',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 70,
        name: 'Handshaw',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 223,
        name: 'Hook Hand',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 201,
        name: 'Mechanical Claw',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 51,
        name: 'Mudgen Diamond',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 89,
        name: 'Pickaxe',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 69,
        name: 'Pitchfork',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 106,
        name: 'Portal Mage Axe',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 107,
        name: 'Portal Mage Black Axe',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 148,
        name: 'Royal Scepter',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 311,
        name: 'Spirit Sword',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 83,
        name: 'Spirit Sword',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 26,
        name: 'Thaave Hammer',
        itemType: WearableItemTypes.MeleeWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 58,
        name: 'Aagent Pistol',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 225,
        name: 'Basketball',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 294,
        name: 'Bow and Arrow',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 64,
        name: 'Common Wizard Staff',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 217,
        name: 'Energy Gun',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 130,
        name: 'Fireball',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 229,
        name: 'Lasso',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 65,
        name: 'Legendary Wizard Staff',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 17,
        name: 'Link Cube',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 299,
        name: 'Longbow',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 6,
        name: 'M67 Grenade',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 3,
        name: 'MK2 Grenade',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    },
    {
        id: 103,
        name: 'Witchy Wand',
        itemType: WearableItemTypes.RangedWeapon,
        benefit: {
            first: WerableBenefitTypes.Unknown,
            second: WerableBenefitTypes.Unknown
        }
    }
];
