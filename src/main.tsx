import { createRoot } from 'react-dom/client';
import './index.scss';
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./router/AppRoutes.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </Provider>
);
