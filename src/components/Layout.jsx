import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container mx-auto flex flex-col p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Event Scheduler</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
