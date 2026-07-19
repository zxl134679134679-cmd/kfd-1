import { ArrowRight, CheckCircle, CirclesFour, Headset, Stack } from "@phosphor-icons/react";
import { capabilities } from "../content.js";

const values = [
  ["稳定交付", "计划清晰，按期交付", Stack],
  ["品质保障", "来料到成品，层层检验", CheckCircle],
  ["灵活定制", "规格、结构与工艺匹配", CirclesFour],
  ["专业对接", "专人跟进，及时响应", Headset],
];

export function Capabilities() {
  return (
    <section className="section capabilities-section" id="capabilities">
      <div className="container">
        <div className="section-heading dark-section-heading">
          <div><p className="eyebrow dark">CAPABILITIES</p><h2>设备、工艺与检测，构成稳定交付</h2></div>
          <a href="#quality">查看品质保障 <ArrowRight size={18} /></a>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <figure key={item.title}>
              <img src={item.image} alt={item.alt} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
        <div className="value-grid" id="quality">
          {values.map(([title, text, Icon]) => (
            <div className="value-item" key={title}>
              <Icon size={30} weight="light" aria-hidden="true" />
              <div><strong>{title}</strong><span>{text}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
