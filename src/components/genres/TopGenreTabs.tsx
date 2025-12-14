import GenreTabs from "@/components/genres/GenreTabs";

export default function TopGenreTabs({
  genres,
  activeTab,
  onChange,
}: {
  genres: string[];
  activeTab: string;
  onChange: (g: string) => void;
}) {
  return (
    <div className="flex justify-center mb-6">
      <GenreTabs
        genres={genres}
        activeGenre={activeTab}
        onChange={onChange}
        wrapperClassName="flex gap-4 bg-soft p-2 rounded-full"
        buttonClassName={(g) =>
          g === activeTab
            ? "px-6 py-2 bg-card rounded-full shadow"
            : "px-6 py-2 text-muted hover:bg-card rounded-full"
        }
      />
    </div>
  );
}
