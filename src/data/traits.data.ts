import { TraitsDefinitionsIds } from 'shared/constants';
import { TraitsDefinition, TraitsEffect } from 'shared/models';

export const traitsDefinitions: TraitsDefinition[] = [
  {
    name: 'HP Capacity',
    info: 'A gotchi’s base level of hit points (HP). A powerful trait to specialize in, as moar HP also means moar stamina for sprinting through the battlefield.'
  },
  {
    name: 'AP Capacity',
    info: 'A gotchi’s base level of action points (AP). Every physical attack, spell and ability (including teleportation) in the Gotchiverse will require the consumption of AP. The moar AP a gotchi has, the moar consecutive abilities they can unleash. Uber abilities will also require moar AP to execute so if you don’t know any high NRG gotchis yet, we suggest you start networking!'
  },
  {
    name: 'Defense Power',
    info: 'Determines a gotchi’s base level of “toughness” and also dictates the effectiveness of the armor they have equipped. E.g. If you were to equip magic type armor on your gotchi, high Defense Power would increase the base magical resistance of that armor.'
  },
  {
    name: 'Action Speed',
    info: 'Different physical attacks, spells and abilities will all have different base cool down durations in the Gotchiverse. The higher a gotchi’s action speed, the shorter these cooldown durations become.'
  },
  {
    name: 'Regen (HP & AP)',
    info: 'Gotchis at the low end of the SPK spectrum are more cuddly and introverted than their high SPK siblings. As a result, they tend to concentrate their energy on themselves and can quickly regenerate HP & AP. A truly useful personal aid!'
  },
  {
    name: 'Ethereality',
    info: '“Ethereality” aka “Ghastly Charm” is a gotchis natural ability to tap into the unseen spectral forces within the Gotchiverse. A gotchi with high ethereality exerts influence on its surroundings to improve its chances of evading attacks, landing critical strikes, slipping through walls and producing favorable outcomes in nearly all chance based actions throughout the Gotchiverse. Some call them “Lucky”… most call them “Degens”…'
  },
  {
    name: 'Melee Power',
    info: 'Determines the strength of melee abilities (hand wearables only at present) when equipped by a gotchi. Influences not only the strength of melee hand wearables with damage abilities but also the strength of melee hand wearables with restorative, buff or debuff abilities.'
  },
  {
    name: 'Ranged Power',
    info: 'Determines the strength of ranged abilities (ranged hand wearables only at present) when equipped by a gotchi. Influences not only the strength of ranged hand wearables with damage abilities but also the strength of ranged hand wearables with restorative, buff or debuff abilities.'
  },
  {
    name: 'TBC',
    info: 'To be confirmed'
  }
];

export const traitsEffects: TraitsEffect[][] = [
  [
    ['Physical', [-200, 49], [TraitsDefinitionsIds.HPCapacity], [TraitsDefinitionsIds.APCapacity]],
    ['Mage', [51, 200], [TraitsDefinitionsIds.APCapacity], [TraitsDefinitionsIds.HPCapacity]]
  ],
  [
    ['Tank', [-200, 49], [TraitsDefinitionsIds.DefensePower], [TraitsDefinitionsIds.ActionSpeed]],
    ['DPS', [51, 200], [TraitsDefinitionsIds.ActionSpeed], [TraitsDefinitionsIds.DefensePower]]
  ],
  [
    ['Regen', [-200, 49], [TraitsDefinitionsIds.Regen], [TraitsDefinitionsIds.Ethereality]],
    ['Degen', [51, 200], [TraitsDefinitionsIds.Ethereality], [TraitsDefinitionsIds.Regen]]
  ],
  [
    ['Melee', [-200, 49], [TraitsDefinitionsIds.MeleePower], [TraitsDefinitionsIds.RangedPower]],
    ['Ranged', [51, 200], [TraitsDefinitionsIds.RangedPower], [TraitsDefinitionsIds.MeleePower]]
  ],
  [
    ['TBC', [0, 49], [TraitsDefinitionsIds.TBC], [TraitsDefinitionsIds.TBC]],
    ['TBC', [51, 99], [TraitsDefinitionsIds.TBC], [TraitsDefinitionsIds.TBC]]
  ],
  [
    ['TBC', [0, 49], [TraitsDefinitionsIds.TBC], [TraitsDefinitionsIds.TBC]],
    ['TBC', [51, 99], [TraitsDefinitionsIds.TBC], [TraitsDefinitionsIds.TBC]]
  ]
];
