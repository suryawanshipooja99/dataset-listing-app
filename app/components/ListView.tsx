type Dataset = {
  id: string | number;
  title: string;
  description: string;
};

interface ListViewProps {
  datasets: Dataset[];
}

export default function ListView({ datasets }: ListViewProps) {
  return (
    <ul className="divide-y divide-gray-200">
      {datasets.map((item) => (
        <li key={item.id} className="py-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
