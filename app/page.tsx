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
      <div className="min-h-screen bg-gray-100 flex flex-col">
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

        <div className="flex bg-white flex-1">
          {/* Sidebar */}
          <div className="w-80 bg-white shadow-sm border-r border-gray-200 min-h-screen">
            <FilterBar 
              filters={filters} 
              setFilters={setFilters} 
              setPage={setPage} 
              aggregations={aggregations}
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-gray-50">
            {/* Search and Controls */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ViewToggle view={viewType} setView={setViewType} />
                  <span className="text-sm text-gray-600">Latest Updated</span>
                </div>
                <div className="text-sm text-gray-600">
                  {total > 0 && `Page ${page} of ${Math.ceil(total / size)}`}
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
                  {viewType === 'card' ? <CardView datasets={datasets} /> : <ListView datasets={datasets} />}

                  {total > 0 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination page={page} setPage={setPage} total={total} size={size} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-6 px-6 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">🌐 CivicDataSpace</span>
              </div>
              <nav className="hidden md:flex space-x-6 text-sm">
                <a href="#" className="hover:text-blue-200 transition-colors">ABOUT US</a>
                <a href="#" className="hover:text-blue-200 transition-colors">SITEMAP</a>
                <a href="#" className="hover:text-blue-200 transition-colors">CONTACT US</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💬</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📘</span>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🐦</span>
                </div>
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💼</span>
                </div>
              </div>
              <div className="text-xs text-blue-200">
                made by 💖
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
