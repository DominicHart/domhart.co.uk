import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-code-dark-gray text-center py-5 md:py-4 px-8">
      <p className="text-code-gray text-sm md:text-lg">&copy; Dom Hart {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;