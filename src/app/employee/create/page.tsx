/**
 * CreateEmployeePage Component
 * @description Provides a form to create a new employee. It handles state management, form submission, and user feedback for errors.
 * @returns {React.Component} The React component for creating an employee.
 */

"use client";
import { useCreateEmployee } from "@/domain/hooks/useEmployee.hook";
import { CreateEmployeeParams } from "@/domain/models/employee.model";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateEmployeePage() {
  const router = useRouter();
  const { mutate: createEmployee, isError, error } = useCreateEmployee();
  const [form, setForm] = useState<CreateEmployeeParams>({
    name: "",
    salary: "",
    age: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createEmployee(form, {
      onSuccess: () => router.push("/"),
      onError: (error) => {
        alert(`Error deleting employee: ${error.message}`);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  if (isError && error instanceof Error) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="bg-red-500 text-white font-bold rounded-lg p-3 shadow-lg animate-pulse">
          {error.message}
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen justify-center items-center p-4 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4 text-sky-800 text-center">
          Create Employee
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-600">
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
          <div>
            <label className="block text-sm font-medium text-neutral-600">
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
          <div>
            <label className="block text-sm font-medium text-neutral-600">
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
            Create
          </button>
        </form>
      </div>
    </main>
  );
}
