import LoginForm from '../../components/forms/LoginForm';
import { mockLoginAssets } from '../../mocks/assets';
import nexusLogo from '../../assets/nexus-logo-white.png'
import './LoginPage.css';

function LoginPage() {
  return (
    <main className="overflow-auto" >
      <div className="flex flex-col lg:flex-row min-h-[100vh]">
        <div className="noise flex-1 min-w-0 flex flex-col justify-between mb-[-12px] lg:mb-0 lg:min-h-[200px] lg:min-h-0 py-8 lg:py-12 px-8 lg:px-26">
          <img src={nexusLogo} className='h-[40px] w-[144px]' />
          <div>
            <div className='text-xl lg:text-7xl font-bold ml-3 lg:ml-0 lg:mb-12'>
              Controle <br />
              total das suas <span className='text-[var(--color-accent)]'>finanças</span>.
            </div>
            <div className='hidden lg:flex text-gray-500'>Gerencia depósitos, saques e ativos digitais em tempo real. Tudo em um lugar só.</div>
          </div>
          <div className='carousel-wrapper'>
            <div className='carousel-track flex gap-4'>
              {[...mockLoginAssets, ...mockLoginAssets].map((asset) => {
                return <div className='flex gap-2 text-sm'>
                  <div>
                    {asset.name}
                  </div>
                  <div className='text-gray-500'>
                    R$ {asset.valueInBRL.toString()}
                  </div>
                  <div className={`flex ${asset.trending === 'up' ? "text-[var(--color-text-positive)]" : "text-[var(--color-text-negative)]"}`}>
                    {asset.trending === 'up' ? "↑" : "↓"} {asset.trendingPercentage?.toString()} %
                  </div>
                </div>
              })}
            </div>
          </div>
          <div className='element w-[220px] lg:w-[440px] h-[220px] lg:h-[440px] top-[-60px] lg:top-[-120px] right-[-60px] lg:right-[40%]'></div>
          <div className='element w-[180px] lg:w-[380px] h-[180px] lg:h-[380px] bottom-[-140px] left-[-140px]'></div>
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-[12px] lg:rounded-[0px] bg-[#101218] items-center p-12 border-t-1 lg:border-t-0 lg:border-l-1 border-[#1E2432] z-99">
          <div className='flex flex-col items-center gap-8'>
            <div className="flex flex-col gap-2">
              <span className="text-2xl lg:text-4xl font-bold text-white">Bem-vindo de volta</span>
              <span className="text-gray-500">Entre com suas credenciais para acessar o painel de controle.</span>
            </div>
            <div className='flex flex-col gap-4 w-full'>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage; 