"use client";
import React, { useState } from "react";
import { 
  FunnelIcon, 
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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
}

const ClientsDashboard = () => {
  const [activeTab, setActiveTab] = useState("All Data");
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");
  const [propertiesFilter, setPropertiesFilter] = useState("");

  const tabs = ["All Data", "Contact", "Financial", "Management"];

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
      email: "hotelbnbcorp@gmail.com"
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
      email: "hotelbnbcorp@gmail.com"
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
      email: "hotelbnbcorp@gmail.com"
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
      email: "hotelbnbcorp@gmail.com"
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
      email: "hotelbnbcorp@gmail.com"
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
      email: "hotelbnbcorp@gmail.com"
    }
  ];

  const stats = {
    pmClients: {
      total: 192,
      full: 43,
      pro: 38,
      launch: 70
    },
    onboarding: {
      total: "20/192",
      atRisk: 2,
      pro: 5,
      launch: 3
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case "Full": return "bg-orange-500";
      case "Pro": return "bg-blue-500";
      case "Launch": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const renderFileIcons = (files: string[]) => {
    return (
      <div className="flex space-x-1">
        {files.map((file, index) => (
          <div key={index} className="w-5 h-5">
            {file === "folder" && (
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            )}
            {file === "document" && (
              <DocumentTextIcon className="w-4 h-4 text-gray-600" />
            )}
            {file === "multiple" && (
              <div className="flex">
                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-sm -ml-1"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700">
          <span>🔄</span>
          <span>Sync Reservations</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 ${
              activeTab === tab
                ? "border-purple-500 text-purple-600 bg-purple-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between p-6 bg-gray-50">
        <div className="flex items-center space-x-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700">
            <FunnelIcon className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Property Type</label>
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
            <label className="text-sm font-medium text-gray-700 mb-1">Properties</label>
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
            <label className="text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by guest name"
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <DocumentTextIcon className="w-5 h-5 text-gray-600" />
            <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="flex items-center justify-between p-6 bg-white">
        <div className="flex items-center space-x-8">
          {/* PM Clients */}
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">PM Clients</h3>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-3xl font-bold text-gray-900">{stats.pmClients.total}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Full</span>
                    <span className="text-lg font-semibold text-orange-500">{stats.pmClients.full}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Pro</span>
                    <span className="text-lg font-semibold text-blue-500">{stats.pmClients.pro}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Launch</span>
                    <span className="text-lg font-semibold text-green-500">{stats.pmClients.launch}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <HomeIcon className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          {/* Onboarding */}
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Onboarding</h3>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-3xl font-bold text-gray-900">{stats.onboarding.total}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">At Risk</span>
                    <span className="text-lg font-semibold text-red-500">{stats.onboarding.atRisk}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Pro</span>
                    <span className="text-lg font-semibold text-blue-500">{stats.onboarding.pro}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-600">Launch</span>
                    <span className="text-lg font-semibold text-green-500">{stats.onboarding.launch}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <HomeIcon className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-blue-500 text-white sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                Client Name
                <ChevronDownIcon className="w-4 h-4 inline ml-1" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                Service
                <ChevronDownIcon className="w-4 h-4 inline ml-1" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                Properties
                <ChevronDownIcon className="w-4 h-4 inline ml-1" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                Files
                <ChevronDownIcon className="w-4 h-4 inline ml-1" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                Time Zone
                <ChevronDownIcon className="w-4 h-4 inline ml-1" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                Email
                <ChevronDownIcon className="w-4 h-4 inline ml-1" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client, index) => (
              <tr key={client.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{client.service}</span>
                    <div className="text-sm text-gray-500">{client.servicePercentage}%</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.properties}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderFileIcons(client.files)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.timeZone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                  <a href={`mailto:${client.email}`}>{client.email}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsDashboard;