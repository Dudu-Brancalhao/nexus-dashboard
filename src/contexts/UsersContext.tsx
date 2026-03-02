import { createContext, useContext, useState, ReactNode } from "react";
import { mockUsers, User } from "@/mocks";

interface UsersContextType {
  users: User[];
  /** Add `amountInBRL` to a user's totalInBRL */
  creditUser: (userId: string, amountInBRL: number) => void;
  /** Subtract `amountInBRL` from a user's totalInBRL (floor at 0) */
  debitUser: (userId: string, amountInBRL: number) => void;
}

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);

  function creditUser(userId: string, amountInBRL: number) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, totalInBRL: u.totalInBRL + amountInBRL }
          : u
      )
    );
  }

  function debitUser(userId: string, amountInBRL: number) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, totalInBRL: Math.max(0, u.totalInBRL - amountInBRL) }
          : u
      )
    );
  }

  return (
    <UsersContext.Provider value={{ users, creditUser, debitUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used inside <UsersProvider>");
  return ctx;
}