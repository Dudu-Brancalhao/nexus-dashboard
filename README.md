# 📊 Nexus Dashboard

## ☑️ Requisitos
- Node 21+
- npm 10+

## 🔧 Instalação

git clone <repo>
cd project
npm install
npm run dev

## 🧱 Estrutura
src/
 ├─ assets/        # Recursos estáticos (imagens, fontes, etc.)
 ├─ components/    # Componentes reutilizáveis de UI
 ├─ contexts/      # Context API para gerenciamento de estado global (ex: Toast)
 ├─ hooks/         # Hooks customizados (ex: integração com API via React Query)
 ├─ mocks/         # Dados mockados utilizados durante o desenvolvimento
 ├─ pages/         # Páginas da aplicação (camada de rota)
 ├─ services/      # Camada responsável por comunicação com APIs externas
 ├─ types/         # Definições de tipos e contratos da aplicação
 ├─ App.tsx        # Estrutura principal da aplicação
 ├─ main.tsx       # Ponto de entrada
 └─ index.css      # Configuração global de estilos

## ⚙️ Stack utilizada
React + Vite: estrutura principal da aplicação, garantindo build rápido e ambiente moderno.
TypeScript: tipagem estática para maior previsibilidade e segurança.
TailwindCSS: estilização baseada em utility-first, permitindo consistência visual e produtividade.
Zod: validação de formulários e contratos de dados com segurança de tipo.
TanStack React Query: gerenciamento de requisições assíncronas e mutations.
React Router DOM: controle de rotas da aplicação.
Lucide React: biblioteca de ícones leve e consistente.

## 🧪 Variáveis de ambiente

Não é necessário, deixei a chave da api manualmente no serviço de chamada de API para facilitar a instalação.
Obs: Sei que não é o ideal porém trata-se de uma chave DEMO.
