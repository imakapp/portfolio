'use client';

import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ClientPortalProps {
  children: ReactNode;
  selector?: string;
}

export default function ClientPortal({ children, selector = 'body' }: ClientPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const targetElement = document.querySelector(selector);
  if (!targetElement) return null;

  return createPortal(children, targetElement);
} 