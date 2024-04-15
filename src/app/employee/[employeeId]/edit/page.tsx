/**
 * EditEmployeePage Component
 * @description A form page for editing an existing employee's details. It fetches employee data based on the ID from the URL and allows updating their name, salary, and age.
 * @returns {React.Component} The React component for editing an employee.
 */
"use client";
import React, { useState, useEffect } from "react";

export default function EditEmployeePage() {
  return (
    <main className="flex flex-col h-screen items-center p-4 justify-center gap-10 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
      <h1 className="text-2xl font-bold text-sky-800 text-center">
        Edit Employee
      </h1>
      <form className="space-y-4 w-1/2" aria-label="Edit Employee Form">
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
            className="mt-1 block w-full "
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md "
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md "
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md "
        >
          Update
        </button>
      </form>
    </main>
  );
}
