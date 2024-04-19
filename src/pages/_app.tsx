import Header from "@/components/header";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import backgroundImage from "../../public/stock-background.jpg";
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
          backgroundImage:
            "url(https://www.rolandosrestaurant.com/images/slideshow/slide3.jpg)", // Adjust the path here
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          opacity: "0.4",
          zIndex: -1, // Make sure the background image stays behind the content
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
