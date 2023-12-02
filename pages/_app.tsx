import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import 'tailwindcss/tailwind.css'

type Props = AppProps & {
  session: Session;
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
