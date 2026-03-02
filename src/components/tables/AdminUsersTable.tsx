import { useMemo, useState } from "react";
import { mockUsers } from "../../mocks/users";
import { Search } from "lucide-react";

type StatusKey = "ACTIVE" | "PENDING" | "BLOCKED";

const STATUS_CONFIG: Record<StatusKey, { label: string; dot: string; pill: string }> = {
  ACTIVE:  { label: "Ativo",     dot: "bg-emerald-400",  pill: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" },
  PENDING: { label: "Pendente",  dot: "bg-amber-400",    pill: "bg-amber-400/10   text-amber-400   border-amber-400/20"   },
  BLOCKED: { label: "Bloqueado", dot: "bg-red-400",    pill: "bg-red-400/10  text-red-400   border-red-400/20"   },
};

type FilterStatus = "ALL" | StatusKey;

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: "ALL",     label: "Todos"     },
  { value: "ACTIVE",  label: "Ativo"     },
  { value: "PENDING", label: "Pendente"  },
  { value: "BLOCKED", label: "Bloqueado" },
];

const PAGE_SIZE = 5;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("ALL");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockUsers.filter((u) => {
      const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchFilter = filter === "ALL" || u.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearch(val: string) {
    setSearch(val);
    setPage(1);
  }

  function handleFilter(val: FilterStatus) {
    setFilter(val);
    setPage(1);
  }

  return (
    <div className="flex flex-col rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Usuários</h2>
          <p className="text-sm text-gray-500">{filtered.length} registro{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg bg-[var(--color-border)] border border-[var(--color-separator)] pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#EF233C]/50 focus:ring-1 focus:ring-[#EF233C]/20 transition"
          />
        </div>
      </div>
      <div className="flex gap-2 px-4 py-3 border-b border-[var(--color-separator)] overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => handleFilter(f.value)}
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium border transition
              ${filter === f.value
                ? "bg-[#EF233C] border-[#EF233C] text-white shadow-[0_0_12px_rgba(239,35,60,0.35)]"
                : "bg-transparent border-[var(--color-separator)] text-gray-400 hover:border-gray-500 hover:text-gray-300"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 font-semibold">Nome</th>
              <th className="px-4 py-3 font-semibold">E-mail</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">Criado em</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">Última atividade</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500 text-sm">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              paginated.map((user) => {
                const cfg = STATUS_CONFIG[user.status];
                return (
                  <tr
                    key={user.id}
                    className="border-t border-[var(--color-separator)] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EF233C]/10 border border-[#EF233C]/20 flex items-center justify-center text-[10px] font-bold text-[#EF233C]">
                          {getInitials(user.name)}
                        </div>
                        <span className="font-medium text-white whitespace-nowrap">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap font-mono text-xs">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap font-mono text-xs">
                      {formatDate(user.lastActivity)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--color-separator)]">
        <span className="text-xs text-gray-500">
          Página {currentPage} de {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-[var(--color-separator)] px-3 py-1.5 text-xs text-gray-400 hover:border-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ← Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-medium border transition
                ${p === currentPage
                  ? "bg-[#EF233C] border-[#EF233C] text-white shadow-[0_0_10px_rgba(239,35,60,0.3)]"
                  : "border-[var(--color-separator)] text-gray-400 hover:border-gray-500 hover:text-white"
                }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-[var(--color-separator)] px-3 py-1.5 text-xs text-gray-400 hover:border-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Próxima →
          </button>
        </div>
      </div>

    </div>
  );
}