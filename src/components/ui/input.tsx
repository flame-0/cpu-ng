import * as React from 'react';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className = '', ...props }, ref) => (
        <input
            ref={ref}
            className={`flex h-10 w-full border border-(--border) bg-(--bg) px-3 py-2 text-sm text-(--fg) placeholder:text-(--fg-muted) transition-colors focus-visible:border-(--accent) focus-visible:outline-none disabled:opacity-50 ${className}`}
            {...props}
        />
    ),
);
Input.displayName = 'Input';

export { Input };
