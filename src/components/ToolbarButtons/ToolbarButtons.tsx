'use client';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import ButtonsSkeleton from './variants/ButtonsSkeleton';
import UnauthenticatedButtons from './variants/UnauthenticatedButtons';
import AuthenticatedButtons from './variants/AuthenticatedButtons';

export default function ToolbarButtons() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === undefined) return <ButtonsSkeleton />;

  if (!isAuthenticated) return <UnauthenticatedButtons />;

  return <AuthenticatedButtons />;
}
