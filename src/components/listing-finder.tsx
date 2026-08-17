import { useMemo, useState } from "react";
import { Check, Plus, Search } from "lucide-react";

const SUGGESTIONS = [
  "The Corner Barbers — 12 High St, Manchester",
  "Bloom & Bean Coffee — 4 Park Rd, Leeds",
  "Willow Dental Practice — 88 Queen St, Bristol",
  "Northside Auto Repairs — 3 Mill Ln, Sheffield",
  "Casa Verde Tapas — 21 Bridge St, Glasgow",
];

const MAX_PLATES = 5;

type Profile = {
  id: number;
  quantity: number;
  location: string;
  reviewLink: string;
  businessName: string;
  postcode: string;
};

let nextId = 2;

const newProfile = (): Profile => ({
  id: nextId++,
  quantity: 1,
  location: "",
  reviewLink: "",
  businessName: "",
  postcode: "",
});

export function ListingFinder() {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 1,
      quantity: 1,
      location: "",
      reviewLink: "",
      businessName: "",
      postcode: "",
    },
  ]);
  const [openFor, setOpenFor] = useState<number | null>(null);
  const [manual, setManual] = useState(false);

  const totalPlates = useMemo(
    () => profiles.reduce((sum, p) => sum + p.quantity, 0),
    [profiles],
  );

  const update = (id: number, patch: Partial<Profile>) =>
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const remaining = MAX_PLATES - totalPlates;

  const isComplete = (p: Profile) =>
    manual
      ? Boolean(p.reviewLink.trim() || (p.businessName.trim() && p.postcode.trim()))
      : Boolean(p.location);

  return (
    <section className="w-full max-w-2xl rounded-xl border-2 border-panel-border bg-panel p-5 shadow-panel sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-sm">
          <h1 className="text-xl font-bold tracking-tight text-brand-ink">
            {manual ? "Add Your Listing Manually" : "Find Your Google Maps Listing"}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-brand-ink/80">
            {manual ? (
              <>
                Paste your Google review link, or just add your business name and
                postcode and we will find the review link for you.
              </>
            ) : (
              <>
                Search for your business and select your business, if you can not find
                your business,{" "}
                <button
                  type="button"
                  onClick={() => setManual(true)}
                  className="font-semibold text-brand underline underline-offset-2"
                >
                  add it manually here
                </button>
                .
              </>
            )}
          </p>
        </div>
        <span className="rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold text-brand-ink">
          {totalPlates}/{MAX_PLATES} Plates
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            className="rounded-lg border border-border bg-background/70 p-4"
          >
            <div className="mb-2 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand-ink">
                <Check className="size-3.5" />
                {isComplete(profile)
                  ? "1 of 1 products selected"
                  : manual
                    ? "Add your review link or business details"
                    : "No listing selected yet"}
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="sm:w-24">
                <label
                  htmlFor={`qty-${profile.id}`}
                  className="mb-1 block text-sm font-medium text-brand-ink"
                >
                  Quantity
                </label>
                <select
                  id={`qty-${profile.id}`}
                  value={profile.quantity}
                  onChange={(e) =>
                    update(profile.id, { quantity: Number(e.target.value) })
                  }
                  className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm font-semibold text-brand-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
                >
                  {Array.from(
                    { length: Math.max(1, profile.quantity + remaining) },
                    (_, i) => i + 1,
                  ).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {manual ? (
                <div className="flex-1 space-y-3">
                  <div>
                    <label
                      htmlFor={`link-${profile.id}`}
                      className="mb-1 block text-sm font-medium text-brand-ink"
                    >
                      Google Review Link
                    </label>
                    <input
                      id={`link-${profile.id}`}
                      value={profile.reviewLink}
                      placeholder="https://g.page/r/..."
                      onChange={(e) =>
                        update(profile.id, { reviewLink: e.target.value })
                      }
                      className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30"
                    />
                  </div>

                  <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    or
                    <span className="h-px flex-1 bg-border" />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1">
                      <label
                        htmlFor={`biz-${profile.id}`}
                        className="mb-1 block text-sm font-medium text-brand-ink"
                      >
                        Business Name
                      </label>
                      <input
                        id={`biz-${profile.id}`}
                        value={profile.businessName}
                        placeholder="Business Name"
                        onChange={(e) =>
                          update(profile.id, { businessName: e.target.value })
                        }
                        className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30"
                      />
                    </div>
                    <div className="sm:w-40">
                      <label
                        htmlFor={`pc-${profile.id}`}
                        className="mb-1 block text-sm font-medium text-brand-ink"
                      >
                        Postcode
                      </label>
                      <input
                        id={`pc-${profile.id}`}
                        value={profile.postcode}
                        placeholder="e.g. M1 2AB"
                        onChange={(e) =>
                          update(profile.id, { postcode: e.target.value })
                        }
                        className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add the review link, or just the name and postcode — we&apos;ll find
                    the review link for you.
                  </p>
                </div>
              ) : (
                <div className="relative flex-1">
                  <label
                    htmlFor={`loc-${profile.id}`}
                    className="mb-1 block text-sm font-medium text-brand-ink"
                  >
                    Select Location
                  </label>
                  <Search className="pointer-events-none absolute left-3 top-[2.35rem] size-4 text-muted-foreground" />
                  <input
                    id={`loc-${profile.id}`}
                    value={profile.location}
                    placeholder="Location Name"
                    onChange={(e) => update(profile.id, { location: e.target.value })}
                    onFocus={() => setOpenFor(profile.id)}
                    onBlur={() => window.setTimeout(() => setOpenFor(null), 120)}
                    className="h-11 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30"
                  />
                  {openFor === profile.id && (
                    <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-border bg-popover shadow-lg">
                      {SUGGESTIONS.filter((s) =>
                        s.toLowerCase().includes(profile.location.toLowerCase()),
                      ).map((s) => (
                        <li key={s}>
                          <button
                            type="button"
                            onMouseDown={() => update(profile.id, { location: s })}
                            className="block w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-brand-soft"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {profiles.length > 1 && (
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setProfiles((prev) => prev.filter((p) => p.id !== profile.id))
                  }
                  className="text-xs font-medium text-danger underline underline-offset-2"
                >
                  Remove
                </button>
              </div>
            )}
            <span className="sr-only">Profile {index + 1}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          disabled={remaining <= 0}
          onClick={() => setProfiles((prev) => [...prev, newProfile()])}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-ink disabled:opacity-50"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground">
            <Plus className="size-4" />
          </span>
          Add another profile
        </button>

        <button
          type="button"
          onClick={() => setManual((m) => !m)}
          className="text-sm font-semibold text-success underline underline-offset-4"
        >
          {manual ? "Back To Listing Search" : "Can't Find Your Listing?"}
        </button>
      </div>
    </section>
  );
}
