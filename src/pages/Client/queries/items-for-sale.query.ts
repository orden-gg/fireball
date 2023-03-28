export const erc721ListingsBySellerQuery = (seller: string): string => {
  return `{
    erc721Listings(
      where: {
        seller: "${seller}"
        cancelled: false
        timePurchased: 0
      }
    )
    {
      id
      tokenId
      category
      priceInWei
      gotchi {
        id
        name
        numericTraits
        modifiedNumericTraits
        withSetsNumericTraits
        baseRarityScore
        modifiedRarityScore
        withSetsRarityScore
        kinship
        toNextLevel
        level
        experience
        equippedWearables
        collateral
        hauntId
        createdAt
        possibleSets
        equippedSetID
        equippedSetName
        usedSkillPoints
        listings(
          where: {
            cancelled: false
            timePurchased: 0
          }
        ) {
          id
          priceInWei
        }
        historicalPrices
      }
      portal {
        hauntId
        historicalPrices
        activeListing
      }
    }
  }`;
};

// TODO should be removed after full integration of fireball gotchiverse graph.
export const realmListingsBySellerQuery = (seller: string): string => {
  return `{
    erc721Listings(
      where: {
        seller: "${seller}"
        cancelled: false
        timePurchased: 0
        category: 4
      }
    )
    {
      id
      tokenId
      category
      priceInWei
      parcel {
        id
        parcelId
        parcelHash
        coordinateX
        coordinateY
        district
        fudBoost
        fomoBoost
        alphaBoost
        kekBoost
        size
        auctionId
        historicalPrices
        owner {
          id
        }
        alchemica
        surveys {
          id
          surveyed
          parcel
          round
          fud
          fomo
          alpha
          kek
        }
        installations {
          installationId
        }
        tiles {
          tileId
        }
      }
    }
  }`;
};

export const erc1155ListingsBySellerQuery = (seller: string): string => {
  return `{
    erc1155Listings(
      where: {
        seller: "${seller}"
        cancelled: false
        timeLastPurchased: 0
      }
    )
    {
      id
      erc1155TypeId
      category
      quantity
      priceInWei
      rarityLevel
    }
  }`;
};
