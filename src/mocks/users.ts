export interface User {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "PENDING" | "BLOCKED";
  createdAt: string;
  lastActivity: string;
  totalInBRL: number;
}

export const mockUsers: User[] = [
  { id: "u1",  name: "Ana Souza",          email: "ana@email.com",      status: "ACTIVE",   createdAt: "2024-03-12", lastActivity: "2026-02-28", totalInBRL: 1234 },
  { id: "u2",  name: "Carlos Lima",        email: "carlos@email.com",   status: "ACTIVE",   createdAt: "2024-05-01", lastActivity: "2026-02-27", totalInBRL: 1234 },
  { id: "u3",  name: "Marina Costa",       email: "marina@email.com",   status: "ACTIVE",   createdAt: "2024-07-19", lastActivity: "2026-02-26", totalInBRL: 1234 },
  { id: "u4",  name: "Lucas Rocha",        email: "lucas@email.com",    status: "ACTIVE",   createdAt: "2024-08-04", lastActivity: "2026-02-25", totalInBRL: 1234 },
  { id: "u5",  name: "Fernanda Alves",     email: "fernanda@email.com", status: "ACTIVE",   createdAt: "2024-09-22", lastActivity: "2026-02-24", totalInBRL: 1234 },
  { id: "u6",  name: "Diego Pereira",      email: "diego@email.com",    status: "PENDING",  createdAt: "2025-01-10", lastActivity: "2026-02-20", totalInBRL: 1234 },
  { id: "u7",  name: "Marcio Lucas",       email: "marcio@email.com",   status: "PENDING",  createdAt: "2025-03-15", lastActivity: "2026-02-15", totalInBRL: 1234 },
  { id: "u8",  name: "Carlos Oliveira",    email: "carlosol@email.com", status: "ACTIVE",   createdAt: "2025-05-28", lastActivity: "2026-02-28", totalInBRL: 1234 },
  { id: "u9",  name: "Leandro Rodrigues",  email: "leandro@email.com",  status: "BLOCKED",  createdAt: "2024-11-03", lastActivity: "2026-01-10", totalInBRL: 1234 },
  { id: "u10", name: "Thiago Faria",       email: "thiago@email.com",   status: "BLOCKED",  createdAt: "2024-12-20", lastActivity: "2026-01-05", totalInBRL: 1234 },
];
