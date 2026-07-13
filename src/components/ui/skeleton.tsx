import * as React from 'react';

function Skeleton({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`bg-(--bg-surface) animate-[pulse_2s_ease-in-out_infinite] ${className}`} {...props} />;
}
export { Skeleton };
