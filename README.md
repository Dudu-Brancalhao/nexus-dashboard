# 📊 Nexus Dashboard

## ☑️ Requisitos
- Node 21+
- npm 10+

## 🔧 Instalação

git clone <repo> <br>
cd project <br>
npm install <br>
npm run dev <br>

## 🔤 Login
Não há backend conectado no login, porém há validação; <br>
Qualquer e-mail válido e senha não vazia funciona.

## 🧱 Estrutura
src/ <br>
 ├─ assets/        # Recursos estáticos (imagens, fontes, etc.) <br>
 ├─ components/    # Componentes reutilizáveis de UI <br>
 ├─ contexts/      # Context API para gerenciamento de estado global (ex: Toast) <br>
 ├─ hooks/         # Hooks customizados (ex: integração com API via React Query) <br>
 ├─ mocks/         # Dados mockados utilizados durante o desenvolvimento <br>
 ├─ pages/         # Páginas da aplicação (camada de rota) <br>
 ├─ services/      # Camada responsável por comunicação com APIs externas <br>
 ├─ types/         # Definições de tipos e contratos da aplicação <br>
 ├─ App.tsx        # Estrutura principal da aplicação <br>
 ├─ main.tsx       # Ponto de entrada <br>
 └─ index.css      # Configuração global de estilos <br>

## ⚙️ Stack utilizada
React + Vite: estrutura principal da aplicação, garantindo build rápido e ambiente moderno. <br>
TypeScript: tipagem estática para maior previsibilidade e segurança. <br>
TailwindCSS: estilização baseada em utility-first, permitindo consistência visual e produtividade. <br>
Zod: validação de formulários e contratos de dados com segurança de tipo. <br>
TanStack React Query: gerenciamento de requisições assíncronas e mutations. <br>
React Router DOM: controle de rotas da aplicação. <br>
Lucide React: biblioteca de ícones leve e consistente. <br>

## 🧪 Variáveis de ambiente

Não é necessário, deixei a chave da api manualmente no serviço de chamada de API para facilitar a instalação. <br>
Obs: Sei que não é o ideal porém trata-se de uma chave DEMO.
