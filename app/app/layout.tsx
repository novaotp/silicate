
"use client";

// Next
import { usePathname } from 'next/navigation';

// Internal
import { ChildrenProps } from '@/types/interfaces';
import { InsiderNav } from '@components/app/shared/InsiderNav';

/** The app's layout. */
const Layout = ({ children }: ChildrenProps) => {
  const pathname = usePathname();
  const showNav = !pathname!.startsWith('/app/memos/') || pathname === '/app/memos';

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      <main className={`relative w-full flex-grow flex flex-col overflow-y-scroll`}>
        {children}
      </main>

      { showNav && <InsiderNav /> }
    </div>
  )
}

export default Layout;
