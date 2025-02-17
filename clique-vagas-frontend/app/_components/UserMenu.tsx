import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from './ui/menubar';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';

interface UserMenuProps {
  handleLogout: () => Promise<void>;
  fetchUserRole: () => void;
}

export function UserMenu({ handleLogout, fetchUserRole }: UserMenuProps) {
  return (
    <Menubar asChild>
      <MenubarMenu>
        <MenubarTrigger className="flex flex-col items-center hover:bg-gray-700 rounded p-2">
          <UserIcon size={24} />
          <div>
            Perfil <span>▼</span>
          </div>
        </MenubarTrigger>
        <MenubarContent className="bg-white text-black">
          <MenubarItem
            asChild
            className="hover:bg-gray-200"
            onClick={fetchUserRole}
          >
            <Link href="/perfil">Ver Perfil</Link>
          </MenubarItem>
          <MenubarItem asChild className="hover:bg-gray-200">
            <Button variant="ghost" onClick={handleLogout}>
              Sair
            </Button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
