import { Link } from "react-router-dom";

export const NavigationBar = () => {
  return (
<>
  <header className="text-2xl font-mono text-white top-0 z-[20] p-5 mx-5 mt-5 flex items-center justify-between flex-wrap sm:flex-nowrap">
    <Link to="/" className="transition-transform duration-300 hover:translate-y-[-4px]">StarSeeker</Link>
    <div className="flex items-center space-x-5 mt-4 sm:mt-0">
      <Link to="/" className="transition-transform duration-300 hover:translate-y-[-3px]">Home</Link>
      <Link to="/hiredArtists" className="transition-transform duration-300 hover:translate-y-[-2px]">Contratos</Link>
    </div>
  </header>
</>
  );
};