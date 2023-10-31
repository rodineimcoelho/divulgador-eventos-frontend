import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { AppBar, Toolbar } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ToolbarItems from '@/components/ToolbarItems/ToolbarItems';

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
      <body>
        <ThemeRegistry>
          <AppBar position="sticky">
            <Toolbar>
              <ToolbarItems />
            </Toolbar>
          </AppBar>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
