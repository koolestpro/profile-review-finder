import { createFileRoute } from "@tanstack/react-router";
import { ListingFinder } from "@/components/listing-finder";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Google Maps Listing Finder | Plaque Setup" },
      {
        name: "description",
        content:
          "Search and select your Google Maps business listing, set plate quantities, and add multiple profiles before your plaque ships.",
      },
      { property: "og:title", content: "Google Maps Listing Finder" },
      {
        property: "og:description",
        content:
          "Select your Google business listing and choose plate quantities for each profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <ListingFinder />
    </main>
  );
}
