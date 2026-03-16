type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function Card({ children, className = "", style }: CardProps) {
  return (
    <div
      style={style}
      className={`rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
