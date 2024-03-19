import z from "zod";

export const TransactionSchema = z.object({
  totalAmount: z.number(),
  paymentMethod: z.enum(["CASH", "CARD", "CHECK"]),
  memberId: z.string().optional(),
  products: z
    .object({
      id: z.string(),
    })
    .array(),
});
