"use client";

// React
import { useEffect, useState } from "react";

//types
import { HeroItem } from "@/types/hero";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

type HeroType = "movies" | "series";

type UseHeroItemsProps = {
    type: HeroType;
    limit?: number;
    intervalMs?: number;
};

export default function useHeroItems({
    type,
    limit = 5,
    intervalMs = 7000,
}: UseHeroItemsProps) {
    const [items, setItems] = useState<HeroItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch(`${API_URL}/${type}`);
                const data = await res.json();

                const featuredItems = (data.data || [])
                    .slice(0, limit);

                setItems(featuredItems);
            } catch (e) {
                console.error("Hero fetch failed", e);
            } finally {
                setLoading(false);
            }
        }

        fetchItems();
    }, [type, limit]);

    useEffect(() => {
        if (items.length <= 1) return;

        const id = setInterval(() => {
            setActiveIndex((i) => (i + 1) % items.length);
        }, intervalMs);

        return () => clearInterval(id);
    }, [items, intervalMs]);

    return {
        item: items[activeIndex],
        loading,
        activeIndex,
        total: items.length,
        setActiveIndex,
    };
}
