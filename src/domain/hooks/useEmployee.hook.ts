import {
  useMutation,
  useQueryClient,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import EmployeeService from "../services/employee.service";
import {
  CreateEmployeeParams,
  EmployeeListModel,
  EmployeeModel,
  UpdateEmployeeParams,
} from "../models/employee.model";
import { queryClient } from "@/app/layout";

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
    onSuccess: (newData) => {
      // Update the employee list in the cache
      queryClient.setQueriesData<EmployeeListModel>(
        { queryKey: ["getEmployeeList"] }, 
        (oldList: EmployeeListModel | undefined) => {
          const updatedList = oldList ? [...oldList, newData] : [newData];
          return updatedList;
        }
      );
    },
  });
};

export const useUpdateEmployee = () => {
  return useMutation<UpdateEmployeeParams, Error, UpdateEmployeeParams>({
    mutationFn: (params) => service.updateEmployeeById(params),
    onSuccess: (newData) => {
      alert("Employee updated successfully");
      // updateEmployeeById
      queryClient.setQueryData(["getEmployeeById", newData.id], newData);
      // updateEmployeeList
      queryClient.setQueriesData<EmployeeListModel>(
        { queryKey: ["getEmployeeList"] },
        (prevList: EmployeeListModel | undefined) => {
          return (
            prevList?.map((emp) =>
              emp.id === newData.id ? { ...emp, ...newData } : emp
            ) ?? []
          );
        }
      );
    },
    onError: (error) => {
      alert(`${error.message}`);
    },
  });
};

export const useDeleteEmployee = (id: number) => {
  return useMutation<void, Error, number>({
    mutationFn: async (employeeId) => {
      await service.deleteEmployeeById(employeeId);
    },
    onSuccess: () => {
      alert("Employee removed successfully");
      queryClient.setQueriesData<EmployeeListModel>(
        { queryKey: ["getEmployeeList"] },
        (prevList: EmployeeListModel | undefined) => {
          return prevList?.filter((emp) => emp.id !== id) ?? [];
        }
      );
    },
  });
};
