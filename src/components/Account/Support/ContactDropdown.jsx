import { forwardRef } from "react";

export const ContactDropdown = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="category-title"
  >
    {children}
  </a>
));
