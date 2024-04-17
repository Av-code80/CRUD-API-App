/**
 * EditEmployeePage Component
 * @description A form page for editing an existing employee's details. It fetches employee data based on the ID from the URL and allows updating their name, salary, and age.
 * @returns {React.Component} The React component for editing an employee.
 */
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { UpdateEmployeeParams } from "@/domain/models/employee.model";
import {
  useGetEmployeeById,
  useUpdateEmployee,
} from "@/domain/hooks/useEmployee.hook";

export default function EditEmployeePage() {
  const params = useParams();
  const employeeId = params.employeeId as string;
  const employeeIdNum = parseInt(employeeId, 10);
  const router = useRouter();

  // Fetch the employee details for editing
  const {
    data: employee,
    isLoading: isFetching,
    isError: isFetchError,
  } = useGetEmployeeById(employeeIdNum);

  // State initialization without the `id`
  const [form, setForm] = useState<Omit<UpdateEmployeeParams, "id">>({
    name: "",
    salary: "",
    age: "",
  });

  // Use the form fields without the `id` for the editable form fields

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.employee_name,
        salary: employee.employee_salary.toString(),
        age: employee.employee_age.toString(),
      });
    }
  }, [employee]);

  const { mutate: updateEmployee } = useUpdateEmployee();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateEmployee(
      {
        id: employeeIdNum,
        ...form,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (isFetching)
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="text-lg text-white font-bold bg-clip-text text-transparent bg-gradient-to-r from-custom-pink to-custom-orange animate-pulse">
          Loading...
        </div>
      </div>
    );

  if (isFetchError)
    return (
      <div className="flex h-screen justify-center items-center p-4">
        <div className="text-lg font-bold text-white bg-red-500 rounded-lg p-3 shadow-lg animate-pulse">
          Error fetching the employee data
        </div>
      </div>
    );

  return (
    <main className="flex flex-col h-screen items-center p-4 justify-center gap-10 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
      <h1 className="text-2xl font-bold text-sky-800 text-center">
        Edit Employee
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-1/2"
        aria-label="Edit Employee Form"
      >
        <div className="form-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-600"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input"
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-neutral-600"
          >
            Salary
          </label>
          <input
            type="text"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            className="input"
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-neutral-600"
          >
            Age
          </label>
          <input
            type="text"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="input"
            aria-required="true"
          />
        </div>
        <button type="submit" className="button-action-gradient">
          Update
        </button>
      </form>
    </main>
  );
}
