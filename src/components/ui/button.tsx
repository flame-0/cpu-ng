import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'default' | 'sm' | 'lg';
}

const styles: Record<string, Record<string, string>> = {
    base: 'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg) disabled:opacity-40 disabled:pointer-events-none',
    variant: {
        primary:
            'bg-(--accent) text-black hover:bg-(--accent-hover)',
        secondary:
            'border border-(--border) bg-transparent text-(--fg) hover:border-(--fg-muted)',
        ghost: 'bg-transparent text-(--fg-secondary) hover:text-(--fg) hover:bg-(--bg-elevated)',
        danger:
            'bg-(--danger) text-white hover:opacity-90',
    },
    size: {
        default: 'h-9 px-4 py-2 text-sm',
        sm: 'h-7 px-3 py-1 text-xs',
        lg: 'h-11 px-6 py-3 text-base',
    },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className = '', variant = 'primary', size = 'default', ...props },
        ref,
    ) => (
        <button
            ref={ref}
            className={`${styles.base} ${styles.variant[variant]} ${styles.size[size]} ${className}`}
            {...props}
        />
    ),
);
Button.displayName = 'Button';

export { Button };
