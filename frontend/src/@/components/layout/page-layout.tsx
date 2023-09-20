import { ReactNode } from "react";
import Header from "./header/header";

interface LayoutProps {
    children: ReactNode;
}

function PageLayout({ children }: LayoutProps) {
    return <>
        <Header />
        {children}
    </>
}

export default PageLayout;