import { forwardRef } from "react";

export const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={"d-flex align-items-center"}
  >
    {children}
    {children === "Date" || children === "Amount" ? (
      <div className={"d-flex flex-column flex-wrap"}>
        <span
          className="material-symbols-outlined"
          style={{ height: "10px", fontSize: 26 }}
        >
          arrow_drop_up
        </span>
        <span className="material-symbols-outlined" style={{ fontSize: 26 }}>
          arrow_drop_down
        </span>
      </div>
    ) : (
      <span
        className="material-symbols-outlined align-self-center"
        style={{ fontSize: 26 }}
      >
        arrow_drop_down
      </span>
    )}
  </a>
));
