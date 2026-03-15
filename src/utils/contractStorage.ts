import {
  type ContractData,
  validateContract,
} from "./contractValidation";

const STORAGE_KEY = "contract.v1";

/**
 * Load contract from localStorage. Returns null if missing, invalid, or corrupt.
 */
export function loadContract(): ContractData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;

    const parsed: unknown = JSON.parse(raw);
    const result = validateContract(parsed);

    if (result.success) return result.data;
    return null;
  } catch {
    return null;
  }
}

/**
 * Save contract to localStorage. Only persists if data is valid.
 * Adds updatedAt automatically.
 */
export function saveContract(data: Omit<ContractData, "updatedAt">): void {
  const withTimestamp = {
    ...data,
    updatedAt: new Date(),
  };
  const result = validateContract(withTimestamp);
  if (!result.success) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
}
