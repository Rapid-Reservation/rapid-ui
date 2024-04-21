import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import backgroundImage from "../../public/stock-background.jpg";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </QueryClientProvider>
      </AuthProvider>
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
