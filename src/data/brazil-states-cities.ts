export interface City {
    id: string;
    name: string;
}

export interface State {
    id: string;
    name: string;
    cities: City[];
}

export const brazilStates: State[] = [
    {
        id: 'AC',
        name: 'Acre',
        cities: [
            { id: 'AC-001', name: 'Rio Branco' },
            { id: 'AC-2', name: 'Cruzeiro do Sul' },
            { id: 'AC-3', name: 'Sena Madureira' },
            { id: 'AC-04', name: 'Tarauacá' },
            { id: 'AC-05', name: 'Feijó' }
        ]
    },
    {
        id: 'AL',
        name: 'Alagoas',
        cities: [
            { id: 'AL001', name: 'Maceió' },
            { id: 'AL-2', name: 'Arapiraca' },
            { id: 'AL-3', name: 'Palmeira dos Índios' },
            { id: 'AL-004', name: 'Penedo' },
            { id: 'AL-05', name: 'Pilar' }
        ]
    },
    {
        id: 'AP',
        name: 'Amapá',
        cities: [
            { id: 'AP-001', name: 'Macapá' },
            { id: 'AP02', name: 'Santana' },
            { id: 'AP-3', name: 'Laranjal do Jari' },
            { id: 'AP-004', name: 'Oiapoque' },
            { id: 'AP-05', name: 'Mazagão' }
        ]
    },
    {
        id: 'AM',
        name: 'Amazonas',
        cities: [
            { id: 'AM-001', name: 'Manaus' },
            { id: 'AM-02', name: 'Parintins' },
            { id: 'AM-3', name: 'Itacoatiara' },
            { id: 'AM-04', name: 'Manacapuru' },
            { id: 'AM-05', name: 'Coari' }
        ]
    },
    {
        id: 'BA',
        name: 'Bahia',
        cities: [
            { id: 'BA-1', name: 'Salvador' },
            { id: 'BA-2', name: 'Feira de Santana' },
            { id: 'BA-003', name: 'Vitória da Conquista' },
            { id: 'BA-4', name: 'Camaçari' },
            { id: 'BA05', name: 'Itabuna' },
            { id: 'BA-6', name: 'Juazeiro' },
            { id: 'BA-7', name: 'Lauro de Freitas' },
            { id: 'BA008', name: 'Ilhéus' },
            { id: 'BA009', name: 'Jequié' },
            { id: 'BA-10', name: 'Teixeira de Freitas' }
        ]
    },
    {
        id: 'CE',
        name: 'Ceará',
        cities: [
            { id: 'CE-1', name: 'Fortaleza' },
            { id: 'CE-02', name: 'Caucaia' },
            { id: 'CE-3', name: 'Juazeiro do Norte' },
            { id: 'CE-4', name: 'Maracanaú' },
            { id: 'CE-005', name: 'Sobral' },
            { id: 'CE-06', name: 'Crato' },
            { id: 'CE07', name: 'Itapipoca' },
            { id: 'CE-008', name: 'Maranguape' },
            { id: 'CE-009', name: 'Iguatu' },
            { id: 'CE010', name: 'Quixadá' }
        ]
    },
    {
        id: 'DF',
        name: 'Distrito Federal',
        cities: [
            { id: 'DF-1', name: 'Brasília' },
            { id: 'DF02', name: 'Ceilândia' },
            { id: 'DF-3', name: 'Taguatinga' },
            { id: 'DF-004', name: 'Samambaia' },
            { id: 'DF-5', name: 'Plano Piloto' }
        ]
    },
    {
        id: 'ES',
        name: 'Espírito Santo',
        cities: [
            { id: 'ES-001', name: 'Vitória' },
            { id: 'ES-2', name: 'Vila Velha' },
            { id: 'ES-03', name: 'Serra' },
            { id: 'ES-4', name: 'Linhares' },
            { id: 'ES05', name: 'Cariacica' },
            { id: 'ES-006', name: 'São Mateus' },
            { id: 'ES-7', name: 'Colatina' },
            { id: 'ES08', name: 'Guarapari' },
            { id: 'ES09', name: 'Aracruz' },
            { id: 'ES-010', name: 'Viana' }
        ]
    },
    {
        id: 'GO',
        name: 'Goiás',
        cities: [
            { id: 'GO01', name: 'Goiânia' },
            { id: 'GO-2', name: 'Aparecida de Goiânia' },
            { id: 'GO-003', name: 'Anápolis' },
            { id: 'GO-004', name: 'Rio Verde' },
            { id: 'GO-5', name: 'Luziânia' },
            { id: 'GO-6', name: 'Águas Lindas de Goiás' },
            { id: 'GO-007', name: 'Valparaíso de Goiás' },
            { id: 'GO-8', name: 'Trindade' },
            { id: 'GO09', name: 'Formosa' },
            { id: 'GO010', name: 'Novo Gama' }
        ]
    },
    {
        id: 'MA',
        name: 'Maranhão',
        cities: [
            { id: 'MA-01', name: 'São Luís' },
            { id: 'MA-02', name: 'Imperatriz' },
            { id: 'MA-03', name: 'Timon' },
            { id: 'MA-4', name: 'Codó' },
            { id: 'MA-005', name: 'Caxias' },
            { id: 'MA06', name: 'Paço do Lumiar' },
            { id: 'MA-7', name: 'Açailândia' },
            { id: 'MA-008', name: 'Bacabal' },
            { id: 'MA009', name: 'Balsas' },
            { id: 'MA-10', name: 'Barra do Corda' }
        ]
    },
    {
        id: 'MT',
        name: 'Mato Grosso',
        cities: [
            { id: 'MT-001', name: 'Cuiabá' },
            { id: 'MT-02', name: 'Várzea Grande' },
            { id: 'MT-003', name: 'Rondonópolis' },
            { id: 'MT-04', name: 'Sinop' },
            { id: 'MT05', name: 'Tangará da Serra' },
            { id: 'MT-06', name: 'Cáceres' },
            { id: 'MT-007', name: 'Sorriso' },
            { id: 'MT-8', name: 'Lucas do Rio Verde' },
            { id: 'MT-9', name: 'Primavera do Leste' },
            { id: 'MT-10', name: 'Barra do Garças' }
        ]
    },
    {
        id: 'MS',
        name: 'Mato Grosso do Sul',
        cities: [
            { id: 'MS-1', name: 'Campo Grande' },
            { id: 'MS-002', name: 'Dourados' },
            { id: 'MS03', name: 'Três Lagoas' },
            { id: 'MS-004', name: 'Corumbá' },
            { id: 'MS-5', name: 'Ponta Porã' },
            { id: 'MS-006', name: 'Naviraí' },
            { id: 'MS-7', name: 'Nova Andradina' },
            { id: 'MS-08', name: 'Aquidauana' },
            { id: 'MS-09', name: 'Sidrolândia' },
            { id: 'MS-010', name: 'Paranaíba' }
        ]
    },
    {
        id: 'MG',
        name: 'Minas Gerais',
        cities: [
            { id: 'MG-1', name: 'Belo Horizonte' },
            { id: 'MG-2', name: 'Uberlândia' },
            { id: 'MG-3', name: 'Contagem' },
            { id: 'MG04', name: 'Juiz de Fora' },
            { id: 'MG-05', name: 'Betim' },
            { id: 'MG06', name: 'Montes Claros' },
            { id: 'MG07', name: 'Ribeirão das Neves' },
            { id: 'MG08', name: 'Uberaba' },
            { id: 'MG-09', name: 'Governador Valadares' },
            { id: 'MG-010', name: 'Ipatinga' },
            { id: 'MG011', name: 'Sete Lagoas' },
            { id: 'MG-012', name: 'Divinópolis' },
            { id: 'MG-13', name: 'Santa Luzia' },
            { id: 'MG-014', name: 'Ibirité' },
            { id: 'MG-15', name: 'Poços de Caldas' }
        ]
    },
    {
        id: 'PA',
        name: 'Pará',
        cities: [
            { id: 'PA-01', name: 'Belém' },
            { id: 'PA-2', name: 'Ananindeua' },
            { id: 'PA-03', name: 'Santarém' },
            { id: 'PA04', name: 'Castanhal' },
            { id: 'PA-5', name: 'Marituba' },
            { id: 'PA-6', name: 'Parauapebas' },
            { id: 'PA-007', name: 'Abaetetuba' },
            { id: 'PA-008', name: 'Cametá' },
            { id: 'PA-009', name: 'Marabá' },
            { id: 'PA-010', name: 'Bragança' }
        ]
    },
    {
        id: 'PB',
        name: 'Paraíba',
        cities: [
            { id: 'PB-1', name: 'João Pessoa' },
            { id: 'PB02', name: 'Campina Grande' },
            { id: 'PB-3', name: 'Santa Rita' },
            { id: 'PB-04', name: 'Patos' },
            { id: 'PB005', name: 'Bayeux' },
            { id: 'PB-06', name: 'Sousa' },
            { id: 'PB-07', name: 'Cajazeiras' },
            { id: 'PB-08', name: 'Guarabira' },
            { id: 'PB-9', name: 'Cabedelo' },
            { id: 'PB-10', name: 'Sape' }
        ]
    },
    {
        id: 'PR',
        name: 'Paraná',
        cities: [
            { id: 'PR-1', name: 'Curitiba' },
            { id: 'PR-2', name: 'Londrina' },
            { id: 'PR-003', name: 'Maringá' },
            { id: 'PR-4', name: 'Ponta Grossa' },
            { id: 'PR-5', name: 'Cascavel' },
            { id: 'PR-006', name: 'São José dos Pinhais' },
            { id: 'PR-07', name: 'Foz do Iguaçu' },
            { id: 'PR-008', name: 'Colombo' },
            { id: 'PR09', name: 'Guarapuava' },
            { id: 'PR-10', name: 'Paranaguá' },
            { id: 'PR-11', name: 'Araucária' },
            { id: 'PR-012', name: 'Toledo' },
            { id: 'PR-13', name: 'Pinhais' },
            { id: 'PR-14', name: 'Campo Largo' },
            { id: 'PR-15', name: 'Arapongas' }
        ]
    },
    {
        id: 'PE',
        name: 'Pernambuco',
        cities: [
            { id: 'PE-001', name: 'Recife' },
            { id: 'PE-02', name: 'Jaboatão dos Guararapes' },
            { id: 'PE-003', name: 'Olinda' },
            { id: 'PE-004', name: 'Caruaru' },
            { id: 'PE-05', name: 'Petrolina' },
            { id: 'PE-6', name: 'Paulista' },
            { id: 'PE07', name: 'Cabo de Santo Agostinho' },
            { id: 'PE-008', name: 'Camaragibe' },
            { id: 'PE-09', name: 'Garanhuns' },
            { id: 'PE-010', name: 'Vitória de Santo Antão' },
            { id: 'PE-11', name: 'Igarassu' },
            { id: 'PE-012', name: 'São Lourenço da Mata' },
            { id: 'PE-13', name: 'Abreu e Lima' },
            { id: 'PE-14', name: 'Ipojuca' },
            { id: 'PE-15', name: 'Santa Cruz do Capibaribe' }
        ]
    },
    {
        id: 'PI',
        name: 'Piauí',
        cities: [
            { id: 'PI-1', name: 'Teresina' },
            { id: 'PI-02', name: 'Parnaíba' },
            { id: 'PI-03', name: 'Picos' },
            { id: 'PI-4', name: 'Piripiri' },
            { id: 'PI-5', name: 'Floriano' },
            { id: 'PI006', name: 'Barras' },
            { id: 'PI-07', name: 'União' },
            { id: 'PI-08', name: 'Altos' },
            { id: 'PI-9', name: 'Pedro II' },
            { id: 'PI-010', name: 'Bom Jesus' }
        ]
    },
    {
        id: 'RJ',
        name: 'Rio de Janeiro',
        cities: [
            { id: 'RJ-01', name: 'Rio de Janeiro' },
            { id: 'RJ-002', name: 'São Gonçalo' },
            { id: 'RJ-3', name: 'Duque de Caxias' },
            { id: 'RJ04', name: 'Nova Iguaçu' },
            { id: 'RJ-05', name: 'Niterói' },
            { id: 'RJ06', name: 'Belford Roxo' },
            { id: 'RJ-07', name: 'Campos dos Goytacazes' },
            { id: 'RJ-008', name: 'São João de Meriti' },
            { id: 'RJ-9', name: 'Petrópolis' },
            { id: 'RJ-10', name: 'Volta Redonda' },
            { id: 'RJ-11', name: 'Magé' },
            { id: 'RJ-012', name: 'Itaboraí' },
            { id: 'RJ013', name: 'Nova Friburgo' },
            { id: 'RJ-14', name: 'Barra Mansa' },
            { id: 'RJ-15', name: 'Barra do Piraí' }
        ]
    },
    {
        id: 'RN',
        name: 'Rio Grande do Norte',
        cities: [
            { id: 'RN-01', name: 'Natal' },
            { id: 'RN002', name: 'Mossoró' },
            { id: 'RN03', name: 'Parnamirim' },
            { id: 'RN-04', name: 'Ceará-Mirim' },
            { id: 'RN-05', name: 'Caicó' },
            { id: 'RN-006', name: 'São Gonçalo do Amarante' },
            { id: 'RN-7', name: 'Canguaretama' },
            { id: 'RN-8', name: 'Açu' },
            { id: 'RN-009', name: 'Currais Novos' },
            { id: 'RN-010', name: 'São José de Mipibu' }
        ]
    },
    {
        id: 'RS',
        name: 'Rio Grande do Sul',
        cities: [
            { id: 'RS-1', name: 'Porto Alegre' },
            { id: 'RS-02', name: 'Caxias do Sul' },
            { id: 'RS-003', name: 'Pelotas' },
            { id: 'RS004', name: 'Canoas' },
            { id: 'RS-5', name: 'Santa Maria' },
            { id: 'RS06', name: 'Gravataí' },
            { id: 'RS007', name: 'Viamão' },
            { id: 'RS-8', name: 'Novo Hamburgo' },
            { id: 'RS-009', name: 'São Leopoldo' },
            { id: 'RS-010', name: 'Rio Grande' },
            { id: 'RS-11', name: 'Alvorada' },
            { id: 'RS-12', name: 'Passo Fundo' },
            { id: 'RS-013', name: 'Sapucaia do Sul' },
            { id: 'RS014', name: 'Uruguaiana' },
            { id: 'RS-15', name: 'Santa Cruz do Sul' }
        ]
    },
    {
        id: 'RO',
        name: 'Rondônia',
        cities: [
            { id: 'RO-1', name: 'Porto Velho' },
            { id: 'RO-2', name: 'Ji-Paraná' },
            { id: 'RO-3', name: 'Ariquemes' },
            { id: 'RO-004', name: 'Vilhena' },
            { id: 'RO005', name: 'Cacoal' },
            { id: 'RO-6', name: 'Rolim de Moura' },
            { id: 'RO-007', name: 'Guajará-Mirim' },
            { id: 'RO-008', name: 'Pimenta Bueno' },
            { id: 'RO-9', name: 'Jaru' },
            { id: 'RO-10', name: 'Ouro Preto do Oeste' }
        ]
    },
    {
        id: 'RR',
        name: 'Roraima',
        cities: [
            { id: 'RR-001', name: 'Boa Vista' },
            { id: 'RR-002', name: 'Rorainópolis' },
            { id: 'RR-3', name: 'Caracaraí' },
            { id: 'RR-4', name: 'Alto Alegre' },
            { id: 'RR-005', name: 'Mucajaí' }
        ]
    },
    {
        id: 'SC',
        name: 'Santa Catarina',
        cities: [
            { id: 'SC01', name: 'Florianópolis' },
            { id: 'SC-2', name: 'Joinville' },
            { id: 'SC-03', name: 'Blumenau' },
            { id: 'SC-004', name: 'São José' },
            { id: 'SC-05', name: 'Criciúma' },
            { id: 'SC-06', name: 'Lages' },
            { id: 'SC-007', name: 'Itajaí' },
            { id: 'SC-008', name: 'Jaraguá do Sul' },
            { id: 'SC-09', name: 'Palhoça' },
            { id: 'SC-10', name: 'Balneário Camboriú' },
            { id: 'SC-11', name: 'Brusque' },
            { id: 'SC-12', name: 'Tubarão' },
            { id: 'SC-13', name: 'Camboriú' },
            { id: 'SC-014', name: 'Chapecó' },
            { id: 'SC-15', name: 'São Bento do Sul' }
        ]
    },
    {
        id: 'SP',
        name: 'São Paulo',
        cities: [
            { id: 'SP-001', name: 'São Paulo' },
            { id: 'SP02', name: 'Guarulhos' },
            { id: 'SP-3', name: 'Campinas' },
            { id: 'SP-004', name: 'São Bernardo do Campo' },
            { id: 'SP-5', name: 'Santo André' },
            { id: 'SP-006', name: 'Osasco' },
            { id: 'SP07', name: 'Ribeirão Preto' },
            { id: 'SP-8', name: 'Sorocaba' },
            { id: 'SP-9', name: 'Mauá' },
            { id: 'SP-010', name: 'São José dos Campos' },
            { id: 'SP-11', name: 'Mogi das Cruzes' },
            { id: 'SP012', name: 'Santos' },
            { id: 'SP-013', name: 'Diadema' },
            { id: 'SP014', name: 'Jundiaí' },
            { id: 'SP-15', name: 'Piracicaba' },
            { id: 'SP-16', name: 'Carapicuíba' },
            { id: 'SP-017', name: 'Bauru' },
            { id: 'SP-18', name: 'Itaquaquecetuba' },
            { id: 'SP-019', name: 'São Vicente' },
            { id: 'SP020', name: 'Franca' }
        ]
    },
    {
        id: 'SE',
        name: 'Sergipe',
        cities: [
            { id: 'SE01', name: 'Aracaju' },
            { id: 'SE-2', name: 'NossaSenhora do Socorro' },
            { id: 'SE-003', name: 'Lagarto' },
            { id: 'SE-4', name: 'Itabaiana' },
            { id: 'SE-005', name: 'São Cristóvão' },
            { id: 'SE-06', name: 'Tobias Barreto' },
            { id: 'SE-007', name: 'Estância' },
            { id: 'SE-08', name: 'Itaporanga d\'Ajuda' },
            { id: 'SE-9', name: 'Nossa Senhora da Glória' },
            { id: 'SE-10', name: 'Poço Redondo' }
        ]
    },
    {
        id: 'TO',
        name: 'Tocantins',
        cities: [
            { id: 'TO-001', name: 'Palmas' },
            { id: 'TO02', name: 'Araguaína' },
            { id: 'TO-003', name: 'Gurupi' },
            { id: 'TO-4', name: 'Porto Nacional' },
            { id: 'TO-05', name: 'Paraíso do Tocantins' },
            { id: 'TO-006', name: 'Colinas do Tocantins' },
            { id: 'TO07', name: 'Formoso do Araguaia' },
            { id: 'TO-8', name: 'Dianópolis' },
            { id: 'TO09', name: 'Miracema do Tocantins' },
            { id: 'TO-010', name: 'Augustinópolis' }
        ]
    }
];

// Helper function to get cities by state
export const getCitiesByState = (stateId: string): City[] => {
    const state = brazilStates.find(s => s.id === stateId);
    return state ? state.cities : [];
};

// Helper function to get state by ID
export const getStateById = (stateId: string): State | undefined => {
    return brazilStates.find(s => s.id === stateId);
}; 