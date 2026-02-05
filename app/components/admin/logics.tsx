"use client";

import React, { useEffect, useState, useRef } from "react";

interface User {
  id: string;
  [key: string]: unknown;
}

// Field configuration - all available fields with display labels
const ALL_FIELDS = [
  { key: "case_number", label: "Case Number" },
  { key: "name", label: "Name" },
  { key: "first_name", label: "First Name" },
  { key: "middle_name", label: "Middle Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "date", label: "Date" },
  { key: "dob", label: "DOB" },
  { key: "ssn", label: "SSN" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zip", label: "ZIP" },
  { key: "registry_type", label: "Registry Type" },
  { key: "status", label: "Status" },
  { key: "status_id", label: "Status ID" },
  { key: "irs_logics_status", label: "IRS Logics Status" },
  { key: "tax_type", label: "Tax Types" },
  { key: "marital_status", label: "Marital Status" },
  { key: "first_seen", label: "First Seen" },
  { key: "last_seen", label: "Last Seen" },
  { key: "last_attempt_date", label: "Last Attempt Date" },
  { key: "last_attempt_message", label: "Last Attempt Message" },
  { key: "retry_after", label: "Retry After" },
  { key: "transcripts_pulled", label: "Transcripts Pulled" },
  { key: "activities_created", label: "Activities Created" },
  { key: "activities_count", label: "Activities Count" },
  { key: "created_at", label: "Created At" },
  { key: "updated_at", label: "Updated At" },
];

// Default visible fields
const DEFAULT_VISIBLE_FIELDS = [
  "case_number",
  "name",
  "irs_logics_status",
  "status_id",
  "tax_type",
  "marital_status",
];

const AdminUsersView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [visibleFields, setVisibleFields] = useState<string[]>(DEFAULT_VISIBLE_FIELDS);
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users/logics");

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFieldSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleField = (fieldKey: string) => {
    setVisibleFields((prev) =>
      prev.includes(fieldKey)
        ? prev.filter((f) => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  const selectAllFields = () => {
    setVisibleFields(ALL_FIELDS.map((f) => f.key));
  };

  const clearAllFields = () => {
    setVisibleFields([]);
  };

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return Object.values(user).some((value) =>
        String(value).toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const dateA = new Date((a.first_seen || a.created_at || a.date || 0) as string).getTime();
      const dateB = new Date((b.first_seen || b.created_at || b.date || 0) as string).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Format cell value for display
  const formatCellValue = (key: string, value: unknown): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (key === "created_at" || key === "updated_at") {
      return new Date(value as string).toLocaleString();
    }
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  if (loading) {
    return <div className="p-4">Loading users...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 users-view">
      <h1 className="text-2xl font-bold mb-4">Logics Users</h1>

      {/* Toolbar */}
      <div className="toolbar">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Sort Toggle */}
        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="column-selector-btn"
          title={sortOrder === "asc" ? "Oldest first" : "Newest first"}
        >
          {sortOrder === "asc" ? "Oldest First" : "Newest First"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ marginLeft: "4px" }}
          >
            {sortOrder === "asc" ? (
              <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            ) : (
              <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 1 0-.708-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            )}
          </svg>
        </button>

        {/* Field Selector Dropdown */}
        <div className="column-selector-wrapper" ref={dropdownRef}>
          <button
            onClick={() => setShowFieldSelector(!showFieldSelector)}
            className="column-selector-btn"
          >
            <span>Columns ({visibleFields.length})</span>
            <svg
              className={`w-4 h-4 transition-transform ${showFieldSelector ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showFieldSelector && (
            <div className="column-selector-dropdown">
              {/* Select All / Clear All */}
              <div className="column-selector-actions">
                <button onClick={selectAllFields}>Select All</button>
                <button onClick={clearAllFields}>Clear All</button>
              </div>

              {/* Field Checkboxes */}
              <div className="column-selector-list">
                {ALL_FIELDS.map((field) => (
                  <label key={field.key}>
                    <input
                      type="checkbox"
                      checked={visibleFields.includes(field.key)}
                      onChange={() => toggleField(field.key)}
                    />
                    <span>{field.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="text-sm" style={{ color: "#7b90ef" }}>
          {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              {ALL_FIELDS.filter((f) => visibleFields.includes(f.key)).map((field) => (
                <th key={field.key}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={String(user.case_number ?? index)}>
                {ALL_FIELDS.filter((f) => visibleFields.includes(f.key)).map((field) => (
                  <td
                    key={field.key}
                    title={formatCellValue(field.key, user[field.key])}
                  >
                    {formatCellValue(field.key, user[field.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8" style={{ color: "#7b90ef" }}>
            {searchQuery ? "No users match your search" : "No users found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersView;
