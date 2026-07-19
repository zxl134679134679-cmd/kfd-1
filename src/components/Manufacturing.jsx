import { metrics } from "../content.js";

export function Manufacturing() {
  return (
    <section className="manufacturing-section" id="company">
      <div className="container manufacturing-intro reveal-section">
        <div className="manufacturing-copy">
          <p className="eyebrow dark">MANUFACTURING</p>
          <h2>制造实力，源于专业与专注</h2>
          <p>自建厂区与生产线，从原材料、结构设计到印刷开槽、粘箱打包，形成完整制造闭环，保障效率与品质。</p>
          <a className="text-link" href="#capabilities">走进制造现场 <span aria-hidden="true">→</span></a>
        </div>
        <figure className="manufacturing-main-photo">
          <img src="/assets/kfd-corrugator.jpeg" alt="凯丰德瓦楞纸板生产现场" />
        </figure>
        <figure className="manufacturing-small-photo first">
          <img src="/assets/kfd-kba-printing.png" alt="凯丰德高宝胶印机" />
        </figure>
        <figure className="manufacturing-small-photo second">
          <img src="/assets/kfd-quality-lab.png" alt="凯丰德质量检测实验室" />
        </figure>
      </div>
      <div className="metrics-band">
        <div className="container metrics-grid">
          {metrics.map(({ value, suffix, label, text, Icon }) => (
            <article className="metric-item" key={label}>
              <Icon size={28} weight="light" aria-hidden="true" />
              <div>
                <span>{label}</span>
                <strong>{value}{suffix ? <small>{suffix}</small> : null}</strong>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
