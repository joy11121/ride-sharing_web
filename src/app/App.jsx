import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import '../fake-db';
import { QueryProvider } from './contexts/QueryContext';
import { PostProvider } from './contexts/PostContext';

const App = () => {
  const content = useRoutes(routes);

  return (
    <QueryProvider>
      <PostProvider>
        <SettingsProvider>
            <MatxTheme>
              <CssBaseline />
              {content} 
            </MatxTheme>
        </SettingsProvider>
      </PostProvider>
    </QueryProvider>
    
  );
};

export default App;
