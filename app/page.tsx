'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { fetchDatasets } from './services/api';
import FilterBar from './components/FilterBar';
import ViewToggle from './components/ViewToggle';
import CardView from './components/CardView';
import ListView from './components/ListView';
import Pagination from './components/Pagination';


export default function Home() {
  const [datasets, setDatasets] = useState([]);
  const [viewType, setViewType] = useState<'card' | 'list'>('card');
  const [filters, setFilters] = useState({ query: '', geography: '', sectors: '', tags: '', formats: '' });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [aggregations, setAggregations] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const size = 9;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { results, total, aggregations } = await fetchDatasets({ ...filters, page, size });
        setDatasets(results);
        setTotal(total);
        setAggregations(aggregations);
      } catch (error) {
        console.error('Failed to load datasets:', error);
        setDatasets([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters, page]);

  return (
    <>
      <Head>
        <title>Dataset Listing - CivicDataSpace</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-blue-600 text-white py-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">🌐 CivicDataSpace</span>
              </div>
              <nav className="hidden md:flex space-x-8 text-sm font-medium">
                <a href="#" className="hover:text-blue-200 transition-colors">ALL DATA</a>
                <a href="#" className="hover:text-blue-200 transition-colors">SECTORS</a>
                <a href="#" className="hover:text-blue-200 transition-colors">USE CASES</a>
                <a href="#" className="hover:text-blue-200 transition-colors">PUBLISHERS</a>
                <a href="#" className="hover:text-blue-200 transition-colors">ABOUT US</a>
              </nav>
            </div>
            <button className="bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded text-sm font-medium transition-colors">
              LOGIN / SIGN UP
            </button>
          </div>
        </div>

        {/* Orange sub-header */}
        <div className="bg-orange-500 text-white py-2 px-6">
          <div className="text-sm font-medium">
            HOME
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
            <FilterBar 
              filters={filters} 
              setFilters={setFilters} 
              setPage={setPage} 
              aggregations={aggregations}
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Start typing to search for any Dataset"
                      value={filters.query}
                      onChange={(e) => {
                        setFilters({ ...filters, query: e.target.value });
                        setPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ViewToggle view={viewType} setView={setViewType} />
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Latest Updated</option>
                    <option>Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-gray-500">Loading datasets...</div>
                </div>
              ) : (
                <>
                  <div className="mb-4 text-sm text-gray-600">
                    Showing {datasets.length} of {total} results
                  </div>
                  
                  {viewType === 'card' ? <CardView datasets={datasets} /> : <ListView datasets={datasets} />}

                  <div className="mt-8">
                    <Pagination page={page} setPage={setPage} total={total} size={size} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
