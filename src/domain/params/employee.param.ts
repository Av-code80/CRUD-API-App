import { z } from "zod";
import { EmployeeIdSchema } from "../models/employee.model";

export const GetEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;


