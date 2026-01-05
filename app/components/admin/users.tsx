"use client";

import React, { useEffect, useState } from "react";

interface User {
  id: string;
  // Add other user properties based on your database schema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const AdminUsersView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simple fetch with basic error handling
        const response = await fetch("/api/admin/users");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);

        if (data.success && data.users) {
          setUsers(data.users);
        } else {
          throw new Error(data.error || "Failed to fetch users data");
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 users-view">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Case Number
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Name
              </th>
              {/* <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Registry Type
              </th> */}
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Date
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Phone
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Email
              </th>
              {/* <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                State
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                IRS Status
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                DOB
              </th> */}
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                SSN
              </th>
              {/*
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Address
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                City
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                ZIP
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Status
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                First Seen
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Last Seen
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Last Attempt
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Retry After
              </th> */}
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Transcripts Pulled
              </th>
              {/* <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Activities Created
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Activities Count
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Last Message
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Created At
              </th>
              <th className="px-4 py-2 border whitespace-nowrap font-semibold text-left">
                Updated At
              </th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.case_number} className="hover:bg-gray-50">
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.case_number}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">{`${
                  user.first_name
                } ${user.middle_name || ""} ${user.last_name}`}</td>

                {/* <td className="px-4 py-2 border whitespace-nowrap">
                  {user.registry_type}
                </td> */}
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.date}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.phone}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.email}
                </td>
                {/* <td className="px-4 py-2 border whitespace-nowrap">
                  {user.state}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.irs_logics_status}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.dob}
                </td> */}
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.ssn}
                </td>
                {/* <td className="px-4 py-2 border whitespace-nowrap">
                  {user.address}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.city}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.zip}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.status}
                </td> */}
                {/* <td className="px-4 py-2 border whitespace-nowrap">
                  {user.first_seen}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.last_seen}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.last_attempt_date}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.retry_after}
                </td> */}
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.transcripts_pulled ? "Yes" : "No"}
                </td>
                {/* <td className="px-4 py-2 border whitespace-nowrap">
                  {user.activities_created ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {user.activities_count || "-"}
                </td> */}
                {/* <td
                  className="px-4 py-2 border whitespace-nowrap max-w-md truncate"
                  title={user.last_attempt_message}
                >
                  {user.last_attempt_message}
                </td> */}
                {/* <td className="px-4 py-2 border whitespace-nowrap">
                  {new Date(user.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  {new Date(user.updated_at).toLocaleString()}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersView;
