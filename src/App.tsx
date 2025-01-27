import { RouteApp } from '@/RouteApp.tsx';
import { ProviderConfiguredStore } from '@/providers/configured-store.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';

function App() {
  return (
    <ProviderConfiguredStore>
      <Toaster />
      <RouteApp />
    </ProviderConfiguredStore>
  );
}

export default App;
