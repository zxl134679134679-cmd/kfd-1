import { ArrowRight } from "@phosphor-icons/react";

export function Hero({ onOpenQuote }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy-panel">
        <div className="hero-content">
          <p className="eyebrow dark">KFD PACKAGING · QINGDAO</p>
          <h1 aria-label="高端纸包装制造，稳交付，更可靠"><span>高端纸包装制造</span><span>稳交付，更可靠</span></h1>
          <p className="hero-copy">从纸板到成箱的一体化制造能力，以稳定品质与准时交付，成就产品长期信赖。</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={onOpenQuote}>
              提交询价 <ArrowRight size={19} weight="bold" />
            </button>
            <a className="text-link" href="#capabilities">
              查看制造能力 <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="hero-image-wrap">
        <img src="/assets/kfd-factory-exterior.png" alt="青岛凯丰德包装厂区外景" />
        <div className="hero-caption"><span>青岛 · 即墨</span><strong>现代化纸包装制造基地</strong></div>
      </div>
    </section>
  );
}
