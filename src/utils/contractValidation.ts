import { z } from "zod";

export const contractRewardSchema = z.object({
  id: z.string(),
  description: z
    .string()
    .min(1, "Die Belohnung muss zwischen 1 und 100 Zeichen lang sein.")
    .max(100, "Die Belohnung muss zwischen 1 und 100 Zeichen lang sein."),
  amount: z
    .number()
    .int("Bitte gib eine ganze Zahl größer als 0 ein.")
    .positive("Bitte gib eine ganze Zahl größer als 0 ein."),
});

export const contractDataSchema = z.object({
  parentName: z
    .string()
    .min(1, "Bitte gib den Namen des Elternteils ein."),
  childName: z
    .string()
    .min(1, "Bitte gib den Namen des Kindes ein."),
  rewards: z
    .array(contractRewardSchema)
    .min(1, "Bitte füge mindestens eine Belohnung hinzu.")
    .max(7, "Maximal 7 Belohnungen möglich."),
  updatedAt: z.date(),
});

export type ContractReward = z.infer<typeof contractRewardSchema>;
export type ContractData = z.infer<typeof contractDataSchema>;

export type ContractValidationResult =
  | { success: true; data: ContractData }
  | { success: false; errors: z.ZodError };

export function validateContract(
  data: unknown
): ContractValidationResult {
  const result = contractDataSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}
