import { z } from "zod";

// Define schemas for basic employee attributes
export const EmployeeIdSchema = z.number().positive();
export type EmployeeIdModel = z.infer<typeof EmployeeIdSchema>;

export const EmployeeNameSchema = z.string().min(1);
export type EmployeeNameModel = z.infer<typeof EmployeeNameSchema>;

export const EmployeeSalarySchema = z.number().positive();
export type EmployeeSalaryModel = z.infer<typeof EmployeeSalarySchema>;

export const EmployeeAgeSchema = z.number().positive();
export type EmployeeAgeModel = z.infer<typeof EmployeeAgeSchema>;

// Define complex schemas using the basic ones
export const EmployeeSchema = z.object({
  id: EmployeeIdSchema,
  employee_name: EmployeeNameSchema,
  employee_salary: EmployeeSalarySchema,
  employee_age: EmployeeAgeSchema,
});
export type EmployeeModel = z.infer<typeof EmployeeSchema>;

export const EmployeeListSchema = EmployeeSchema.array();
export type EmployeeListModel = z.infer<typeof EmployeeListSchema>;

// Schemas for creating and updating employees
const CreateEmployeeSalarySchema = z.string().min(1);
const CreateEmployeeAgeSchema = z.string().min(1);

export const CreateEmployeeSchema = z.object({
  name: EmployeeNameSchema,
  salary: CreateEmployeeSalarySchema,
  age: CreateEmployeeAgeSchema,
});
export type CreateEmployeeParams = z.infer<typeof CreateEmployeeSchema>;

export const UpdateEmployeeSchema = z.object({
  id: EmployeeIdSchema,
  name: EmployeeNameSchema,
  salary: CreateEmployeeSalarySchema,
  age: CreateEmployeeAgeSchema,
});
export type UpdateEmployeeParams = z.infer<typeof UpdateEmployeeSchema>;

// Schema for fetching an employee by ID
export const GetEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;
