interface GuildChannelingEquippedInstallations {
  level: string;
}

export interface GuildChannelingActivity {
  timestamp: string;
  gotchiId: string;
  realmId: string;
  parcel: {
    owner: string;
    equippedInstallations: GuildChannelingEquippedInstallations[];
  };
  alchemica: string[];
  transaction: string;
}
