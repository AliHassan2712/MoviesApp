"use client";

import { Container } from "@/components/containers/Container";
import Hero from "./components/Hero";
import HomeSection from "./components/HomeSection";
import { useHomeSection } from "./hooks/useHomeSection";
import { PATHS } from "@/constant/PATHS";

export default function HomePageComponent() {
  const topRated = useHomeSection("/movies?sort=rating");
  const recent = useHomeSection("/movies?sort=createdAt");
  const mostViewed = useHomeSection("/movies?sort=views");

  return (
    <>
      <Hero type="movies" limit={5} />

      <Container>
        <HomeSection
          title="⭐ Top Rated"
          items={topRated.data}
          loading={topRated.loading}
          viewAllHref={PATHS.MOVIES + "?sort=rating"}
        />

        <HomeSection
          title="🆕 Recently Added"
          items={recent.data}
          loading={recent.loading}
          viewAllHref={PATHS.MOVIES + "?sort=createdAt"}
        />

        <HomeSection
          title="👁️ Most Viewed"
          items={mostViewed.data}
          loading={mostViewed.loading}
          viewAllHref={PATHS.MOVIES + "?sort=views"}
        />
      </Container>
    </>
  );
}

