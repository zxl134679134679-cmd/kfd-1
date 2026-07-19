import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import { App } from "./App.jsx";

describe("KFD homepage", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  test("renders the selected light editorial direction without a customer-name wall", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "高端纸包装制造，稳交付，更可靠",
      }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("凯丰德包装 KFD Packaging")).toHaveAttribute(
      "src",
      "/assets/kfd-logo.png",
    );

    expect(
      screen.getByRole("heading", { name: "制造实力，源于专业与专注" }),
    ).toBeInTheDocument();

    for (const metric of ["2015", "200 亩", "1.2 亿㎡", "多条生产线"]) {
      expect(screen.getByText(metric)).toBeInTheDocument();
    }

    expect(
      screen.queryByRole("heading", { name: "服务行业头部客户" }),
    ).not.toBeInTheDocument();

    for (const name of ["海尔", "海信", "正大", "海氏海诺"]) {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    }
  });

  test("routes primary navigation to the two detail pages", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "产品中心" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "制造能力" })).toHaveAttribute(
      "href",
      "/manufacturing",
    );
    expect(screen.getByRole("link", { name: "品质保障" })).toHaveAttribute(
      "href",
      "/manufacturing#quality",
    );
  });

  test("falls back to the homepage for an unknown path", () => {
    window.history.pushState({}, "", "/missing");
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "高端纸包装制造，稳交付，更可靠" }),
    ).toBeInTheDocument();
  });

  test("renders the product solutions page and opens its quote entry", async () => {
    window.history.pushState({}, "", "/products");
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "从结构保护到品牌呈现" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "提交包装需求" }));
    expect(screen.getByRole("dialog", { name: "提交包装需求" })).toBeInTheDocument();
  });

  test("renders real manufacturing evidence and opens its quote entry", async () => {
    window.history.pushState({}, "", "/manufacturing");
    const user = userEvent.setup();
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "让每一次交付，都有制造依据" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("凯丰德高宝六色胶印设备")).toHaveAttribute(
      "src",
      "/assets/kfd-kba-printing.png",
    );
    await user.click(screen.getByRole("button", { name: "提交包装需求" }));
    expect(screen.getByRole("dialog", { name: "提交包装需求" })).toBeInTheDocument();
  });

  test("opens the quote flow and validates a missing product selection", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: "提交询价" })[0]);

    expect(screen.getByRole("dialog", { name: "提交包装需求" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "下一步" }));
    expect(screen.getByText("请选择产品类型")).toBeInTheDocument();
  });

  test("preselects a product from the product solutions page", async () => {
    window.history.pushState({}, "", "/products");
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "针对彩印纸箱询价" }));

    expect(screen.getByRole("radio", { name: "彩印纸箱" })).toBeChecked();
  });

  test("does not expose customer names on either detail page", () => {
    for (const path of ["/products", "/manufacturing"]) {
      window.history.pushState({}, "", path);
      const { unmount } = render(<App />);
      for (const name of ["海尔", "海信", "正大", "海氏海诺"]) {
        expect(screen.queryByText(name)).not.toBeInTheDocument();
      }
      unmount();
    }
  });

  test("completes the three-step quote flow locally", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: "提交询价" })[0]);
    await user.click(screen.getByRole("radio", { name: "普通纸箱" }));
    await user.click(screen.getByRole("button", { name: "下一步" }));
    await user.type(screen.getByLabelText("包装尺寸（长 × 宽 × 高）"), "500 × 320 × 280 mm");
    await user.type(screen.getByLabelText("预计数量"), "10000");
    await user.click(screen.getByRole("button", { name: "下一步" }));
    await user.type(screen.getByLabelText("联系人姓名"), "王先生");
    await user.type(screen.getByLabelText("公司名称"), "示例公司");
    await user.type(screen.getByLabelText("联系电话"), "13800000000");
    await user.type(screen.getByLabelText("微信或邮箱"), "example@company.cn");
    await user.click(screen.getByRole("button", { name: "提交需求" }));

    expect(screen.getByRole("heading", { name: "需求已记录" })).toBeInTheDocument();
  });
});
