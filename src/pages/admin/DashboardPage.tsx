import { AdminMenu } from '../../components/layout/SidebarTemplates';
import { Layout } from '../../components/layout';
import {
  TrendingUp,
  TrendingDown,
  BanknoteArrowDown,
  HandCoins,
} from 'lucide-react';
import ProfilePicture from '../../assets/professional-photo-square.png'
import {
  mockCardsData,
  mockTransactions,
  Transactions,
  Asset,
  mockTotalAssets
} from "@/mocks"

function AdminDashboard() {
  return (
    <Layout menuItems={AdminMenu}>
      <div className="p-8 overflow-y-auto mb-16 md:mb-0">
        <div className="flex items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
              <span>Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Fev 25, 2026 • Visão geral do mês
            </p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={ProfilePicture} className='rounded-full h-[40px]' />
            <span className="hidden md:flex text-white text-sm font-medium">Eduardo Brancalhão</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {mockCardsData.map((card) => {
            return <div className="rounded-xl p-5 flex items-start justify-between bg-[var(--color-card-bg)] border-1 border-[var(--color-border)]" >
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-3">
                  {card.label}
                </p>
                <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
                <p className={`flex items-center gap-2 text-sm ${card.trendingDirection === "positive" ? "text-green-400" : "text-red-400"}`}>
                  {card.trendingDirection === "positive" ? <TrendingUp size={16} /> : <TrendingDown size={16} />} {card.trendingPercentage}% vs mês anterior
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#EF233C26]" >
                <card.icon color='var(--color-accent)' />
              </div>
            </div>
          })}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col rounded-xl bg-[var(--color-card-bg)] border-1 border-[var(--color-border)]">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-semibold text-white">
                Últimas Movimentações
              </h2>
              <p className="text-sm text-gray-500" >
                5 registros • atualizado agora
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-between">
              {mockTransactions.slice(0, 5).map((transaction) => {
                function getStatusColor(status: Transactions["status"]) {
                  switch (status) {
                    case "CONCLUDED":
                      return {
                        label: "concluído",
                        classColorText: "text-green-400",
                        classColorBg: "bg-green-400/15"
                      };
                    case "PENDING":
                      return {
                        label: "pendente",
                        classColorText: "text-orange-400",
                        classColorBg: "bg-orange-400/15"
                      };
                    case "CANCELLED":
                      return {
                        label: "cancelado",
                        classColorText: "text-red-400",
                        classColorBg: "bg-red-400/15"
                      };
                  }
                }
                return <div className="flex items-center justify-between p-4 border-t-[1px] border-[var(--color-separator)]">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium color-[var(--color-accent)] bg-gray-600/15 `} >
                      {transaction.type === "DEPOSIT" ? <BanknoteArrowDown color='#6a7282' /> : <HandCoins color='#6a7282' />}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {transaction.type === "DEPOSIT" ? "Depósito" : "Saque"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <div className='flex flex-col items-end'>
                      <p className={`${transaction.type === "DEPOSIT" ? "text-green-400" : "text-red-400"}`}>{transaction.type === "DEPOSIT" ? "+" : "-"}R$ {Number(transaction.amount)}</p>
                      <p className={` ${getStatusColor(transaction.status).classColorText} flex w-fit text-xs ${getStatusColor(transaction.status).classColorBg} rounded-full justify-center px-3`}>{getStatusColor(transaction.status).label}</p>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
          <div className="rounded-xl bg-[var(--color-card-bg)] border-1 border-[var(--color-border)]" >
            <div className='flex items-center justify-between p-4'>
              <h2 className="text-lg font-semibold text-white">
                Saldos por Ativo
              </h2>
              <p className="text-sm text-gray-500" >
                Carteira consolidada
              </p>
            </div>
            {mockTotalAssets.map((asset) => {

              function getAssetColor(asset: Asset["acronym"]) {
                switch (asset) {
                  case "BRL":
                    return {
                      text: "text-green-400",
                      bg: "bg-green-400/15"
                    };
                  case "BTC":
                    return {
                      text: "text-yellow-400",
                      bg: "bg-yellow-400/15"
                    };
                  case "ETH":
                    return {
                      text: "text-indigo-400",
                      bg: "bg-indigo-400/15"
                    };
                  case "USDT":
                    return {
                      text: "text-emerald-400",
                      bg: "bg-emerald-400/15"
                    }
                }
              }

              const assetColor = getAssetColor(asset.asset.acronym)

              return <div className="flex items-center justify-between p-4 border-t-[1px] border-[var(--color-separator)]">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium color-[var(--color-accent)] ${assetColor?.bg} `} >
                    <asset.asset.icon className={` ${assetColor?.text} `} />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {asset.asset.acronym}
                    </p>
                    <p className="text-sm text-gray-500">
                      {asset.asset.name}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div className='flex flex-col items-end'>
                    <p className='text-white font-medium'>{asset.quantity}</p>
                    <p className='text-gray-500 text-sm'>{asset.quantityInBRL}</p>
                  </div>
                </div>
              </div>
            })}
            <div className="flex items-center justify-between p-4 border-t-[1px] border-[var(--color-separator)]">
              <p className='text-sm font-semibold text-gray-500'>
                TOTAL CONSOLIDADO
              </p>
              <p className="text-2xl lg:text-3xl font-bold text-white mb-2" >
                R$ 1.066.856
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
