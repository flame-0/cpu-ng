import { useState, useEffect, useCallback, useRef } from 'react';
import Fuse from 'fuse.js';
import { navigate } from 'astro:transitions/client';
import { Dialog, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

interface PostIndexEntry {
    title: string; slug: string; excerpt: string; date: string; categories: string[];
}

export default function SearchDialog({ className = '' }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<PostIndexEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [fuse, setFuse] = useState<Fuse<PostIndexEntry> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('/search-index.json').then(r => r.json()).then((data: PostIndexEntry[]) => {
            setFuse(new Fuse(data, { keys: ['title', 'excerpt', 'categories', 'tags'], threshold: 0.3, includeScore: true }));
        }).catch(() => {});
    }, []);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(p => !p); }
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const search = useCallback((q: string) => {
        setQuery(q);
        if (!q.trim() || !fuse) { setResults([]); return; }
        setLoading(true);
        setResults(fuse.search(q).map(r => r.item).slice(0, 8));
        setLoading(false);
    }, [fuse]);

    useEffect(() => {
        if (open) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(''); setResults([]); }
    }, [open]);

    return (
        <>
            <button onClick={() => setOpen(true)} aria-label="Open search" className={`flex items-center gap-1.5 rounded-full border border-(--border) bg-(--bg) px-3 py-2 sm:px-3 sm:py-2 text-sm text-(--fg-muted) transition-colors hover:border-(--fg-muted) hover:text-(--fg-secondary) ${className}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                <span>Search</span>
                <kbd className="ml-2 hidden rounded-full border border-(--border) px-1.5 py-1 text-xs text-(--fg-muted) md:inline-block">Ctrl+K</kbd>
            </button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Search posts</DialogTitle>
                <Input ref={inputRef} type="text" placeholder="Type to search..." value={query} onChange={e => search(e.target.value)} />
                <div className="mt-4 max-h-64 overflow-y-auto">
                    {loading && <div className="space-y-2"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>}
                    {!loading && query && results.length === 0 && (
                        <p className="py-6 text-center text-sm text-(--fg-muted)">No results for &ldquo;{query}&rdquo;</p>
                    )}
                    {!loading && results.map(post => (
                        <div key={post.slug} role="button" tabIndex={0} onClick={() => { setOpen(false); navigate(`/posts/${post.slug}`); }} onKeyDown={(e) => { if (e.key === "Enter") { setOpen(false); navigate(`/posts/${post.slug}`); } }} className="block w-full text-left rounded-lg px-3 py-2.5 transition-colors hover:bg-(--accent-subtle) active:bg-(--accent-subtle) cursor-pointer">
                            <div className="text-sm font-bold text-(--fg)">{post.title}</div>
                            <div className="mt-0.5 line-clamp-1 text-xs text-(--fg-secondary)">{post.excerpt}</div>
                        </div>
                    ))}
                </div>
            </Dialog>
        </>
    );
}
