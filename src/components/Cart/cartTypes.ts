export type UpdateItemProps = {
  id: string;
  size: string;
  quantity: number;
};
export type ShowQuantityProps = {
  itemId: string;
  itemSize: string;
  itemQuantity: number;
};
export type QuantityProps = {
  id: string;
  size: string;
  event: React.ChangeEvent<HTMLInputElement>;
  index: number;
};
