import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      icon: <Facebook className="text-blue-600 group-hover:scale-110" />,
      href: "https://facebook.com",
    },
    {
      icon: <Instagram className="text-pink-500 group-hover:scale-110" />,
      href: "https://www.instagram.com/shami_9.8/",
    },
    {
      icon: <Twitter className="text-sky-500 group-hover:scale-110" />,
      href: "https://twitter.com",
    },
    {
      icon: <Linkedin className="text-blue-700 group-hover:scale-110" />,
      href: "https://www.linkedin.com/in/shami-alam/",
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 pt-12 pb-6 mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">UrShop</h2>
          <p className="text-gray-600 text-sm mb-4">
            Your one-stop shop for everything trendy, reliable, and affordable.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={16} /> <span>Mumbai, India</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
            <Phone size={16} /> <span>+91 9423211499</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
            <Mail size={16} /> <span>support@urshop.com</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-800">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-indigo-600 cursor-pointer">Home</li>
            <li className="hover:text-indigo-600 cursor-pointer">Shop</li>
            <li className="hover:text-indigo-600 cursor-pointer">About Us</li>
            <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-800">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-indigo-600 cursor-pointer">FAQ</li>
            <li className="hover:text-indigo-600 cursor-pointer">Shipping</li>
            <li className="hover:text-indigo-600 cursor-pointer">Returns</li>
            <li className="hover:text-indigo-600 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-800">
            Follow Us
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Connect with us on social platforms
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 bg-white rounded-full shadow hover:shadow-md transition-transform duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">UrShop</span>. All rights reserved.
      </div>
    </footer>
  );
}
