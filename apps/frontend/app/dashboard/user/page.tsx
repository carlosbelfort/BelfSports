"use client";

import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function UserDashboard() {
 

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-6">Minha Área</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Galeria de Fotos">
          <a href="../gallery">
          <Button variant="sky">
            Acessar galeria
          </Button> 
          </a>         
        </Card>
        
      </div>
    </main>
  );
}
