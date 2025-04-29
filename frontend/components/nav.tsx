const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl text-slate-800 flex items-center gap-2">
          <span className="text-blue-600">Fina</span>
          <span className="bg-blue-600 h-5 w-5 rounded-full"></span>
        </div>

        <div className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-slate-600 hover:text-slate-900 transition"
          >
            Features
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition"
          >
            Solutions
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition"
          >
            Contact
          </a>
        </div>

        <div>
          <button className="hidden md:block bg-blue-50 text-blue-600 hover:bg-blue-100 px-5 py-2 rounded-full font-medium transition">
            Sign In
          </button>
          <button className="md:hidden text-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
