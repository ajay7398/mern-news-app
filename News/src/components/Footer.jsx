import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo and Description */}
        <div>
          <h1 className="text-2xl font-bold mb-2">MyWebsite</h1>
          <p className="text-sm text-gray-400">
            Building responsive and powerful web apps with modern tech.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-blue-300">Twitter</a>
            <a href="#" className="hover:text-pink-400">Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 mt-8 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
