import z from "zod";

export const TransactionSchema = z.object({
  totalAmount: z.number(),
  paymentMethod: z.enum(["CASH", "CHECK", "CARD"]),
  checkNumber: z.number().optional(),
  checkAmount: z.number().optional(),
  totalQuantityPurchased: z.number(),
  memberId: z.string(),
  purchasedProducts: z
    .object({
      productId: z.string(),
      purchaseQuantity: z.number(),
      price: z.number(),
      name: z.string(),
    })
    .array(),
});
