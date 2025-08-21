"use client";
import React, { useMemo, useState } from "react";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  FolderOpenIcon,
  ClipboardDocumentListIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid"
import CommonTable, { Column } from "@/components/commonTable";

interface Client {
  id: number;
  name: string;
  phone: string;
  service: string;
  servicePercentage: number;
  properties: string;
  files: string[];
  timeZone: string;
  email: string;
  // Optional property type for filtering UI
  propertyType?: "apartment" | "house" | "condo";
}

// Sample client data
const clients: Client[] = [
  {
    id: 1,
    name: "Carla Hojajiban (Kay) John Hojajiban",
    phone: "+1 (347) 961-7399",
    service: "Full",
    servicePercentage: 17.3,
    properties: "Leeds Manor - Kay",
    files: ["folder", "document", "multiple"],
    timeZone: "Central 1 EST",
    email: "hotelbnbcorp@gmail.com",
    propertyType: "house",
  },
  {
    id: 2,
    name: "Carla Hojajiban",
    phone: "+1 (347) 961-7399",
    service: "Pro",
    servicePercentage: 15,
    properties: "Leeds Manor - Kay N 52nd - Kay",
    files: ["folder"],
    timeZone: "Eastern",
    email: "hotelbnbcorp@gmail.com",
    propertyType: "apartment",
  },
  {
    id: 3,
    name: "Joseph Magnelli (Joe)",
    phone: "+1 (347) 961-7399",
    service: "Pro",
    servicePercentage: 15,
    properties: "Leeds Manor - Kay",
    files: ["folder", "multiple"],
    timeZone: "Eastern",
    email: "hotelbnbcorp@gmail.com",
    propertyType: "condo",
  },
  {
    id: 4,
    name: "Michael Stoja (Mike)",
    phone: "+1 (347) 961-7399",
    service: "Launch",
    servicePercentage: 10,
    properties: "Leeds Manor - Kay",
    files: ["folder", "document"],
    timeZone: "Central 1 EST",
    email: "hotelbnbcorp@gmail.com",
    propertyType: "house",
  },
  {
    id: 5,
    name: "Carla Hojajiban",
    phone: "+1 (347) 961-7399",
    service: "Launch",
    servicePercentage: 10,
    properties: "Leeds Manor - Kay",
    files: ["folder"],
    timeZone: "Eastern",
    email: "hotelbnbcorp@gmail.com",
    propertyType: "apartment",
  },
  {
    id: 6,
    name: "Carla Hojajiban",
    phone: "+1 (347) 961-7399",
    service: "Launch",
    servicePercentage: 10,
    properties: "Leeds Manor - Kay",
    files: ["folder"],
    timeZone: "Eastern",
    email: "hotelbnbcorp@gmail.com",
    propertyType: "condo",
  },
];

const stats = {
  pmClients: {
    total: 192,
    full: 43,
    pro: 38,
    launch: 70,
  },
  onboarding: {
    total: "20/192",
    atRisk: 2,
    pro: 5,
    launch: 3,
  },
};

const ClientsDashboard = () => {
  // ----- Table Columns -----
  const columns: Column<Client>[] = [
    {
      header: "Client Name",
      key: "name",
      sortable: true,
      widthClassName: "min-w-[220px]",
      render: (row) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.phone}</div>
        </div>
      ),
    },
    {
      header: "Service",
      key: "service",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${getServiceColor(
              row.service
            )}`}
          >
            {row.service}
          </span>
          <span className="text-sm text-gray-500">{row.servicePercentage}%</span>
        </div>
      ),
    },
    {
      header: "Properties",
      key: "properties",
      sortable: true,
      cellClassName: "text-sm text-gray-900",
    },
    {
      header: "Files",
      key: "files",
      render: (row) => renderFileIcons(row.files),
    },
    {
      header: "Time Zone",
      key: "timeZone",
      sortable: true,
      cellClassName: "text-sm text-gray-900",
    },
    {
      header: "Email",
      key: "email",
      render: (row) => (
        <a
          className="text-sm text-blue-600 hover:text-blue-800"
          href={`mailto:${row.email}`}
        >
          {row.email}
        </a>
      ),
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [propertiesFilter, setPropertiesFilter] = useState("");

  const getServiceColor = (service: string) => {
    switch (service) {
      case "Full":
        return "bg-orange-500";
        case "Pro":
        return "bg-blue-500";
      case "Launch":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderFileIcons = (files: string[]) => {
    return (
      <div className="flex space-x-1">
        {files.map((file, index) => (
          <div key={index} className="w-5 h-5">
            {file === "folder" && (
              <FolderOpenIcon />
            )}
            {file === "document" && (
              <ClipboardDocumentListIcon />
            )}
            {file === "multiple" && (
              <CircleStackIcon />
            )}
          </div>
        ))}
      </div>
    );
  };

  // ----- Filters -----
  const filteredClients = useMemo(() => {
    const norm = (s: string) => s.toLowerCase();

    return clients.filter((c) => {
      // Search across a few fields
      const matchesSearch =
        !searchTerm ||
        norm(c.name).includes(norm(searchTerm)) ||
        norm(c.email).includes(norm(searchTerm)) ||
        norm(c.phone).includes(norm(searchTerm)) ||
        norm(c.properties).includes(norm(searchTerm)) ||
        norm(c.service).includes(norm(searchTerm));

      // Properties select (e.g., "leeds-manor" -> "leeds manor")
      const prettyPropFilter = propertiesFilter.replace(/-/g, " ");
      const matchesProperty =
        !propertiesFilter ||
        norm(c.properties).includes(norm(prettyPropFilter));

      // Property type (only if client has propertyType)
      const matchesType =
        !propertyTypeFilter ||
        (c.propertyType && c.propertyType === propertyTypeFilter);

      return matchesSearch && matchesProperty && matchesType;
    });
  }, [searchTerm, propertiesFilter, propertyTypeFilter]);


  return (
    <div className="flex flex-col h-full">
      {/* Filters and Search */}
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center space-x-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700">
            <FunnelIcon className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={propertyTypeFilter}
              onChange={(e) => setPropertyTypeFilter(e.target.value)}
            >
              <option value="">Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Properties
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={propertiesFilter}
              onChange={(e) => setPropertiesFilter(e.target.value)}
            >
              <option value="">Select properties</option>
              <option value="leeds-manor">Leeds Manor</option>
              <option value="downtown">Downtown</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by guest name"
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Setting Icons */}
      <div className="flex items-center justify-end bg-white space-x-2 p-2 m-4 border-b rounded-lg">
        <DocumentTextIcon className="w-5 h-5 text-gray-600" />
        <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
      </div>

      {/* Statistics Cards */}
      <div className="m-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PM Clients card */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-sm font-medium text-gray-600">PM Clients</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-3xl font-bold text-gray-900">
                  {stats.pmClients.total}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Full</span>
                    <span className="text-lg font-semibold text-orange-500">
                      {stats.pmClients.full}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Pro</span>
                    <span className="text-lg font-semibold text-blue-500">
                      {stats.pmClients.pro}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Launch</span>
                    <span className="text-lg font-semibold text-green-500">
                      {stats.pmClients.launch}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-12 h-12 bg-orange-100 rounded-md flex items-center justify-center">
              <HomeIcon className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          {/* Onboarding card */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Onboarding</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-3xl font-bold text-gray-900">
                  {stats.onboarding.total}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">At Risk</span>
                    <span className="text-lg font-semibold text-red-500">
                      {stats.onboarding.atRisk}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Pro</span>
                    <span className="text-lg font-semibold text-blue-500">
                      {stats.onboarding.pro}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Launch</span>
                    <span className="text-lg font-semibold text-green-500">
                      {stats.onboarding.launch}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-12 h-12 bg-orange-100 rounded-md flex items-center justify-center">
              <HomeIcon className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* CommonTable (sticky header + zebra rows) */}
      <CommonTable<Client>
        columns={columns}
        data={filteredClients}
        rowKey={(row) => row.id}
        stickyHeader
        zebra
        defaultSort={{ key: "name", direction: "asc" }}
        emptyMessage="No clients match your filters."
      />
    </div>
  );
};

export default ClientsDashboard;
