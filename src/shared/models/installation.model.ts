export interface InstallationItem {
    name: string;
    type: string;
    level: number;
    spillRadius: number;
    spillRate: number;
    craftTime: number;
    alchemicaCost: number[];
    cooldown: number;
    deprecated: boolean;
    width: number;
    height: number;
}
