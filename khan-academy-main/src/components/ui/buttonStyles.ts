export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 whitespace-nowrap';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-700 text-white shadow-sm hover:bg-primary-800 hover:shadow-lg',
  secondary: 'bg-secondary-600 text-white shadow-sm hover:bg-secondary-700 hover:shadow-lg',
  accent: 'bg-accent-500 text-ink shadow-sm hover:bg-accent-400 hover:shadow-lg',
  outline: 'border border-line bg-white text-ink hover:border-primary-700 hover:text-primary-700',
  ghost: 'text-ink hover:bg-primary-50 hover:text-primary-700',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm sm:text-base',
  lg: 'h-12 px-6 text-base',
};

export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  extra = '',
): string {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(' ');
}
