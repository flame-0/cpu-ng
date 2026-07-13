import * as React from 'react';

function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex flex-col h-full border border-(--border-light) bg-(--bg-elevated) ${className}`} {...props} />;
}

function CardHeader({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex flex-col gap-1.5 p-5 ${className}`} {...props} />;
}

function CardTitle({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <h3 className={`font-bold leading-snug ${className}`} {...props} />;
}

function CardDescription({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <p className={`text-sm text-(--fg-secondary) leading-relaxed ${className}`} {...props} />;
}

function CardFooter({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`flex items-center mt-auto p-5 pt-0 ${className}`} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardFooter };
