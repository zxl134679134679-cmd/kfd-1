import { ArrowRight } from "@phosphor-icons/react";
import { products } from "../content.js";

export function Products() {
  return (
    <section className="section products-section" id="products">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow dark">PRODUCTS</p>
            <h2>从纸板到彩箱，匹配多类包装需求</h2>
          </div>
          <p>提供规格后，业务员会结合材料、工艺和交付要求审核需求，为您形成匹配的包装方案。</p>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.alt} />
              <div className="product-card-copy">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <a aria-label={`了解更多：${product.name}`} href={`/products#${product.id}`}>
                  了解更多 <ArrowRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
