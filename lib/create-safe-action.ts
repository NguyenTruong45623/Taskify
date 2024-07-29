import { promises } from "dns";
import { validateHeaderName } from "http";
import { date, Schema, z } from "zod";

export type FieldErrors<T> = {
    [k in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
};

export const createSafeAction = <TInput, TOutPut>(
    schema: z.Schema<TInput>,
    handler: (validateDData: TInput) => Promise<ActionState<TInput, TOutPut>>
) => {
    return async (date: TInput): Promise<ActionState<TInput, TOutPut>> => {
        const validationResult = schema.safeParse(date);
        if (!validationResult.success) {
            return {
                fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
            };
        }

        return handler(validationResult.data);
    };
};