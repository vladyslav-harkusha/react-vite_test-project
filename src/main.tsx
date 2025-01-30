import { createRoot } from 'react-dom/client';
import './index.scss';
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./router/AppRoutes.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);
