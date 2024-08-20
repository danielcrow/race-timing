import Image from 'next/image';
import Link from 'next/link';
import HeaderNavLink from './HeaderNavLink';
import banner from '@/app/banner.png'

const menuItems = [


  { label: `Race Board`, url: `/dashboard/raceresults/0` }

];

const Header = () => {
  return (
    <header className="flex flex-col gap-5">
      <div className="py-4 flex items-center">
        <Link href="/">
          <Image
            width={200}
            height={200}
            src={banner}
            
            alt="logo"
          />
        </Link>
        <nav className="ml-8">
          <ul className="flex flex-wrap gap-x-8 text-gray-900">
            {menuItems.map(({ url, label }, index) => (
              <li key={index}>
                <HeaderNavLink href={url}>{label}</HeaderNavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>


    </header>
  );
};

export default Header;