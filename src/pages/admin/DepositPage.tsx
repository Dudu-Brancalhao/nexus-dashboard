import { AdminMenu } from '../../components/layout/SidebarTemplates';
import { Layout } from '../../components/layout';
import ProfilePicture from '../../assets/professional-photo-square.png'
import UserSelectInput from '@/components/ui/Combobox';
import { Asset, mockAssets, Transactions, User } from '@/mocks';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { useUsers } from '@/contexts/UsersContext';
import { convertToBRL } from '@/components/utils/currency';

function AdminDeposit() {
  const { users, creditUser } = useUsers();

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [amount, setAmount] = useState("");
  const [observation, setObservation] = useState("");
  const { showToast } = useToast()

  const [deposits, setDeposits] = useState<Transactions[]>([
    {
      user: users[0],
      asset: mockAssets[1],
      amount: 12500,
      type: "DEPOSIT",
      status: "CONCLUDED",
      date: new Date(),
    },
  ])

  // Always resolve from live context so the displayed balance is up-to-date
  const liveSelectedUser = selectedUser
    ? users.find((u) => u.id === selectedUser.id) ?? null
    : null;

  const parsedAmount = parseFloat(amount) || 0;

  // How much this deposit is worth in BRL (used for creditUser and preview)
  const amountInBRL = selectedAsset
    ? convertToBRL(parsedAmount, selectedAsset.valueInBRL)
    : 0;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "short",
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!liveSelectedUser || !selectedAsset || !amount) {
      showToast("Preencha todos os campos obrigatórios.", "error")
      return
    }

    const newDeposit: Transactions = {
      user: liveSelectedUser,
      asset: selectedAsset,
      amount: parsedAmount,
      type: "DEPOSIT",
      status: "CONCLUDED",
      observation,
      date: new Date(),
    }

    // Credit the user's totalInBRL with the BRL-converted value
    creditUser(liveSelectedUser.id, amountInBRL)

    showToast("Depósito realizado com sucesso!", "success")
    setDeposits((prev) => [newDeposit, ...prev])

    // reset form
    setAmount("")
    setObservation("")
    setSelectedAsset(null)
  }

  const isFormValid = liveSelectedUser && selectedAsset && amount

  return (
    <Layout menuItems={AdminMenu}>
      <div className="p-8 overflow-y-auto mb-16 md:mb-0 h-[100vh]">
        <div className="flex items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
              <span>Novo Depósito</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Credite ativos diretamente na carteira de um usuário
            </p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={ProfilePicture} className='rounded-full h-[40px]' />
            <span className="hidden md:flex text-white text-sm font-medium">Eduardo Brancalhão</span>
          </div>
        </div>

        <div className='grid lg:grid-cols-[1fr_340px] gap-6'>
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between border-b-1 border-[var(--color-separator)]">
                <div>
                  <h2 className="text-lg font-semibold text-white">Formulário de Depósito</h2>
                  <p className="text-sm text-gray-500">Preencha os campos abaixo para processar o crédito</p>
                </div>
              </div>

              <div className='flex flex-col w-full gap-4 p-4'>
                {/* 01 · User */}
                <div className="relative w-full mb-4">
                  <UserSelectInput
                    label="01 • Selecione o usuário"
                    users={users}
                    value={selectedUser}
                    onChange={setSelectedUser}
                  />
                  {liveSelectedUser && (
                    <p className="mt-2 text-sm text-gray-400">
                      Saldo atual:{" "}
                      <span className="text-green-400 font-semibold">
                        R$ {liveSelectedUser.totalInBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </p>
                  )}
                </div>

                {/* 02 · Asset */}
                <p className='text-sm text-gray-500 uppercase font-semibold'>02 • Selecione Ativo</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4'>
                  {mockAssets.map((asset) => {
                    const isSelected = selectedAsset === asset
                    return (
                      <div
                        key={asset.acronym}
                        onClick={() => setSelectedAsset(asset)}
                        className={`
                          flex flex-col items-center justify-center gap-2
                          border rounded-lg py-4 cursor-pointer transition-all
                          ${isSelected
                            ? "bg-[var(--color-accent)]/15 border-[var(--color-accent)]"
                            : "bg-[var(--color-border)] border-[var(--color-separator)] hover:border-[var(--color-accent)]/50"
                          }
                        `}
                      >
                        <asset.icon size={20} />
                        <p className='text-sm font-semibold'>{asset.acronym}</p>
                        <p className={isSelected ? 'text-[var(--color-accent)]' : 'text-gray-500'}>
                          {asset.valueInBRL}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* 03 · Amount */}
                <p className='text-sm text-gray-500 uppercase font-semibold'>03 • Informar Valor</p>
                <div className="relative mb-1">
                  {selectedAsset && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <selectedAsset.icon />
                    </div>
                  )}
                  <input
                    type='number'
                    min={0}
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (Number(value) >= 0 || value === "") setAmount(value);
                    }}
                    placeholder="0,00"
                    className="
                      w-full rounded-[6px] pl-12 p-4 border bg-[var(--color-border)]
                      border-[var(--color-separator)] shadow-md
                      focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]
                    "
                  />
                </div>
                {/* BRL conversion hint */}
                {selectedAsset && parsedAmount > 0 && selectedAsset.acronym !== "BRL" && (
                  <p className="text-xs text-gray-400 mb-2">
                    ≈{" "}
                    <span className="text-green-400 font-semibold">
                      R$ {amountInBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>{" "}
                    serão creditados no saldo do usuário
                  </p>
                )}

                {/* 04 · Observation */}
                <p className='text-sm text-gray-500 uppercase font-semibold'>04 • Observação (opcional)</p>
                <textarea
                  placeholder="Ex: Depósito referente ao ajuste manual de saldo"
                  rows={4}
                  onChange={(e) => setObservation(e.target.value)}
                  className="
                    w-full rounded-[6px] p-4 border bg-[var(--color-border)] mb-4
                    border-[var(--color-separator)] shadow-md resize-none
                    focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]
                  "
                />

                <Button type="submit" variant="primary" className="w-full mb-4" disabled={!isFormValid}>
                  Confirmar Depósito
                </Button>
              </div>
            </div>
          </form>

          {/* ── Side column ── */}
          <div className='flex flex-col gap-6'>

            {/* Summary */}
            <div className="flex flex-col rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between border-b-1 border-[var(--color-separator)]">
                <h2 className="text-lg font-semibold text-white">Resumo</h2>
                <p className="text-sm text-gray-500">Pré-visualização</p>
              </div>
              <div className='flex flex-col gap-4 p-4'>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>Usuário</p>
                  <p className='font-semibold'>{liveSelectedUser ? liveSelectedUser.name : "-"}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>Saldo atual</p>
                  <p className='font-semibold text-gray-300'>
                    {liveSelectedUser
                      ? `R$ ${liveSelectedUser.totalInBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                      : "-"}
                  </p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>Ativo</p>
                  <p className='font-semibold'>{selectedAsset ? selectedAsset.name : "-"}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>Valor</p>
                  <p className='flex items-center gap-2 font-semibold text-green-400'>
                    {selectedAsset && <selectedAsset.icon size={18}/>} {amount ? `${amount}` : "-"}
                  </p>
                </div>
                {/* Show BRL equivalent when asset is not BRL */}
                {selectedAsset && parsedAmount > 0 && selectedAsset.acronym !== "BRL" && (
                  <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500 uppercase font-semibold'>Equiv. BRL</p>
                    <p className='font-semibold text-green-400'>
                      R$ {amountInBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
                {/* Post-deposit balance preview */}
                {liveSelectedUser && amountInBRL > 0 && (
                  <div className='flex justify-between items-center'>
                    <p className='text-sm text-gray-500 uppercase font-semibold'>Saldo pós-depósito</p>
                    <p className='font-semibold text-green-400'>
                      R$ {(liveSelectedUser.totalInBRL + amountInBRL).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                )}
                <div className='flex justify-between items-center'>
                  <p className='text-sm text-gray-500 uppercase font-semibold'>Obs</p>
                  <p className='font-semibold max-w-[200px] text-right break-words'>
                    {observation ? observation : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent deposits */}
            <div className="flex flex-col rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-white">Depósitos Recentes</h2>
                <p className="text-sm text-gray-500">Últimas 24h</p>
              </div>
              {deposits.map((deposit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-t border-[var(--color-separator)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-400/15">
                      <deposit.asset.icon size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{deposit.user.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(deposit.date.toLocaleString())}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400">
                      +{deposit.asset.acronym} {deposit.amount.toLocaleString()}
                    </p>
                    {deposit.asset.acronym !== "BRL" && (
                      <p className="text-xs text-gray-500">
                        ≈ R$ {convertToBRL(Number(deposit.amount), deposit.asset.valueInBRL).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDeposit;