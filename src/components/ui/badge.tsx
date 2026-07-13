import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'accent' | 'default';
}

function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
    const v = variant === 'accent'
        ? 'bg-(--accent-subtle) text-(--accent)'
        : 'bg-(--bg-surface) text-(--fg-secondary) border border-(--border-light)';
    return <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${v} ${className}`} {...props} />;
}

export { Badge };
