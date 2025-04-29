const FooterSection = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <span>Fina</span>
              <span className="bg-blue-600 h-4 w-4 rounded-full"></span>
            </h3>
            <p className="text-slate-400 mb-6">
              Empowering lenders with AI-driven financial analysis for smarter
              lending decisions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Statement Analysis
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Risk Assessment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Fraud Detection
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  API Integration
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Fina. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition mx-3"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition mx-3"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition mx-3"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
