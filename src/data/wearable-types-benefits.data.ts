// @ts-ignore
import { WearableItemTypes, WerableBenefitTypes } from '../shared/constants/enums/wearable.enums.ts';
// @ts-ignore
import { WearableTypeBenefit } from '../shared/models/wearable.model.ts';

export const WEARABLES_TYPES_BENEFITS: WearableTypeBenefit[] = [
  {
    type: WearableItemTypes.Accessory,
    benefit: {
      first: WerableBenefitTypes.APCapacity,
      second: WerableBenefitTypes.Luck
    },
    ids: [99, 304]
  },
  {
    type: WearableItemTypes.AlcoholicBeverage,
    benefit: {
      first: WerableBenefitTypes.Luck,
      second: WerableBenefitTypes.HPCapacity
    },
    ids: [12, 120, 121, 124, 158]
  },
  {
    type: WearableItemTypes.Animal,
    benefit: {
      first: WerableBenefitTypes.AlchemicaSpeed,
      second: WerableBenefitTypes.APCapacity
    },
    ids: [40, 151, 152, 153, 154, 155, 156, 305]
  },
  {
    type: WearableItemTypes.Artifact,
    benefit: {
      first: WerableBenefitTypes.Luck,
      second: WerableBenefitTypes.HPRegen
    },
    ids: [44, 113]
  },
  {
    type: WearableItemTypes.Bag,
    benefit: {
      first: WerableBenefitTypes.CarryingCapacity,
      second: WerableBenefitTypes.CarryingCapacity
    },
    ids: [100]
  },
  {
    type: WearableItemTypes.BigHat,
    benefit: {
      first: WerableBenefitTypes.VisionRange,
      second: WerableBenefitTypes.HPRegen
    },
    ids: [60, 61, 62, 63, 67, 101, 221, 228]
  },
  {
    type: WearableItemTypes.BodyPart,
    benefit: {
      first: WerableBenefitTypes.HPCapacity,
      second: WerableBenefitTypes.APRegen
    },
    ids: [52, 131, 133, 140]
  },
  {
    type: WearableItemTypes.Cap,
    benefit: {
      first: WerableBenefitTypes.APRegen,
      second: WerableBenefitTypes.Luck
    },
    ids: [7, 10, 136, 139, 239, 300]
  },
  {
    type: WearableItemTypes.Comfywear,
    benefit: {
      first: WerableBenefitTypes.ArmorPower,
      second: WerableBenefitTypes.RoadSpeed
    },
    ids: [91, 231, 234]
  },
  {
    type: WearableItemTypes.Dress,
    benefit: {
      first: WerableBenefitTypes.CarryingCapacity,
      second: WerableBenefitTypes.APRegen
    },
    ids: [98, 102, 303]
  },
  {
    type: WearableItemTypes.DressShirt,
    benefit: {
      first: WerableBenefitTypes.ArmorPower,
      second: WerableBenefitTypes.HPRegen
    },
    ids: [15, 16, 114, 115]
  },
  {
    type: WearableItemTypes.DressSuit,
    benefit: {
      first: WerableBenefitTypes.CarryingCapacity,
      second: WerableBenefitTypes.HPRegen
    },
    ids: [28, 31, 74, 85]
  },
  {
    type: WearableItemTypes.Electronics,
    benefit: {
      first: WerableBenefitTypes.Evasion,
      second: WerableBenefitTypes.APRegen
    },
    ids: [9, 41, 55, 204, 212, 240, 261, 263]
  },
  {
    type: WearableItemTypes.Eye,
    benefit: {
      first: WerableBenefitTypes.VisionRange,
      second: WerableBenefitTypes.HPCapacity
    },
    ids: [14, 53, 214, 215, 224, 249, 259, 262, 301]
  },
  {
    type: WearableItemTypes.FacialHair,
    benefit: {
      first: WerableBenefitTypes.Evasion,
      second: WerableBenefitTypes.AlchemicaSpeed
    },
    ids: [13, 146, 157, 209, 219, 260, 295]
  },
  {
    type: WearableItemTypes.Glasses,
    benefit: {
      first: WerableBenefitTypes.VisionRange,
      second: WerableBenefitTypes.VisionRange
    },
    ids: [66, 73, 86]
  },
  {
    type: WearableItemTypes.Hair,
    benefit: {
      first: WerableBenefitTypes.Evasion,
      second: WerableBenefitTypes.HPRegen
    },
    ids: [27, 33, 48, 72, 218]
  },
  {
    type: WearableItemTypes.Hat,
    benefit: {
      first: WerableBenefitTypes.VisionRange,
      second: WerableBenefitTypes.APRegen
    },
    ids: [1, 4, 59, 84, 97, 245]
  },
  {
    type: WearableItemTypes.HealthyBeverage,
    benefit: {
      first: WerableBenefitTypes.HPCapacity,
      second: WerableBenefitTypes.HPCapacity
    },
    ids: [92, 96, 118, 119, 122, 123, 205]
  },
  {
    type: WearableItemTypes.HealthyEdible,
    benefit: {
      first: WerableBenefitTypes.HPRegen,
      second: WerableBenefitTypes.HPRegen
    },
    ids: [82, 116]
  },
  {
    type: WearableItemTypes.HeavyArmor,
    benefit: {
      first: WerableBenefitTypes.ArmorPower,
      second: WerableBenefitTypes.ArmorPower
    },
    ids: [43, 105, 310, 314]
  },
  {
    type: WearableItemTypes.Helmet,
    benefit: {
      first: WerableBenefitTypes.ArmorPower,
      second: WerableBenefitTypes.APCapacity
    },
    ids: [24, 87, 104, 111, 206, 252, 255, 298, 309, 313]
  },
  {
    type: WearableItemTypes.Jacket,
    benefit: {
      first: WerableBenefitTypes.CarryingCapacity,
      second: WerableBenefitTypes.HPCapacity
    },
    ids: [8, 11, 34, 160, 203, 207, 222]
  },
  {
    type: WearableItemTypes.Jewelry,
    benefit: {
      first: WerableBenefitTypes.Luck,
      second: WerableBenefitTypes.CarryingCapacity
    },
    ids: [141, 142, 143, 147, 149, 306]
  },
  {
    type: WearableItemTypes.KnitHat,
    benefit: {
      first: WerableBenefitTypes.HPCapacity,
      second: WerableBenefitTypes.MovementSpeed
    },
    ids: [71, 77, 90, 108, 232, 235]
  },
  {
    type: WearableItemTypes.LightArmor,
    benefit: {
      first: WerableBenefitTypes.ArmorPower,
      second: WerableBenefitTypes.MovementSpeed
    },
    ids: [22, 25, 293, 297]
  },
  {
    type: WearableItemTypes.LongHair,
    benefit: {
      first: WerableBenefitTypes.Evasion,
      second: WerableBenefitTypes.HPCapacity
    },
    ids: [30, 144, 145, 161, 242, 292, 302, 308]
  },
  {
    type: WearableItemTypes.Mask,
    benefit: {
      first: WerableBenefitTypes.Evasion,
      second: WerableBenefitTypes.Evasion
    },
    ids: [18, 21, 39, 42, 45, 199, 202, 211]
  },
  {
    type: WearableItemTypes.Pants,
    benefit: {
      first: WerableBenefitTypes.CarryingCapacity,
      second: WerableBenefitTypes.MovementSpeed
    },
    ids: [2, 5, 68, 78, 88, 200, 230]
  },
  {
    type: WearableItemTypes.Pillow,
    benefit: {
      first: WerableBenefitTypes.HPCapacity,
      second: WerableBenefitTypes.HPRegen
    },
    ids: [47, 93]
  },
  {
    type: WearableItemTypes.Plant,
    benefit: {
      first: WerableBenefitTypes.HPRegen,
      second: WerableBenefitTypes.APRegen
    },
    ids: [233, 236, 237, 238]
  },
  {
    type: WearableItemTypes.ProtectiveSuit,
    benefit: {
      first: WerableBenefitTypes.AlchemicaSpeed,
      second: WerableBenefitTypes.HPRegen
    },
    ids: [112, 253, 256]
  },
  {
    type: WearableItemTypes.Robe,
    benefit: {
      first: WerableBenefitTypes.APCapacity,
      second: WerableBenefitTypes.CarryingCapacity
    },
    ids: [50, 81, 150, 258]
  },
  {
    type: WearableItemTypes.Shades,
    benefit: {
      first: WerableBenefitTypes.VisionRange,
      second: WerableBenefitTypes.APCapacity
    },
    ids: [36, 49, 57, 117, 159, 208, 243, 246]
  },
  {
    type: WearableItemTypes.Shield,
    benefit: {
      first: WerableBenefitTypes.ArmorPower,
      second: WerableBenefitTypes.HPCapacity
    },
    ids: [20, 23, 312]
  },
  {
    type: WearableItemTypes.Sign,
    benefit: {
      first: WerableBenefitTypes.Evasion,
      second: WerableBenefitTypes.Luck
    },
    ids: [29, 32, 75, 110, 134, 137, 247]
  },
  {
    type: WearableItemTypes.Sportswear,
    benefit: {
      first: WerableBenefitTypes.MovementSpeed,
      second: WerableBenefitTypes.APRegen
    },
    ids: [80, 94, 95, 125, 226, 227]
  },
  {
    type: WearableItemTypes.TShirt,
    benefit: {
      first: WerableBenefitTypes.APRegen,
      second: WerableBenefitTypes.RoadSpeed
    },
    ids: [19, 37, 46, 54, 56, 109, 135, 138, 213, 220, 241, 244, 248, 250]
  },
  {
    type: WearableItemTypes.Token,
    benefit: {
      first: WerableBenefitTypes.Luck,
      second: WerableBenefitTypes.AlchemicaSpeed
    },
    ids: [38, 76, 254]
  },
  {
    type: WearableItemTypes.UnhealthyEdible,
    benefit: {
      first: WerableBenefitTypes.APRegen,
      second: WerableBenefitTypes.APRegen
    },
    ids: [216, 251]
  },
  {
    type: WearableItemTypes.Vehicle,
    benefit: {
      first: WerableBenefitTypes.RoadSpeed,
      second: WerableBenefitTypes.MovementSpeed
    },
    ids: [35, 79]
  },
  {
    type: WearableItemTypes.Wings,
    benefit: {
      first: WerableBenefitTypes.MovementSpeed,
      second: WerableBenefitTypes.Evasion
    },
    ids: [132, 307]
  },
  // weapons
  {
    type: WearableItemTypes.MeleeWeapon,
    benefit: {
      first: WerableBenefitTypes.Unknown,
      second: WerableBenefitTypes.Unknown
    },
    ids: [26, 51, 69, 70, 83, 89, 106, 107, 148, 201, 223, 257, 296, 311, 315]
  },
  {
    type: WearableItemTypes.RangedWeapon,
    benefit: {
      first: WerableBenefitTypes.Unknown,
      second: WerableBenefitTypes.Unknown
    },
    ids: [3, 6, 17, 58, 64, 65, 103, 130, 217, 225, 229, 294, 299]
  }
];
