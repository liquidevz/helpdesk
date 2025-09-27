import {useSettings} from '@common/core/settings/use-settings';
import {useAuth} from '@common/auth/use-auth';
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from '@common/ui/toast/toast-container';
import {EmailVerificationPage} from '@common/auth/ui/email-verification-page/email-verification-page';
import {AppearanceListener} from '@common/admin/appearance/commands/appearance-listener';
import {CookieNotice} from '@common/ui/cookie-notice/cookie-notice';
import {AuthRoute} from '@common/auth/guards/auth-route';
import React, {Fragment} from 'react';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {AuthRoutes} from '@common/auth/auth-routes';
import {BillingRoutes} from '@common/billing/billing-routes';
import {NotificationRoutes} from '@common/notifications/notification-routes';
import {ContactUsPage} from '@common/contact/contact-us-page';
import {CustomPageLayout} from '@common/custom-page/custom-page-layout';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import {DialogStoreOutlet} from '@common/ui/overlays/store/dialog-store-outlet';
import {DynamicHomepage} from '@common/ui/dynamic-homepage';
import {LandingPage} from '@app/help-center/homepage/landing-page';

const HelpCenterRoutes = React.lazy(() => import('@app/help-center/hc-routes'));
const MailboxRoutes = React.lazy(() => import('@app/agent/agent-routes'));
const AdminRoutes = React.lazy(() => import('@common/admin/admin-routes'));
const SwaggerApiDocs = React.lazy(
  () => import('@common/swagger/swagger-api-docs-page'),
);

export function AppRoutes() {
  const {billing, notifications, require_email_confirmation, api} =
    useSettings();
  const {user, hasPermission} = useAuth();

  if (user != null && require_email_confirmation && !user.email_verified_at) {
    return (
      <Fragment>
        <ToastContainer />
        <Routes>
          <Route path="*" element={<EmailVerificationPage />} />
        </Routes>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <AppearanceListener />
      <CookieNotice />
      <ToastContainer />
      <Routes>
        <Route
          path="/hc/*"
          element={
            <AuthRoute requireLogin={false} permission="articles.view">
              <React.Suspense fallback={<FullPageLoader screen />}>
                <HelpCenterRoutes />
              </React.Suspense>
            </AuthRoute>
          }
        />
        {
          <Route
            path="/"
            element={
              <DynamicHomepage
                homepageResolver={() => (
                  <AuthRoute requireLogin={false} permission="articles.view">
                    <LandingPage />
                  </AuthRoute>
                )}
              />
            }
          />
        }
        <Route
          path="/agent/*"
          element={
            <AuthRoute permission="tickets.update">
              <React.Suspense fallback={<FullPageLoader screen />}>
                <MailboxRoutes />
              </React.Suspense>
            </AuthRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AuthRoute permission="admin.access">
              <React.Suspense fallback={<FullPageLoader screen />}>
                <AdminRoutes />
              </React.Suspense>
            </AuthRoute>
          }
        />
        {AuthRoutes}
        {billing.enable && BillingRoutes}
        {notifications.integrated && NotificationRoutes}
        {api?.integrated && hasPermission('api.access') && (
          <Route
            path="api-docs"
            element={
              <React.Suspense fallback={<FullPageLoader screen />}>
                <SwaggerApiDocs />
              </React.Suspense>
            }
          />
        )}
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="pages/:pageSlug" element={<CustomPageLayout />} />
        <Route path="pages/:pageId/:pageSlug" element={<CustomPageLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <DialogStoreOutlet />
    </Fragment>
  );
}
