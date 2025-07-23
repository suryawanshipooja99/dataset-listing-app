import { ApiResponse, Filters } from '../types';

const BASE_URL = 'https://api.datakeep.civicdays.in/api/search/dataset/';

export async function fetchDatasets({
  query = '',
  geography = '',
  sectors = '',
  tags = '',
  formats = '',
  page = 1,
  size = 10,
  sort = 'recent',
  order = 'desc'
}: Partial<Filters> & {
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
}): Promise<ApiResponse> {
  const params = new URLSearchParams();
  
  if (query) params.append('query', query);
  if (geography) params.append('Geography', geography);
  if (sectors) params.append('sectors', sectors);
  if (tags) params.append('tags', tags);
  if (formats) params.append('formats', formats);
  
  params.append('page', page.toString());
  params.append('size', size.toString());
  params.append('sort', sort);
  params.append('order', order);

  try {
    console.log('Fetching:', `${BASE_URL}?${params.toString()}`);
    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('API Response:', data);
    
    return {
      results: data.results || [],
      total: data.total || 0,
      aggregations: data.aggregations || {
        Geography: {},
        sectors: {},
        tags: {},
        formats: {}
      }
    };
  } catch (error) {
    console.error('API fetch error:', error);
    
    // Return mock data for development
    return {
      results: [
        {
          id: 'mock-1',
          title: 'Sample Dataset - Assam Budget Data',
          description: 'This is a sample dataset for development purposes. Contains budget allocation data for various sectors in Assam.',
          slug: 'sample-dataset-assam-budget',
          created: '2025-01-15T10:00:00Z',
          modified: '2025-01-20T15:30:00Z',
          status: 'PUBLISHED',
          has_charts: true,
          download_count: 25,
          trending_score: 85.5,
          is_individual_dataset: false,
          metadata: [
            { metadata_item: { label: 'Geography' }, value: 'Assam' },
            { metadata_item: { label: 'Source Website' }, value: 'https://fin.assam.gov.in/' }
          ],
          tags: ['Budget', 'Finance', 'Government'],
          sectors: ['Public Finance', 'Governance'],
          formats: ['CSV', 'PDF'],
          organization: {
            name: 'Finance Department, Government of Assam',
            logo: '/assets/assam-govt-logo.png'
          }
        }
      ],
      total: 1,
      aggregations: {
        Geography: { 'Assam': 15, 'India': 8, 'Asia-Pacific': 5 },
        sectors: { 'Public Finance': 12, 'Climate Action': 8, 'Urban Development': 6 },
        tags: { 'Budget': 10, 'Climate': 7, 'Health': 5 },
        formats: { 'CSV': 15, 'PDF': 12, 'XLSX': 8 }
      }
    };
  }
}
