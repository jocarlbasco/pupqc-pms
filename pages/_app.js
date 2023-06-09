import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { registerLicense } from '@syncfusion/ej2-base';
import Loading from '../components/Loading';

// Registering Syncfusion license key
registerLicense(
  'ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5XdEVjWn1XcX1QR2FU'
);

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {Component.auth ? (
          <Auth role={Component.auth.role}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </SessionProvider>
  );
}

function Auth({ children, role }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });

  if (status === 'loading') {
    return <Loading />;
  }

  if ((role === 'faculty' || role === 'admin') && session.user.isAdmin === 0) {
    router.push('/student/home');
    return null;
  }

  if ((role === 'student' || role === 'admin') && session.user.isAdmin === 1) {
    router.push('/faculty/home');
    return null;
  }

  if (
    (role === 'student' || role === 'faculty') &&
    session.user.isAdmin === 2
  ) {
    router.push('/admin/home');
    return null;
  }

  return children;
}
