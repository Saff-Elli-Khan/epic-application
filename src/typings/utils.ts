export type DropFirstParameter<T extends unknown[]> = T extends [
  any,
  ...(infer U)
]
  ? U
  : never;
