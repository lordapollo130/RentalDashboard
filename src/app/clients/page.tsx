"use client"; //This is client component
//Component
import SideBarMain from "@/components/sidebar";
import ClientsDashboard from "./ClientsDashboard";

const MainClientsPage = () => {
    return (
        <SideBarMain>
            <div className="h-[100%]">
                <ClientsDashboard />
            </div>
        </SideBarMain>
    )
}
export default MainClientsPage;