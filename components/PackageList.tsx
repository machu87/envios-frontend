"use client";
import { Input, Button, Space } from "antd";

export default function PackageList({ packages, setPackages }) {
  const updatePackage = (i, field, value) => {
    const newPackages = [...packages];
    newPackages[i][field] = value;
    setPackages(newPackages);
  };

  return (
    <>
      {packages.map((pkg, i) => (
        <Space key={i} style={{ display: "flex", marginBottom: 8 }}>
          <Input placeholder="Nombre" value={pkg.name} onChange={e => updatePackage(i, "name", e.target.value)} />
          <Input placeholder="Peso" value={pkg.weight} onChange={e => updatePackage(i, "weight", e.target.value)} />
          <Input placeholder="Cantidad" value={pkg.quantity} onChange={e => updatePackage(i, "quantity", e.target.value)} />
        </Space>
      ))}
      <Button onClick={() => setPackages([...packages, { name: "", weight: "", quantity: 1 }])}>Agregar Paquete</Button>
    </>
  );
}