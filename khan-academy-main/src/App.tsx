import { LanguageProvider } from '@/context/LanguageProvider';
import { HomePage } from '@/pages/HomePage';

function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}

export default App;
