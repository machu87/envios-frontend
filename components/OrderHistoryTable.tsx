"use client";
import { Table, Button } from "antd";
import { useEffect, useState } from "react";

export default function OrderHistoryTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const exportCSV = () => {
    window.open("/api/orders/export", "_blank");
  };

  return (
    <>
      <Button onClick={exportCSV} style={{ marginBottom: 16 }}>Exportar CSV</Button>
      <Table dataSource={orders} rowKey="id" columns={[
        { title: "Cliente", dataIndex: "customerName" },
        { title: "Teléfono", dataIndex: "customerPhone" },
        { title: "Dirección", dataIndex: "customerAddress" },
        { title: "Fecha", dataIndex: "createdAt" },
      ]} />
    </>
  );
}