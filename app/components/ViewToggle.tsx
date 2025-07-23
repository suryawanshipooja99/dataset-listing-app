type ViewType = 'card' | 'list';

interface ViewToggleProps {
  view: ViewType;
  setView: (view: ViewType) => void;
}

export default function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setView('card')}
        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
          view === 'card' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        ⋮⋮⋮
      </button>
      <button
        onClick={() => setView('list')}
        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
          view === 'list' 
            ? 'bg-white text-gray-900 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        ☰
      </button>
    </div>
  );
}
