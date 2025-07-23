export interface MetadataItem {
  metadata_item: { label: string };
  value: string;
}

export interface Organization {
  name: string;
  logo?: string;
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  slug: string;
  created: string;
  modified: string;
  status: string;
  metadata?: MetadataItem[];
  tags?: string[];
  sectors?: string[];
  formats?: string[];
  has_charts: boolean;
  download_count: number;
  trending_score: number;
  is_individual_dataset: boolean;
  organization?: Organization;
  user?: {
    id: string;
    name: string;
    email?: string;
  } | null;
}

export interface Filters {
  query: string;
  geography: string;
  sectors: string;
  tags: string;
  formats: string;
}

export interface ApiResponse {
  results: Dataset[];
  total: number;
  aggregations: {
    Geography: Record<string, number>;
    sectors: Record<string, number>;
    tags: Record<string, number>;
    formats: Record<string, number>;
  };
}
