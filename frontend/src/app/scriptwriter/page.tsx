// src/app/scriptwriter/page.tsx
'use client';

import ProtectedRoute from '../../components/auth/ProtectedRoute';
import ScriptWriterContent from '../../components/scriptwriter/ScriptWriterContent';

export default function ScriptWriter() {
  return (
    <ProtectedRoute>
      <ScriptWriterContent />
    </ProtectedRoute>
  );
}