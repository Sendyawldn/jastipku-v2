const queueCards = [
  {
    label: "Traveler verification",
    count: "08",
    detail: "Profiles waiting for admin review",
    accent: "var(--teal)",
  },
  {
    label: "Payment exceptions",
    count: "03",
    detail: "Webhook mismatches needing reconciliation",
    accent: "var(--ember)",
  },
  {
    label: "Withdrawal approvals",
    count: "12",
    detail: "Traveler payout requests in queue",
    accent: "var(--olive)",
  },
];

const auditRows = [
  ["TRV-1042", "Pending", "Bank details incomplete"],
  ["PAY-3891", "Review", "Webhook arrived before invoice refresh"],
  ["WTH-2207", "Ready", "Balanced against completed orders"],
];

export default function AdminHomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <header className="panel px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--teal)">
              Jastipku Admin
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-(--ink) sm:text-5xl">
              Review the operational ledger without collapsing into generic
              dashboard chrome.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-(--muted) sm:text-base">
              Verification, payment reconciliation, and withdrawals stay visible
              as separate flows so the admin team can see what needs approval,
              what needs investigation, and what is ready to settle.
            </p>
          </div>

          <div className="rounded-3xl border border-(--border) bg-(--surface-strong) px-5 py-4 text-sm text-(--muted)">
            <p className="font-medium text-(--ink)">Today&apos;s focus</p>
            <p className="mt-2 max-w-xs">
              High-priority review queue with payment evidence and withdrawal
              readiness in one view.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        {queueCards.map((card) => (
          <article key={card.label} className="panel px-5 py-5 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                  {card.label}
                </p>
                <p className="mt-3 text-4xl font-semibold text-(--ink)">
                  {card.count}
                </p>
              </div>
              <span
                className="mt-1 h-3 w-3 rounded-full"
                style={{ background: card.accent }}
              />
            </div>
            <p className="mt-4 text-sm text-(--muted)">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="panel px-5 py-5 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                Verification queue
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-(--ink)">
                Traveler profile review
              </h2>
            </div>
            <a className="text-sm font-medium text-(--teal)" href="#">
              Open queue
            </a>
          </div>

          <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-(--border) bg-white/80">
            <div className="grid grid-cols-[0.8fr_1fr_1.2fr] border-b border-(--border) px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-(--muted)">
              <span>Ticket</span>
              <span>Status</span>
              <span>Reason</span>
            </div>
            {auditRows.map(([ticket, status, reason]) => (
              <div
                key={ticket}
                className="grid grid-cols-[0.8fr_1fr_1.2fr] border-b border-(--border) px-4 py-4 last:border-b-0"
              >
                <span className="font-medium text-(--ink)">{ticket}</span>
                <span className="text-sm text-(--muted)">{status}</span>
                <span className="text-sm text-(--muted)">{reason}</span>
              </div>
            ))}
          </div>
        </article>

        <aside className="panel px-5 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
            Settlement view
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-(--ink)">
            Payout readiness
          </h2>

          <div className="mt-5 space-y-3">
            {[
              [
                "Eligible",
                "Completed orders waiting for approval",
                "var(--olive)",
              ],
              [
                "Blocked",
                "Missing verification or conflicting totals",
                "var(--ember)",
              ],
              ["Reconciled", "Payment logs matched to invoices", "var(--teal)"],
            ].map(([title, detail, color]) => (
              <div
                key={title}
                className="rounded-[1.15rem] border border-(--border) bg-white/80 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: `var(${color})` }}
                  />
                  <p className="text-sm font-semibold text-(--ink)">{title}</p>
                </div>
                <p className="mt-2 text-sm text-(--muted)">{detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
