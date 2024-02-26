import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children, title, author, description, keyword }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
          }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - shop Now",
  description: "ecommerce website - mobile laptop clothes etc",
  keyword: "mobile tablet clother laptop earbuds",
  author: "manish gupta",
};

export default Layout;
