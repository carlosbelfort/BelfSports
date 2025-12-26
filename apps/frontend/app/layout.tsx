import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <Header /> {/* ✅ HEADER GLOBAL */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
