import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from '@/pages/not-found.tsx';
import { ForUnknownTemplate } from '@/templates/for-unknown.tsx';
import { AuthPage } from '@/pages/auth.tsx';
import { Routes } from '@/routes.ts';
import { HomePage } from '@/pages/home.tsx';
import { ForKnownTemplate } from '@/templates/for-known.tsx';
import { WorkflowTemplate } from '@/templates/workflow.tsx';
import { AdminPage } from '@/pages/admin';
import { Role } from '@/entities/user/types.ts';

export const RouteApp = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route errorElement={<NotFoundPage />}>
          <Route element={<ForKnownTemplate />}>
            <Route element={<WorkflowTemplate />}>
              <Route path={Routes.account+Routes[Role.Admin]} element={<AdminPage />} />
            </Route>
          </Route>
          <Route element={<ForUnknownTemplate />}>
            <Route path={Routes.auth} element={<AuthPage />} />
            <Route path={Routes.home} element={<HomePage />} />
          </Route>
        </Route>
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};
