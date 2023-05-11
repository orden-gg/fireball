export interface Guild {
  id: string;
  safeAddress: string;
  name: string;
  description: string;
  logo: string;
  members: {
    id: string;
  }[];
}
