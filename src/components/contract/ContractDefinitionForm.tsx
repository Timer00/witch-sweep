import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, ChevronUp, Pencil, Trash2, X } from "lucide-react";
import { coin } from "@/assets";
import {
  contractFormSchema,
  type ContractFormData,
} from "@/utils/contractValidation";

const MAX_REWARDS = 7;

interface ContractDefinitionFormProps {
  defaultValues: ContractFormData;
  onSave: (data: ContractFormData) => void;
  onDirtyChange?: (dirty: boolean) => void;
}

const ContractDefinitionForm = ({
  defaultValues,
  onSave,
  onDirtyChange,
}: ContractDefinitionFormProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<{
    description: string;
    amount: number;
  } | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractFormSchema),
    defaultValues,
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "rewards",
  });

  const rewards = watch("rewards");
  const atLimit = fields.length >= MAX_REWARDS;

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const startAdd = () => {
    if (atLimit) return;
    setEditingIndex(-1);
    setDraft({ description: "", amount: 1 });
  };

  const startEdit = (index: number) => {
    const r = rewards[index];
    if (!r) return;
    setEditingIndex(index);
    setDraft({ description: r.description, amount: r.amount });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setDraft(null);
  };

  const confirmDraft = () => {
    if (!draft) return;
    const desc = draft.description.trim();
    if (!desc || draft.amount < 1) return;

    if (editingIndex === -1) {
      append({
        id: crypto.randomUUID(),
        description: desc,
        amount: Math.floor(draft.amount),
      });
    } else if (editingIndex !== null) {
      update(editingIndex, {
        id: rewards[editingIndex].id,
        description: desc,
        amount: Math.floor(draft.amount),
      });
    }
    setEditingIndex(null);
    setDraft(null);
  };

  const handleDelete = (index: number) => {
    remove(index);
    if (editingIndex === index) {
      setEditingIndex(null);
      setDraft(null);
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-6">
      <section>
        <h2 className="mb-2 text-center font-semibold">
          Belohnungen ({fields.length}/{MAX_REWARDS})
        </h2>

        <div className="mb-3">
          {editingIndex === -1 && draft ? (
            <div className="flex items-center gap-2 rounded border border-black/30 bg-white p-2">
              <input
                type="text"
                value={draft.description}
                onChange={(e) =>
                  setDraft((d) => (d ? { ...d, description: e.target.value } : null))
                }
                placeholder="Belohnung…"
                className="min-w-0 flex-1 rounded border border-black/30 px-2 py-1"
                maxLength={100}
                autoFocus
              />
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() =>
                    setDraft((d) =>
                      d ? { ...d, amount: Math.max(1, d.amount - 1) } : null
                    )
                  }
                  className="rounded border border-black/30 p-0.5 hover:bg-black/5"
                  aria-label="Menge verringern"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min={1}
                  value={draft.amount}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d!,
                      amount: Math.max(1, parseInt(e.target.value, 10) || 1),
                    }))
                  }
                  className="w-14 rounded border border-black/30 px-1 py-0.5 text-center"
                />
                <button
                  type="button"
                  onClick={() =>
                    setDraft((d) => (d ? { ...d, amount: d.amount + 1 } : null))
                  }
                  className="rounded border border-black/30 p-0.5 hover:bg-black/5"
                  aria-label="Menge erhöhen"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={confirmDraft}
                className="rounded border-2 border-black bg-black p-1.5 text-white hover:bg-black/90"
                aria-label="Bestätigen"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded border-2 border-black p-1.5 hover:bg-black/5"
                aria-label="Abbrechen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              className={`group relative w-full ${atLimit ? "cursor-not-allowed" : ""}`}
            >
              <button
                type="button"
                onClick={startAdd}
                disabled={atLimit}
                className="w-full rounded border-2 border-dashed border-black/50 px-4 py-2 font-medium hover:border-black hover:bg-black/5 disabled:opacity-60"
              >
                Neu hinzufügen +
              </button>
              {atLimit && (
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Maximal 7 Belohnungen.
                </div>
              )}
            </div>
          )}
        </div>

        <ul className="space-y-2">
          {fields.map((field, index) => (
            <li
              key={field.id}
              className="rounded border border-black/20 bg-white/50"
            >
              {editingIndex === index && draft ? (
                <div className="flex items-center gap-2 p-2">
                  <input
                    type="text"
                    value={draft.description}
                    onChange={(e) =>
                      setDraft((d) =>
                        d ? { ...d, description: e.target.value } : null
                      )
                    }
                    placeholder="Belohnung…"
                    className="min-w-0 flex-1 rounded border border-black/30 px-2 py-1"
                    maxLength={100}
                    autoFocus
                  />
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        setDraft((d) =>
                          d ? { ...d, amount: Math.max(1, d.amount - 1) } : null
                        )
                      }
                      className="rounded border border-black/30 p-0.5 hover:bg-black/5"
                      aria-label="Menge verringern"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={draft.amount}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d!,
                          amount: Math.max(
                            1,
                            parseInt(e.target.value, 10) || 1
                          ),
                        }))
                      }
                      className="w-14 rounded border border-black/30 px-1 py-0.5 text-center"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setDraft((d) =>
                          d ? { ...d, amount: d.amount + 1 } : null
                        )
                      }
                      className="rounded border border-black/30 p-0.5 hover:bg-black/5"
                      aria-label="Menge erhöhen"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={confirmDraft}
                    className="rounded border-2 border-black bg-black p-1.5 text-white hover:bg-black/90"
                    aria-label="Bestätigen"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded border-2 border-black p-1.5 hover:bg-black/5"
                    aria-label="Abbrechen"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="flex flex-1 items-center gap-2 truncate">
                    <span className="truncate">
                      {rewards[index]?.description} | {rewards[index]?.amount}
                    </span>
                    <img
                      src={coin}
                      alt=""
                      className="h-5 w-5 shrink-0"
                      aria-hidden
                    />
                  </span>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(index)}
                      className="rounded p-1 hover:bg-black/10"
                      aria-label="Bearbeiten"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="rounded p-1 hover:bg-black/10"
                      aria-label="Löschen"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {errors.rewards?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.rewards.message}</p>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div>
          <label htmlFor="parentName" className="block text-sm font-medium">
            Name des Elternteils
          </label>
          <input
            id="parentName"
            {...register("parentName")}
            className="mt-1 w-full rounded border border-black/30 px-3 py-2"
            placeholder="Name eingeben…"
          />
          {errors.parentName?.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.parentName.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="childName" className="block text-sm font-medium">
            Name des Kindes
          </label>
          <input
            id="childName"
            {...register("childName")}
            className="mt-1 w-full rounded border border-black/30 px-3 py-2"
            placeholder="Name eingeben…"
          />
          {errors.childName?.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.childName.message}
            </p>
          )}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded border-2 border-black bg-black px-6 py-3 font-semibold text-white hover:bg-black/90"
        >
          <Check className="h-5 w-5" />
          Speichern
        </button>
      </div>
    </form>
  );
};

export default ContractDefinitionForm;
