import React from 'react';

interface ButtonProps {
  title: string;
  onClick?: () => void; // Optional onClick handler
  isLoading?: boolean;
  disabled? : boolean // Optional loading state
}

const Button: React.FC<ButtonProps> = ({ title, onClick, isLoading,disabled }) => {
  return (
    <button
      className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      onClick={onClick} // Attach onClick event here
      disabled={isLoading} // Disable button when loading
      aria-disabled={isLoading} // Accessibility: Indicate button is disabled
    >
      {isLoading ? (
        <span className="inline-flex h-full w-full items-center justify-center text-white">
          Loading...
        </span>
      ) : (
        <>
          <span className={`absolute inset-[-1000%] ${disabled ? "" : "animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"}`} />
          <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-lg font-medium text-white backdrop-blur-3xl ${disabled ? "bg-neutral-400  opacity-[0.8] cursor-default" :""}`}>
            {title}
          </span>
        </>
      )}
    </button>
  );
};

export default Button;
