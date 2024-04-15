import { useMutation } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";
import { CreateEmployeeParams, EmployeeModel } from "../models/employee.model";

const service = EmployeeService.getInstance();

export const useCreateEmployee = () => {
  return useMutation<EmployeeModel, Error, CreateEmployeeParams>({
    mutationFn: (newEmployeeData: CreateEmployeeParams) =>
      service.createEmployee(newEmployeeData),
  });
};
