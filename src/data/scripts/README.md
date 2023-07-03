### Before start
1. Create `.env` file with provided `OPERATOR_PRIVATE_KEY` (see `.env.example`)
2. Adjust `scripts.toml` for your addresses and needs

### How to run
`yarn script <script_name>`
<br/>
*e.g.* `yarn script claim`

### Lending scripts
* `lend` - list gotchis
* `claim` - claim tokens or claim and finish
* `agree` - agree on active lendings by `whitelist_id`

### Pet scripts
* `pet` - pet `PET_ADDRESS` gotchis
* `pet-batch` - same as pet script but for the multiple addresses

### Data scripts
* `items` - retrieve last combined items data and write it to ***data/items.data.json***
* `tiles` - retrieve last combined tiles data and write it to ***data/tiles.data.json***
* `installations` - retrieve last combined installations data and write it to ***data/installations.data.json***
* `sets` - retrieve last combined sets data and write it to ***data/sets.data.json***
