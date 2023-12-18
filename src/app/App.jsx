import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import { QueryProvider } from './contexts/QueryContext';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  const content = useRoutes(routes);

  return (
    <QueryProvider>
      <UserProvider>
        <SettingsProvider>
            <MatxTheme>
              <CssBaseline />
              {content} 
            </MatxTheme>
        </SettingsProvider>
      </UserProvider>
    </QueryProvider>
    
  );
};

export default App;
