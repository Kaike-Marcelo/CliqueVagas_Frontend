import { SearchIcon } from 'lucide-react';
import { Input } from '@/app/_components/ui/input';

export function SearchBar() {
  return (
    <div className="flex items-center space-x-2">
      <SearchIcon />
      <Input
        type="text"
        placeholder="Pesquisar..."
        className="p-2 rounded bg-gray-700 text-white"
      />
    </div>
  );
}
