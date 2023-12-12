
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

  const height = showNav ? "h-[calc(100%-60px)]" : "h-full";

  return (
    <div className="relative w-full h-full flex flex-col">
      { showNav && <InsiderNav /> }
    
      <div className={`relative w-full ${height}`}>
        {children}
      </div>
    </div>
  )
}

export default Layout;
