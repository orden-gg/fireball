export interface ContractTicket {
  balance: number;
  id: number;
  name: string;
}

export interface ClientTicket extends ContractTicket {
  priceInWei?: string;
}
