import Navbar from "../ui/dashboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <>
        <Navbar />
        <div className="pt-0 md:pt-14 px-10">{children}</div>
      </>
    </main>
  );
}
