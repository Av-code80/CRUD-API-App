import { useMutation, useQuery } from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";
import {
  CreateEmployeeParams,
  EmployeeModel,
  UpdateEmployeeParams,
} from "../models/employee.model";

const service = EmployeeService.getInstance();

export const useGetEmployeeList = () => {
  return useQuery({
    queryKey: ["getEmployeeList"],
    queryFn: () => service.getEmployeeList(),
    staleTime: 1 * 60 * 1000,
  });
};

export const useGetEmployeeById = (employeeId: number) => {
  return useQuery({
    queryKey: ["getemployeeById", employeeId],
    queryFn: () => service.getEmployeeById({ id: employeeId }),
    staleTime: 1 * 60 * 1000,
  });
};

export const useCreateEmployee = () => {
  return useMutation<EmployeeModel, Error, CreateEmployeeParams>({
    mutationFn: (newEmployeeData: CreateEmployeeParams) =>
      service.createEmployee(newEmployeeData),
  });
};

export const useUpdateEmployee = () => {
  return useMutation<UpdateEmployeeParams, Error, UpdateEmployeeParams>({
    mutationFn: (params) => service.updateEmployeeById(params),
    onSuccess: () => {
      alert("Employee updated successfully.");
    },
    onError: (error) => {
      alert(`${error.message}`);
    },
  });
};

export const useDeleteEmployee = () => {
  return useMutation<void, Error, number>({
    mutationFn: async (employeeId) => {
      await service.deleteEmployeeById(employeeId);
    },
  });
};
