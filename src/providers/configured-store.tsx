import { Provider } from 'react-redux';
import { store } from '@/lib/redux.ts';

export function ProviderConfiguredStore({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}