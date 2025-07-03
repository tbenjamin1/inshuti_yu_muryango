import React from 'react';
import NewNavBar from '../auth/NewNavBar';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
         <NewNavBar />
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100 pt-28">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center mr-6">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.4 14.8 17.4H9.2C8.6 17.4 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7ZM12 8.2C11.2 8.2 10.5 8.9 10.5 9.7V11.5H13.5V9.7C13.5 8.9 12.8 8.2 12 8.2Z" />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
              <p className="text-gray-600 text-lg">Your privacy is our priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction Card */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H5V21H19V9Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment to You</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We value your privacy and are committed to protecting your personal information. 
              This policy explains how we collect, use, and safeguard your data with the highest 
              standards of security and transparency.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="grid gap-6">
          {/* Data Collection */}
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C17.52 2 22 6.48 22 12S17.52 22 12 22 2 17.52 2 12 6.48 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h3>
                <p className="text-gray-600 leading-relaxed">
                  We only collect information necessary for providing our services. This includes basic 
                  contact information, service preferences, and anonymized usage data to improve our 
                  platform. We never collect sensitive personal information without explicit consent.
                </p>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Protection & Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data is protected with industry-standard encryption and security measures. 
                  We maintain strict access controls and regularly audit our systems to ensure 
                  your information remains secure and confidential at all times.
                </p>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12C15.7 12 15.4 11.9 15.1 11.9L12.6 14.4C12.9 15.1 12.9 15.9 12.6 16.6L15.1 19.1C15.4 19 15.7 19 16 19C18.2 19 20 20.8 20 23S18.2 27 16 27 12 25.2 12 23C12 22.7 12.1 22.4 12.1 22.1L9.6 19.6C8.9 19.9 8.1 19.9 7.4 19.6L4.9 22.1C5 22.4 5 22.7 5 23C5 25.2 3.2 27 1 27S-3 25.2 -3 23 -1.2 19 1 19C1.3 19 1.6 19.1 1.9 19.1L4.4 16.6C4.1 15.9 4.1 15.1 4.4 14.4L1.9 11.9C1.6 12 1.3 12 1 12C-1.2 12 -3 10.2 -3 8S-1.2 4 1 4 5 5.8 5 8C5 8.3 4.9 8.6 4.9 8.9L7.4 11.4C8.1 11.1 8.9 11.1 9.6 11.4L12.1 8.9C12 8.6 12 8.3 12 8C12 5.8 13.8 4 16 4Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Sharing Policy</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data is never shared with third parties without your explicit consent. 
                  We do not sell, rent, or trade your personal information. Any data sharing 
                  occurs only when legally required or with your direct authorization.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H5V21H19V9Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Rights & Control</h3>
                <p className="text-gray-600 leading-relaxed">
                  You can request to view, update, or delete your data at any time. We provide 
                  easy-to-use tools for managing your privacy preferences and will respond to 
                  your requests promptly and transparently.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-400 rounded-xl shadow-lg p-8 mt-8 text-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Questions About Your Privacy?</h3>
            <p className="text-lg mb-6 opacity-90">
              For more details about our privacy practices or to exercise your rights, 
              please don't hesitate to contact us.
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 inline-block">
              <p className="text-lg font-medium text-white">
                <a href="mailto:Inshuti@Umubyeyi.com" className="hover:underline">
                  Inshuti@Umubyeyi.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;