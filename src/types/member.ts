import z from "zod";

export const MemberSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  phoneNumber: z.string(),
  owedBalance: z.number().optional(),
});

export const MemberPhoneNumber = z.object({
  phoneNumber: z.string(),
});

export const MemberAddress = z.object({
  address: z.string(),
});
