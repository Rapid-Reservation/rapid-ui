import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import backgroundImage from "../../public/stock-background.jpg";

import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          opacity: "0.4",
          zIndex: -1,
        }}
      />

      <div style={{ position: "relative" }}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <CartProvider>
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Header />
                <Component {...pageProps} />
              </ThemeProvider>
            </CartProvider>
          </QueryClientProvider>
        </AuthProvider>
      </div>

    </>
  );
}

function Layout({ children }: any) {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default MyApp;
