import { ReactNode } from "react";
import { Link, useNavigate } from "react-router";

interface LinkButtonProps {
  children: ReactNode;
  to: string;
  ariaLabel?: string;
}

const className = "text-sm text-blue-500 hover:text-blue-600 font-semibold";

function LinkButton({ children, to, ariaLabel }: LinkButtonProps) {
  const navigate = useNavigate();

  if (to === "-1")
    return (
      <button
        className={className}
        onClick={() => navigate(-1)}
        aria-label='Go back'>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export default LinkButton;
