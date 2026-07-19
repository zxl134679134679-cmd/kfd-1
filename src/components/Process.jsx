import { ArrowRight } from "@phosphor-icons/react";
import { processSteps } from "../content.js";

export function Process({ onOpenQuote }) {
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="section-heading centered-heading">
          <p className="eyebrow dark">COOPERATION</p>
          <h2>三步提交需求，专人审核报价</h2>
          <p>网站不自动定价，业务人员会结合材料、工艺与交付条件审核需求。</p>
        </div>
        <div className="process-grid">
          {processSteps.map(({ number, title, text, Icon }) => (
            <article key={number}>
              <span>{number}</span>
              <Icon size={37} weight="light" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="process-cta">
          <div><strong>准备好您的包装需求了吗？</strong><span>提交信息后，我们会尽快与您沟通。</span></div>
          <button className="button button-primary" type="button" onClick={onOpenQuote}>提交询价 <ArrowRight size={19} /></button>
        </div>
      </div>
    </section>
  );
}
