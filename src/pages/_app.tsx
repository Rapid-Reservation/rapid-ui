import Header from "@/components/header";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import backgroundImage from "../../public/stock-background.jpg";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundImage: `url(${backgroundImage.src})`, // Adjust the path here
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
          <CartProvider>
            <Header />
            <Component {...pageProps} />
          </CartProvider>
        </AuthProvider>
      </div>
    </>
  );
}
