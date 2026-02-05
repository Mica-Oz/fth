"use client";

import React, { useEffect, useState, useRef } from "react";

interface Client {
  case_number: string;
  [key: string]: unknown;
}

// Field configuration - all available fields with display labels
const ALL_FIELDS = [
  { key: "case_number", label: "Case Number" },
  { key: "name", label: "Name" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "dob", label: "DOB" },
  { key: "ssn", label: "SSN" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zip", label: "ZIP" },
  { key: "status", label: "Transcript Status" },
  { key: "status_id", label: "Logics Status ID" },
  { key: "registry_type", label: "Registry Type" },
  { key: "tax_type", label: "Tax Type" },
  { key: "irs_logics_status", label: "IRS Logics Status" },
  { key: "transcripts_pulled", label: "Transcripts Pulled" },
  { key: "activities_created", label: "Activities Created" },
  { key: "first_seen", label: "First Seen" },
  { key: "created_at", label: "Created At" },
  { key: "updated_at", label: "Updated At" },
];

// Default visible fields
const DEFAULT_VISIBLE_FIELDS = [
  "case_number",
  "name",
  "email",
  "phone",
  "status",
  "status_id",
];

const AdminClientsView = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // desc = newest first
  const [visibleFields, setVisibleFields] = useState<string[]>(
    DEFAULT_VISIBLE_FIELDS
  );
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [syncing, setSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<{
    fetched?: number;
    upserted?: number;
    newClients?: number;
    totalClients?: number;
  } | null>(null);

  const SYNC_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

  const syncWithLogics = async () => {
    setSyncing(true);
    try {
      const response = await fetch("/api/logics/sync", { method: "POST" });
      const data = await response.json();
      if (data.success) {
        setLastSyncResult({
          fetched: data.fetched,
          upserted: data.upserted,
          newClients: data.newClients,
          totalClients: data.totalClients,
        });
        localStorage.setItem("lastLogicsSync", Date.now().toString());
        console.log("Sync result:", data);
      }
    } catch (err) {
      console.error("Sync failed:", err);
    } finally {
      setSyncing(false);
    }
  };

  // Sync with IRS Logics on mount if last sync was over 30 minutes ago
  useEffect(() => {
    const lastSync = localStorage.getItem("lastLogicsSync");
    const lastSyncTime = lastSync ? parseInt(lastSync, 10) : 0;
    const timeSinceLastSync = Date.now() - lastSyncTime;

    if (timeSinceLastSync > SYNC_INTERVAL_MS) {
      syncWithLogics();
    }
  }, []);

  useEffect(() => {
    // Don't fetch while syncing - wait for sync to complete
    if (syncing) return;

    const fetchClients = async () => {
      try {
        const params = new URLSearchParams();
        if (statusFilter !== "all") {
          params.set("status", statusFilter);
        }

        const response = await fetch(`/api/admin/clients?${params}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.clients) {
          setClients(data.clients);
        } else {
          throw new Error(data.error || "Failed to fetch clients");
        }
      } catch (err) {
        console.error("Failed to fetch clients:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [statusFilter, syncing]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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

  // Filter and sort clients
  const filteredClients = clients
    .filter((client) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return Object.values(client).some((value) =>
        String(value).toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const getTime = (val: unknown) => {
        if (!val) return 0;
        const date = new Date(val as string);
        return isNaN(date.getTime()) ? 0 : date.getTime();
      };
      const dateA = getTime(a.created_at) || getTime(a.first_seen);
      const dateB = getTime(b.created_at) || getTime(b.first_seen);
      return sortOrder === "asc" ? dateB - dateA : dateA - dateB;
    });

  // Format cell value for display
  const formatCellValue = (key: string, value: unknown): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (key.includes("_at") || key.includes("_seen") || key.includes("_date")) {
      try {
        return new Date(value as string).toLocaleDateString();
      } catch {
        return String(value);
      }
    }
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  if (loading) {
    return <div className="p-4">Loading clients...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 users-view">
      <h1 className="text-2xl font-bold mb-4">Clients (AWS DB)</h1>

      {/* Toolbar */}
      <div className="toolbar">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setLoading(true);
          }}
          className="search-input"
          style={{ width: "auto", minWidth: "120px" }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="no_8821">No 8821</option>
          <option value="problem_child">Problem Children</option>
        </select>

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
              className={`w-4 h-4 transition-transform ${
                showFieldSelector ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
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

        {/* Sync Button */}
        <button
          type="button"
          onClick={syncWithLogics}
          disabled={syncing}
          className="column-selector-btn"
          title="Sync with IRS Logics"
        >
          {syncing ? (
            <span>Syncing...</span>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ marginRight: "4px" }}
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
              </svg>
              Sync
            </>
          )}
        </button>

        {/* Results count and sync status */}
        <div className="text-sm" style={{ color: "#7b90ef" }}>
          {syncing ? (
            <span>Syncing with IRS Logics...</span>
          ) : lastSyncResult ? (
            <span>
              {filteredClients.length} of {clients.length} clients
              {lastSyncResult.newClients
                ? ` (${lastSyncResult.newClients} new, ${lastSyncResult.upserted} synced)`
                : lastSyncResult.upserted
                ? ` (${lastSyncResult.upserted} synced)`
                : ""}
            </span>
          ) : (
            <span>{filteredClients.length} of {clients.length} clients</span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              {ALL_FIELDS.filter((f) => visibleFields.includes(f.key)).map(
                (field) => (
                  <th key={field.key}>{field.label}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, index) => (
              <tr key={String(client.case_number ?? index)}>
                {ALL_FIELDS.filter((f) => visibleFields.includes(f.key)).map(
                  (field) => (
                    <td
                      key={field.key}
                      title={formatCellValue(field.key, client[field.key])}
                    >
                      {formatCellValue(field.key, client[field.key])}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {filteredClients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? "No clients match your search" : "No clients found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClientsView;
