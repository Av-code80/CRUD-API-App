import { useMutation } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";
import { UpdateEmployeeParams, EmployeeModel } from "../models/employee.model";

const service = EmployeeService.getInstance();

export const useUpdateEmployee = () => {
  return useMutation<EmployeeModel, Error, UpdateEmployeeParams>({
    mutationFn: (params) => service.updateEmployeeById(params),
    onSuccess: () => {
      alert("Employee updated successfully.");
    },
    onError: (error) => {
      alert(`${error.message}`);
    },
  });
};
