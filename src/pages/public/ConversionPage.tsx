import { AdminMenu } from '../../components/layout/SidebarTemplates';
import { Layout } from '../../components/layout';
import ProfilePicture from '../../assets/professional-photo-square.png'
import { AssetAcronym, useConvertAsset } from '@/services/useConvertAsset';
import Button from '@/components/ui/Button';
import { Asset, mockAssets } from '@/mocks/assets';
import AssetSelectInput from '@/components/ui/AssetDropDown';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';

function ConversionPage() {
  const { mutate, data, isPending, reset } = useConvertAsset();
  const [selectedAssetTo, setSelectedAssetTo] = useState<Asset | null>(null)
  const [selectedAssetFrom, setSelectedAssetFrom] = useState<Asset | null>(null)
  const [amount, setAmount] = useState("");
  const { showToast } = useToast()

  const filteredAssets = mockAssets.filter(
    (asset) => asset.acronym !== selectedAssetTo?.acronym
  )

  useEffect(() => {
    if (
      selectedAssetFrom &&
      selectedAssetFrom.acronym === selectedAssetTo?.acronym
    ) {
      setSelectedAssetFrom(null);
    }
    reset()
  }, [selectedAssetFrom, selectedAssetTo, amount])

  const handleSubmit = () => {
    if (!selectedAssetTo || !selectedAssetFrom || !amount) {
      showToast("Preencha todos os campos obrigatórios.", "error")
      return
    }
    mutate(
      {
        from: selectedAssetTo.acronym as AssetAcronym,
        to: selectedAssetFrom.acronym as AssetAcronym,
        amount: Number(amount)
      },
      {
        onSuccess: () => showToast("Conversão realizada", "success"),
        onError:() => showToast("Houve um erro na Conversão", "error")
      },
    );
  }

  const isFormValid = selectedAssetTo && selectedAssetFrom && amount;

  return (
    <Layout menuItems={AdminMenu}>
      <div className="p-8 overflow-y-auto mb-16 md:mb-0 h-[100vh]">
        <div className="flex items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
              <span>Conversão</span>
            </h1>
            <p className="text-gray-400 mt-1">
              Converta moedas e valores em tempo real
            </p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={ProfilePicture} className='rounded-full h-[40px]' />
            <span className="hidden md:flex text-white text-sm font-medium">Eduardo Brancalhão</span>
          </div>
        </div>

        <div className="flex flex-col rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)]">
          <div className="grid lg:grid-cols-4 gap-6 p-4 sm:flex-row sm:items-center">
            <AssetSelectInput
              label='Origem'
              assets={mockAssets}
              value={selectedAssetTo}
              onChange={setSelectedAssetTo}
            />
            <div className='flex flex-col gap-1'>
              <p className='text-sm text-gray-500 uppercase font-semibold'>Valor</p>
              <div className="relative">
                {selectedAssetTo && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <selectedAssetTo.icon size={20} />
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
                  className={`
                    w-full rounded-[6px] pl-12 p-4 border bg-[var(--color-border)]
                    shadow-md focus:outline-none focus:ring-1
                    border-[var(--color-separator)] focus:ring-[var(--color-accent)]
                  `}
                />
              </div>
            </div>
            <AssetSelectInput
              label='Destino'
              assets={filteredAssets}
              value={selectedAssetFrom}
              onChange={setSelectedAssetFrom}
            />
            <Button onClick={handleSubmit} className='h-full' disabled={!isFormValid} loading={isPending}>
              Converter
            </Button>
          </div>
          {data && (
            <div className="flex flex-col gap-3 p-4 bg-[var(--color-card-bg)] border-t-1 border-[var(--color-separator)] mt-4">

              <h3 className="text-sm font-semibold text-gray-400 uppercase">
                Resumo da Conversão
              </h3>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Valor enviado</span>
                <span className="text-white">
                  {amount} {selectedAssetFrom?.acronym}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cotação utilizada</span>
                <span className="text-white">
                  1 {data.from} = {data.to === "BRL" ? data.rate.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : data.rate.toLocaleString("pt-BR", { minimumFractionDigits: 6 })} {data.to}
                </span>
              </div>

              <div className="border-t border-[var(--color-separator)] my-2" />

              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-400">Total Recebido</span>
                <span className="text-green-400">
                  {data.to === "BRL" ? data.result.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) : data.result.toLocaleString("pt-BR", { minimumFractionDigits: 6 })} {data.to}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ConversionPage;