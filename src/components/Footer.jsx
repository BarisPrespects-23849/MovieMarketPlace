import PropTypes from 'prop-types';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white text-center p-4">
      © {currentYear} Movie Marketplace. All rights reserved.
    </footer>
  );
}

export default Footer;
