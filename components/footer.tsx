import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-secondary">
      <div className="p-5 flex-center">
        {currentYear} {APP_NAME}. All rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
