import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import Layout from "../components/layout";
import { useState, useEffect } from "react";
function MyApp({ Component, pageProps }) {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []); // this was needed to avoid UIHydration erro
  return (
    <div>
      {domLoaded && (
        <SSRProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SSRProvider>
      )}
    </div>
  );
}

export default MyApp;
