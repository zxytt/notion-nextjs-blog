import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'group relative z-50 bg-transparent backdrop-blur-sm bg-opacity-10 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:scale-[1.02]',
        className,
      )}
    >
      {children}
    </div>
  );
}
