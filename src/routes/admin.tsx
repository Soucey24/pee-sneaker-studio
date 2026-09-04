import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useAuth } from "@/context/auth";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin-login" />;
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="admin-content min-w-0 lg:ml-64"><Outlet /></main>
    </div>
  );
}
