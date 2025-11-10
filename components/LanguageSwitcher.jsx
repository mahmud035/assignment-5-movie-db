'use client';

import Image from 'next/image';
import BDFlag from '../public/assets/bd.png';
import ENFlag from '../public/assets/usa.png';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    {
      code: 'en',
      language: 'EN',
      flag: ENFlag.src,
    },
    {
      code: 'bn',
      language: 'বাংলা',
      flag: BDFlag.src,
    },
  ];
  const found = languages.find((lang) => pathname.includes(lang.code));
  const [selectedLanguage, setSelectedLanguage] = useState(
    found ?? languages[0]
  );
  const [showMenu, setShowMenu] = useState(false);

  const handleLanguageChange = (lang) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    const newPathName = segments.join('/');

    if (pathname.split('/').includes('movies'))
      window.location.replace(newPathName);
    else router.push(newPathName);

    setSelectedLanguage({
      ...selectedLanguage,
      code: lang,
      language: lang === 'en' ? 'EN' : 'বাংলা',
      flag: lang === 'en' ? `${ENFlag.src}` : `${BDFlag.src}`,
    });
    setShowMenu(false);
    router.push(`/${lang}`);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <button
          className="flex items-center gap-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          <Image
            className="max-w-8"
            src={selectedLanguage?.flag}
            alt="bangla"
            height={100}
            width={165}
          />
          {selectedLanguage?.language}
        </button>

        {showMenu && (
          <div className="absolute right-0 z-10 w-40 p-2 mt-2 text-black bg-white rounded-md shadow-lg top-full">
            {languages.map((entry) => (
              <button
                key={entry.code}
                type="button"
                onClick={() => handleLanguageChange(entry.code)}
                className="flex items-center w-full gap-2 p-2 text-left bg-transparent border-none rounded-md cursor-pointer hover:bg-gray-100"
              >
                <Image
                  className="max-w-8"
                  src={entry.flag}
                  alt="bangla"
                  height={100}
                  width={165}
                />
                {entry.language}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
