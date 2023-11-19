import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { AppBar, Toolbar } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ToolbarItems from '@/components/ToolbarItems/ToolbarItems';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Divulgador de Eventos',
  description: 'Divulgador de Eventos'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <ThemeRegistry options={{ key: 'mui' }}>
          <AuthProvider>
            <AppBar position="sticky">
              <Toolbar>
                <ToolbarItems />
              </Toolbar>
            </AppBar>
            {children}
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
