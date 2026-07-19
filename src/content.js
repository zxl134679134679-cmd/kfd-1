import {
  CalendarBlank,
  Factory,
  Headset,
  Package,
  Ruler,
  ShieldCheck,
  Stack,
  Wrench,
} from "@phosphor-icons/react";

export const products = [
  {
    id: "board",
    name: "瓦楞纸板",
    image: "/assets/product-board.png",
    alt: "多层瓦楞纸板近景",
    description: "多种楞型与克重可选，兼顾强度、平整度与后续加工适配。",
  },
  {
    id: "carton",
    name: "普通纸箱",
    image: "/assets/product-carton.png",
    alt: "生产线上的普通瓦楞纸箱",
    description: "面向运输与仓储场景，根据尺寸、承重和堆码需求定制结构。",
  },
  {
    id: "color",
    name: "彩印纸箱",
    image: "/assets/product-color.png",
    alt: "蓝色彩印包装纸箱",
    description: "胶印与水印能力兼顾保护性能和品牌呈现，让包装更具识别度。",
  },
];

export const metrics = [
  { value: "2015", suffix: "年", label: "成立时间", text: "深耕纸包装制造", Icon: CalendarBlank },
  { value: "200 亩", suffix: "", label: "占地面积", text: "自有现代化厂区", Icon: Factory },
  { value: "1.2 亿㎡", suffix: "", label: "年产能", text: "瓦楞纸板生产能力", Icon: Stack },
  { value: "多条生产线", suffix: "", label: "设备能力", text: "自动化高效制造", Icon: Ruler },
];

export const capabilities = [
  {
    title: "瓦楞生产线",
    image: "/assets/kfd-corrugator.jpeg",
    alt: "凯丰德瓦楞纸板生产线",
  },
  {
    title: "高精印刷设备",
    image: "/assets/kfd-kba-printing.png",
    alt: "凯丰德高宝胶印设备",
  },
  {
    title: "标准化生产车间",
    image: "/assets/kfd-corrugator.jpeg",
    alt: "凯丰德标准化生产车间",
  },
  {
    title: "品质检测中心",
    image: "/assets/kfd-quality-lab.png",
    alt: "凯丰德品质检测实验室",
  },
];

export const processSteps = [
  { number: "01", title: "选择产品", text: "确定纸板、普通纸箱或彩印纸箱", Icon: Package },
  { number: "02", title: "填写规格", text: "提交尺寸、数量、材质与印刷需求", Icon: Wrench },
  { number: "03", title: "专人报价", text: "业务人员审核需求并沟通交付方案", Icon: Headset },
];
