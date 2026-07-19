import { useState } from "react";
import { Capabilities } from "./components/Capabilities.jsx";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Manufacturing } from "./components/Manufacturing.jsx";
import { Process } from "./components/Process.jsx";
import { Products } from "./components/Products.jsx";
import { QuoteDialog } from "./components/QuoteDialog.jsx";
import { ManufacturingPage } from "./pages/ManufacturingPage.jsx";
import { ProductSolutionsPage } from "./pages/ProductSolutionsPage.jsx";

function HomePage({ onOpenQuote }) {
  return (
    <main>
      <Hero onOpenQuote={() => onOpenQuote()} />
      <Manufacturing />
      <Products />
      <Capabilities />
      <Process onOpenQuote={() => onOpenQuote()} />
    </main>
  );
}

export function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const openQuote = (product = "") => {
    setSelectedProduct(product);
    setQuoteOpen(true);
  };

  const requestedPath = window.location.pathname;
  const currentPath = ["/", "/products", "/manufacturing"].includes(requestedPath)
    ? requestedPath
    : "/";

  let page = <HomePage onOpenQuote={openQuote} />;
  if (currentPath === "/products") {
    page = <ProductSolutionsPage onOpenQuote={openQuote} />;
  }
  if (currentPath === "/manufacturing") {
    page = <ManufacturingPage onOpenQuote={openQuote} />;
  }

  return (
    <>
      <Header currentPath={currentPath} onOpenQuote={() => openQuote()} />
      {page}
      <Footer />
      <QuoteDialog
        open={quoteOpen}
        initialProduct={selectedProduct}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  );
}
