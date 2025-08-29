import { useTranslation } from 'react-i18next';

export default function FornecedoresPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Content area with top padding for navigation */}
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Fornecedores
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete o formulário abaixo para se cadastrar como fornecedor e fazer parte da nossa rede de parceiros.
            </p>
          </div>

          {/* Airtable Embed Container */}
          <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/appPoa687OTzPHMjW/pagW6laeGKZtjdAHe/form?backgroundColor=white"
              frameBorder="0"
              width="100%"
              height="800"
              style={{ 
                background: 'transparent',
                border: 'none',
                minHeight: '800px'
              }}
              title="Formulário de Cadastro de Fornecedores"
            />
          </div>

          {/* Additional Information */}
          <div className="mt-12 text-center">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-black mb-4">
                Informações Importantes
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-black mb-2">Processo de Seleção</h3>
                  <p className="text-gray-600">
                    Todos os fornecedores passam por um processo de análise para garantir 
                    a qualidade e adequação aos nossos projetos.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-2">Contato</h3>
                  <p className="text-gray-600">
                    Após o envio do formulário, entraremos em contato em até 5 dias úteis 
                    com informações sobre o processo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
