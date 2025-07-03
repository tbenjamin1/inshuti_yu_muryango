import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faInstagram, faLinkedin, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-brands-svg-icons';

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Quick Links Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4 text-white/90">QUICK LINKS</h3>
          <div className="flex flex-col space-y-3">
            <a 
              href="#info-content" 
              className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
              target="_blank" 
              rel="noopener noreferrer"
            >
              About us
            </a>
            <a 
              href="#info-content" 
              className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Impact
            </a>
            <a 
              href="#info-content" 
              className="text-white/80 hover:text-white transition-colors duration-200 hover:translate-x-1 transform"
              target="_blank" 
              rel="noopener noreferrer"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4 text-white/90">GET IN TOUCH</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200">
              {/* <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" /> */}
              <span>help@highroup.rw</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200">
              {/* <FontAwesomeIcon icon={faPhone} className="w-4 h-4" /> */}
              <span>(+250) 78743 8701</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200">
              {/* <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" /> */}
              <span>IMA House, Kicukiro, Kigali</span>
            </div>
          </div>
        </div>

        {/* Social Media & App Links */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-200"
              >
                {/* <FontAwesomeIcon icon={faFacebook} size="2x" /> */}
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-200"
              >
                {/* <FontAwesomeIcon icon={faTwitter} size="2x" /> */}
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-200"
              >
                {/* <FontAwesomeIcon icon={faInstagram} size="2x" /> */}
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-200"
              >
                {/* <FontAwesomeIcon icon={faLinkedin} size="2x" /> */}
              </a>
            </div>
          </div>

         
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 mt-8 pt-6 text-center">
        <p className="text-white/80 text-sm">
          © {currentYear} Health. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;