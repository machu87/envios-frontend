"use client";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    const res = await fetch(`/api/auth/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/orden/nueva");
    } else {
      alert(data.message);
    }
    setLoading(false);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item name="email" label="Email" rules={[{ required: true }]}> <Input /> </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}> <Input.Password /> </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} block>
        {type === "login" ? "Iniciar sesión" : "Registrarse"}
      </Button>
    </Form>
  );
}