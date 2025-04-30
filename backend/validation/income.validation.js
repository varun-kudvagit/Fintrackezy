import { z } from "zod";

export const iconSchema = z.string().trim().optional();

const sourceSchema = z.string().trim().min(1, "Income Source can't be empty");

export const amountSchema = z
  .number()
  .min(0.01, "Amount must be at least 0.01")
  .max(1000000, "Amount can't exceed 1,000,000")
  .positive("Amount must be a positive number")
  .finite("Amount must be a valid number")
  .safe("Amount must be a safe number")
  .refine((value) => Number(value.toFixed(2)) === value, {
    message: "Amount can have up to 2 decimal places only",
  });

export const dateSchema = z
  .string()
  .trim()
  .min(1, "Date cannot be empty")
  .refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date format. Use YYYY-MM-DD",
  })
  .refine(
    (value) => {
      const date = new Date(value);
      return (
        date.getFullYear() >= 1900 &&
        date.getFullYear() <= new Date().getFullYear()
      );
    },
    {
      message: "Date must be between 1900 and the current year",
    }
  )
  .refine(
    (value) => {
      const inputDate = new Date(value);
      return inputDate <= new Date();
    },
    {
      message: "Date cannot be in the future",
    }
  );

export const addIncomeSchema = z.object({
  icon: iconSchema,
  source: sourceSchema,
  amount: amountSchema,
  date: dateSchema,
});
