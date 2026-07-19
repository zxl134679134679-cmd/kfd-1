import { ArrowLeft, ArrowRight, CheckCircle, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { products } from "../content.js";

const emptyForm = {
  product: "",
  size: "",
  quantity: "",
  material: "",
  printing: "",
  notes: "",
  name: "",
  company: "",
  phone: "",
  alternateContact: "",
};

export function QuoteDialog({ open, initialProduct = "", onClose }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("editing");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ ...emptyForm, product: initialProduct });
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setStep(1);
    setStatus("editing");
    setErrors({});
    setForm({ ...emptyForm, product: initialProduct });
    closeRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [initialProduct, onClose, open]);

  if (!open) return null;

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const next = () => {
    if (step === 1 && !form.product) {
      setErrors({ product: "请选择产品类型" });
      return;
    }
    if (step === 2) {
      const nextErrors = {};
      if (!form.size.trim()) nextErrors.size = "请填写包装尺寸";
      if (!form.quantity.trim()) nextErrors.quantity = "请填写预计数量";
      if (Object.keys(nextErrors).length) {
        setErrors(nextErrors);
        return;
      }
    }
    setErrors({});
    setStep((current) => Math.min(3, current + 1));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "请填写联系人姓名";
    if (!form.company.trim()) nextErrors.company = "请填写公司名称";
    if (!form.phone.trim()) nextErrors.phone = "请填写联系电话";
    if (!form.alternateContact.trim()) nextErrors.alternateContact = "请填写微信或邮箱";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setStatus("success");
  };

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="quote-dialog" role="dialog" aria-modal="true" aria-labelledby="quote-title">
        <button ref={closeRef} className="dialog-close" type="button" onClick={onClose} aria-label="关闭询价窗口">
          <X size={24} />
        </button>

        {status === "success" ? (
          <div className="quote-success">
            <CheckCircle size={58} weight="light" aria-hidden="true" />
            <p className="eyebrow dark">REQUEST RECEIVED</p>
            <h2 id="quote-title">需求已记录</h2>
            <p>业务人员将尽快与您联系，进一步确认材料、工艺与交付要求。</p>
            <button className="button button-primary" type="button" onClick={onClose}>完成</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="eyebrow dark">QUOTE REQUEST</p>
            <h2 id="quote-title">提交包装需求</h2>
            <div className="quote-progress" aria-label={`询价进度：第 ${step} 步，共 3 步`}>
              {["选择产品", "填写规格", "联系信息"].map((label, index) => (
                <span className={step >= index + 1 ? "active" : ""} key={label}>{index + 1}. {label}</span>
              ))}
            </div>

            {step === 1 ? (
              <fieldset className="product-options">
                <legend>您需要哪类包装？</legend>
                {products.map((product) => (
                  <label key={product.name}>
                    <input
                      aria-label={product.name}
                      type="radio"
                      name="product"
                      value={product.name}
                      checked={form.product === product.name}
                      onChange={(event) => update("product", event.target.value)}
                    />
                    <span><strong>{product.name}</strong><small>{product.description}</small></span>
                  </label>
                ))}
                {errors.product ? <p className="field-error">{errors.product}</p> : null}
              </fieldset>
            ) : null}

            {step === 2 ? (
              <div className="form-grid">
                <label>包装尺寸（长 × 宽 × 高）<input value={form.size} onChange={(event) => update("size", event.target.value)} placeholder="例如 500 × 320 × 280 mm" />{errors.size ? <span className="field-error">{errors.size}</span> : null}</label>
                <label>预计数量<input value={form.quantity} onChange={(event) => update("quantity", event.target.value)} placeholder="例如 10,000 件" />{errors.quantity ? <span className="field-error">{errors.quantity}</span> : null}</label>
                <label>材质或楞型<input value={form.material} onChange={(event) => update("material", event.target.value)} placeholder="不确定可留空，由业务员协助" /></label>
                <label>印刷需求<input value={form.printing} onChange={(event) => update("printing", event.target.value)} placeholder="例如 单色水印 / 彩色胶印" /></label>
                <label className="full-field">补充说明<textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} rows="4" placeholder="可填写用途、承重、交付时间等要求" /></label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="form-grid">
                <label>联系人姓名<input value={form.name} onChange={(event) => update("name", event.target.value)} />{errors.name ? <span className="field-error">{errors.name}</span> : null}</label>
                <label>公司名称<input value={form.company} onChange={(event) => update("company", event.target.value)} />{errors.company ? <span className="field-error">{errors.company}</span> : null}</label>
                <label>联系电话<input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />{errors.phone ? <span className="field-error">{errors.phone}</span> : null}</label>
                <label>微信或邮箱<input value={form.alternateContact} onChange={(event) => update("alternateContact", event.target.value)} />{errors.alternateContact ? <span className="field-error">{errors.alternateContact}</span> : null}</label>
              </div>
            ) : null}

            <div className="dialog-actions">
              {step > 1 ? <button className="dialog-back" type="button" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={18} /> 返回</button> : <span />}
              {step < 3 ? <button className="button button-primary" type="button" onClick={next}>下一步 <ArrowRight size={18} /></button> : <button className="button button-primary" type="submit">提交需求 <ArrowRight size={18} /></button>}
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
