const tripHighlights = [
  {
    label: "Singapore",
    route: "Jakarta → Singapore",
    status: "Verified traveler, 2 active orders",
  },
  {
    label: "Kuala Lumpur",
    route: "Surabaya → Kuala Lumpur",
    status: "1 order awaiting payment",
  },
  {
    label: "Bangkok",
    route: "Bandung → Bangkok",
    status: "Processing, shipping next",
  },
];

const orderStages = [
  "Acceptance",
  "Invoice",
  "Purchase",
  "Shipping",
  "Completion",
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <header className="panel overflow-hidden px-5 py-6 sm:px-8 sm:py-8">
        <div className="shell-grid lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--teal)]">
              Jastipku Web
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
              Track the custody chain from traveler trip to delivered order.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
              Customers discover verified traveler trips, place orders with
              clear item detail, and watch payment, fulfillment, and receipt
              confirmation unfold as one visible chain.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
            <div className="flex items-center justify-between text-sm text-[var(--muted)]">
              <span>Today&apos;s flow</span>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--olive)]">
                Live
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {orderStages.map((stage, index) => (
                <div
                  key={stage}
                  className="flex items-center gap-3 rounded-2xl bg-white/85 px-4 py-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--ink)] text-xs font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--ink)]">
                      {stage}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      Controlled handoff state
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="panel px-5 py-5 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Active trips
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--ink)]">
                Verified traveler routes
              </h2>
            </div>
            <a className="text-sm font-medium text-[var(--teal)]" href="#">
              Explore trips
            </a>
          </div>

          <div className="mt-5 grid gap-3">
            {tripHighlights.map((trip) => (
              <div
                key={trip.label}
                className="rounded-[1.25rem] border border-[var(--border)] bg-white/80 px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                      {trip.label}
                    </p>
                    <p className="mt-1 text-base font-medium text-[var(--ink)]">
                      {trip.route}
                    </p>
                  </div>
                  <span className="rounded-full bg-[rgba(15,118,110,0.1)] px-3 py-1 text-xs font-medium text-[var(--teal)]">
                    Available
                  </span>
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {trip.status}
                </p>
              </div>
            ))}
          </div>
        </article>

        <aside className="panel px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            Order state
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--ink)]">
            What the chain looks like
          </h2>

          <div className="mt-5 space-y-3">
            {[
              ["Waiting", "Accepted by traveler", "var(--ember)"],
              ["In transit", "Payment cleared, items purchased", "var(--teal)"],
              ["Done", "Customer confirmed receipt", "var(--olive)"],
            ].map(([title, detail, color]) => (
              <div
                key={title}
                className="rounded-[1.15rem] border border-[var(--border)] bg-white/80 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: `var(${color})` }}
                  />
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    {title}
                  </p>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
