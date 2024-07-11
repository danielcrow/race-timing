import Image from 'next/image';
import Link from 'next/link';

const NewsletterFooter = () => {
  return (
    <footer className="flex items-center justify-between">
      <Link href="/dashboard" className="flex gap-4 items-center">
        <Image
          width={36}
          height={36}
          src="/favicon.ico"
          className="w-8 md:w-9"
          alt="logo"
        />
        <span>Race Site</span>
      </Link>

      <div>
        <p>&copy; {new Date().getFullYear().toString()} by Ibas</p>
      </div>
    </footer>
  );
};

export default NewsletterFooter;