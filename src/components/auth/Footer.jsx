import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import appStoreLogo from '../images/apple-log.png';
import playStoreLogo from '../images/playstore.png';

const currentYear = new Date().getFullYear();
const Footer = () => (
   

    <footer className="footer-container">
        <div className="  flex justify-around quick_inks  ">
            <div className=' flex w-full' >
                {/* quick Links */}
                <div className="quick-links flex flex-col ">
                    <span className='text-start' >QUICK LINKS</span>
                    <a href="#info-content" target="_blank" rel="noopener noreferrer">
                        About us
                    </a>
                    <a href="#info-content" target="_blank" rel="noopener noreferrer">
                        Impact
                    </a>
                    <a href="#info-content" target="_blank" rel="noopener noreferrer">
                        How it works
                    </a>

                </div>
                <div className="quick-links flex flex-col  mx-10">
                    <span className='text-start' >GET IN TOUCH</span>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="" /> <span className='capitalize px-2' >jalikoi@jaligroup.rw</span>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="" /><span className='px-2' >(+250) 78743 8701</span>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="" /> <span className='capitalize px-2' >IMA House, Sonatubes, Kigali</span>
                    </a>

                </div>

            </div>
            <div className=' flex flex-col justify-between' >
                {/* Social Media Links */}
                <div className="flex justify-between store_link">
                    <a href="https://www.facebook.com/profile.php?id=61568380481941&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                    <a href="https://www.linkedin.com/company/jalikoi-rewards/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                </div>

                {/* App Store and Play Store Links */}
                <div className="store-links store_link">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src={appStoreLogo} alt="App Store" className="store-logo" />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=koipay.co.koipay&pli=1" className=' flex justify-end ' target="_blank" rel="noopener noreferrer">
                        <img src={playStoreLogo} alt="Google Play Store" className="store-logo" />
                    </a>
                </div>
            </div>
        </div>
        <div className="footer-bottom">
            <p>© {currentYear} JaliKoi. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;
