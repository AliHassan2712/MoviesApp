"use client";
import { Genre } from "@/types/movie";
import { useState, useEffect, useMemo } from "react";



export const useGenres = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [activeTab, setActiveTab] = useState("0");
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        async function fetchData() {
            try {
                const genresRes = await
                    fetch(`${API_URL}/genres`
                    );

                const genresData = await genresRes.json();

                setGenres(genresData.data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [API_URL]);



    const allGenres = useMemo(() => {
        return [{_id: "0", name_en: "all"}].concat(genres);     
    }, [genres]);


    return {
        allGenres,
        activeTab,
        loading,
        setActiveTab,
    };
};
