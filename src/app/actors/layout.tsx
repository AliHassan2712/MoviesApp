//components
import Header from "@/components/header/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>

    );
}
