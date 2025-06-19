import Navbar from "@/components/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="p-6">{children}</main>
        </div>
    );
}
