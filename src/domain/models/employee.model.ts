import { z } from "zod";

export const EmployeeIdSchema = z.number().positive();
export type EmployeeIdModel = z.infer<typeof EmployeeIdSchema>;

export const EmployeeNameSchema = z.string().min(1);
export type EmployeeNameModel = z.infer<typeof EmployeeNameSchema>;

export const EmployeeSalarySchema = z.number().positive();
export type EmployeeSalaryModel = z.infer<typeof EmployeeSalarySchema>;


export const EmployeeSchema = z.object({
  id: EmployeeIdSchema,
  employee_name: EmployeeNameSchema,
  employee_salary: EmployeeSalarySchema,
});
export type EmployeeModel = z.infer<typeof EmployeeSchema>;

export const EmployeeListSchema = EmployeeSchema.array();
export type EmployeeListModel = z.infer<typeof EmployeeListSchema>;

const CreateEmployeeSalarySchema = z.string().min(1);
const CreateEmployeeAgeSchema = z.string().min(1);

export const CreateEmployeeSchema = z.object({
  name: EmployeeNameSchema,
  salary: CreateEmployeeSalarySchema,
  age: CreateEmployeeAgeSchema,
});

export type CreateEmployeeParams = z.infer<typeof CreateEmployeeSchema>;