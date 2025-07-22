"use client";
import { Form, Input, Button } from "antd";
import { useState } from "react";
import PackageList from "./PackageList";

export default function OrderForm() {
  const [packages, setPackages] = useState([{ name: "", weight: "", quantity: 1 }]);

  const onFinish = async (values: any) => {
    const token = localStorage.getItem("token");
    await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...values, packages }),
    });
    alert("Orden creada");
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="customerName" label="Nombre del Cliente" rules={[{ required: true }]}> <Input /> </Form.Item>
      <Form.Item name="customerPhone" label="Teléfono del Cliente" rules={[{ required: true }]}> <Input /> </Form.Item>
      <Form.Item name="customerAddress" label="Dirección del Cliente" rules={[{ required: true }]}> <Input /> </Form.Item>
      <PackageList packages={packages} setPackages={setPackages} />
      <Button type="primary" htmlType="submit">Crear Orden</Button>
    </Form>
  );
}