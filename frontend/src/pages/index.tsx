import PageLayout from "@/components/layout/page-layout";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";


function Page() {
    return (<>
        <PageLayout>
            <Outlet />
        </PageLayout>
        <Toaster />
    </>)
}

export default Page;