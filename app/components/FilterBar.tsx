import { Filters } from '../types';

type FilterBarProps = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  setPage: (page: number) => void;
  aggregations?: {
    Geography: Record<string, number>;
    sectors: Record<string, number>;
    tags: Record<string, number>;
    formats: Record<string, number>;
  };
};

export default function FilterBar({ filters, setFilters, setPage, aggregations }: FilterBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleCheckboxChange = (filterType: keyof Filters, value: string, checked: boolean) => {
    const currentValues = filters[filterType].split(',').filter(v => v.trim());
    
    let newValues: string[];
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    setFilters({ ...filters, [filterType]: newValues.join(',') });
    setPage(1);
  };

  const handleGeographyChange = (value: string, checked: boolean) => {
    setFilters({ ...filters, geography: checked ? value : '' });
    setPage(1);
  };

  const sectors = aggregations?.sectors ? Object.keys(aggregations.sectors) : ['Public Finance', 'Law And Justice', 'Climate Action', 'Urban Development', 'Gender'];
  const dataTypes = aggregations?.formats ? Object.keys(aggregations.formats) : ['CSV', 'PDF', 'XLSX', 'JSON'];
  const tags = aggregations?.tags ? Object.keys(aggregations.tags) : ['Budget', 'Law', 'Justice', 'Courts'];
  const geographies = aggregations?.Geography ? Object.keys(aggregations.Geography) : ['India', 'Assam', 'Asia-Pacific', 'Bangkok'];

  return (
    <div className="p-4 bg-white h-full overflow-y-auto border-r border-gray-200">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">FILTERS</h2>
        
        {/* Search */}
        <div className="mb-6">
          <input 
            name="query" 
            value={filters.query} 
            onChange={handleInputChange} 
            placeholder="Start typing to search for any Dataset" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" 
          />
        </div>

        {/* Sectors */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Sectors ({sectors.length})</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {sectors.map((sector, index) => (
              <label key={index} className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onChange={(e) => handleCheckboxChange('sectors', sector, e.target.checked)}
                    checked={filters.sectors.split(',').includes(sector)}
                  />
                  <span className="text-gray-700">{sector}</span>
                </div>
                {aggregations?.sectors?.[sector] && (
                  <span className="text-xs text-gray-500">({aggregations.sectors[sector]})</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Data Types/Formats */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Data Type ({dataTypes.length})</h3>
          <div className="space-y-2">
            {dataTypes.map((type, index) => (
              <label key={index} className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onChange={(e) => handleCheckboxChange('formats', type, e.target.checked)}
                    checked={filters.formats.split(',').includes(type)}
                  />
                  <span className="text-gray-700">{type}</span>
                </div>
                {aggregations?.formats?.[type] && (
                  <span className="text-xs text-gray-500">({aggregations.formats[type]})</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Tags ({tags.length})</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {tags.slice(0, 10).map((tag, index) => (
              <label key={index} className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onChange={(e) => handleCheckboxChange('tags', tag, e.target.checked)}
                    checked={filters.tags.split(',').includes(tag)}
                  />
                  <span className="text-gray-700">{tag}</span>
                </div>
                {aggregations?.tags?.[tag] && (
                  <span className="text-xs text-gray-500">({aggregations.tags[tag]})</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Geographies */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Geographies ({geographies.length})</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {geographies.slice(0, 10).map((geo, index) => (
              <label key={index} className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="geography"
                    className="mr-3 text-blue-600 focus:ring-blue-500 border-gray-300"
                    onChange={(e) => handleGeographyChange(geo, e.target.checked)}
                    checked={filters.geography === geo}
                  />
                  <span className="text-gray-700">{geo}</span>
                </div>
                {aggregations?.Geography?.[geo] && (
                  <span className="text-xs text-gray-500">({aggregations.Geography[geo]})</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setFilters({ query: '', geography: '', sectors: '', tags: '', formats: '' });
            setPage(1);
          }}
          className="w-full mt-4 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
