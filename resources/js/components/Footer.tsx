import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-code-dark-gray text-center p-12">
      <p className="text-code-gray md:text-xl">&copy; Dominic Hart {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;