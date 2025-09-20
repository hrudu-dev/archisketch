
'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import ArchiSketchLogoDark from '../../public/archisketch-logo-dark.svg';
import ArchiSketchLogoLight from '../../public/archisketch-logo-light.svg';

export function Logo({ className }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} style={{ width: 48, height: 48 }} />;
  }

  const effectiveTheme = theme === 'system' ? resolvedTheme : theme;
  const logoSrc = effectiveTheme === 'dark' ? ArchiSketchLogoLight : ArchiSketchLogoDark;

  return <Image src={logoSrc} alt="ArchiSketch Logo" className={className} />;
}
