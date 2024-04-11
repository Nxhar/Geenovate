import Sidebar from "@/components/Sidebar";

export const metadata = {
    title: "WizzAI",
    description: "An AI tool heaven that aims to streamline educational workflow and boost productivity.",
  };

  export default function RootLayout({ children }) {
  
  
    return (
        <div>
            <Sidebar />
            <div className="pl-64">
                {children}
            </div>
        </div>
    );
  }