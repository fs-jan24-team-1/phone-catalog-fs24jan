import { createRoot } from 'react-dom/client';

import { Root } from './Root';
import { Provider } from 'react-redux';
import store from './store/store';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
