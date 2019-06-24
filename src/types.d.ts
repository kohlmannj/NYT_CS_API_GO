export type OrderDimension = 'cat_type' | 'order_overall' | 'section';

export interface OrderDatum<V extends OrderDimension = OrderDimension, T extends number = number> {
  order_id: T;
  dimension: V;
  dimension_details: string;
  Dimension_CTR: number;
  Industry_CTR?: number;
}

export type OrderData<
  V extends OrderDimension = OrderDimension,
  T extends number = number
> = OrderDatum<V, T>[];
