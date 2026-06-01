/* ═══════════════════════════════════════════ */
/* DATA - Dataset estruturado                 */
/* ═══════════════════════════════════════════ */

const DATASET = {
  version: '1.0',
  hash: '960e8395',
  updatedAt: '2026-06-01',
  locale: 'pt-BR',

  parties: [
    {
      id: 'PT',
      name: 'Partido dos Trabalhadores',
      logo: './assets/img/parties/pt-logo.png',
      logoBig: './assets/img/parties/pt-big.png'
    },
    {
      id: 'PL',
      name: 'Partido Liberal',
      logo: './assets/img/parties/pl-logo.png',
      logoBig: './assets/img/parties/pl-big.png'
    },
    {
      id: 'Novo',
      name: 'Partido Novo',
      logo: './assets/img/parties/novo-logo.png',
      logoBig: './assets/img/parties/novo-big.png'
    },
    {
      id: 'PSD',
      name: 'Partido Social Democrático',
      logo: './assets/img/parties/psd-logo.png',
      logoBig: './assets/img/parties/psd-big.png'
    },
    {
      id: 'Missão',
      name: 'Partido Missão',
      logo: './assets/img/parties/missao-logo.png',
      logoBig: './assets/img/parties/missao-big.png'
    },
    {
      id: 'Republicanos',
      name: 'Republicanos',
      logo: './assets/img/parties/republicanos-logo.png',
      logoBig: './assets/img/parties/republicanos-big.png'
    },
    {
      id: 'MDB',
      name: 'Movimento Democrático Brasileiro',
      logo: './assets/img/parties/mdb-logo.png',
      logoBig: './assets/img/parties/mdb-big.png'
    }
  ],

  themes: [
    { id: 'privatizacao', name: 'Privatização' },
    { id: 'seguranca', name: 'Segurança pública' },
    { id: 'saude', name: 'Saúde' },
    { id: 'economia', name: 'Economia' },
    { id: 'mundo', name: 'Pol. internacional' },
    { id: 'educacao', name: 'Educação' },
    { id: 'priorizacao', name: 'Prioridades' }
  ],

  questions: [
    {
      id: 'Q1',
      themeId: 'privatizacao',
      type: 'single',
      text: 'O que o governo deve fazer com empresas estatais?',
      options: [
        {
          id: 'A',
          text: 'Manter as estatais estratégicas (ex.: Petrobras, Embrapa, Cesan) e privatizar as demais (ex.: Correios).'
        },
        {
          id: 'B',
          text: 'Não privatizar. Mesmo sem lucro, elas cumprem uma função social importante.'
        },
        {
          id: 'C',
          text: 'Privatizar a maioria, porque a iniciativa privada tende a gerir melhor.'
        }
      ]
    },
    {
      id: 'Q2',
      themeId: 'seguranca',
      type: 'multi',
      maxChoices: 2,
      text: 'Como o governo deve lidar com a segurança pública?',
      options: [
        {
          id: 'A',
          text: '(Modelo El Salvador) Enfrentar o crime organizado com policiamento ostensivo e penas mais duras.'
        },
        {
          id: 'B',
          text: 'Combater com inteligência, focando nos grandes líderes e financiadores do crime.'
        },
        {
          id: 'C',
          text: 'Priorizar prevenção (educação, emprego, reduzir reincidência) e punir os financiadores do crime.'
        },
        {
          id: 'D',
          text: 'Facilitar o acesso a armas para legítima defesa.'
        },
        {
          id: 'E',
          text: 'Reduzir a maioridade penal.'
        }
      ]
    },
    {
      id: 'Q3',
      themeId: 'saude',
      type: 'single',
      text: 'Qual deve ser a prioridade principal na saúde?',
      options: [
        {
          id: 'A',
          text: 'Integrar o sistema de saúde com tecnologia (incluindo IA) para reduzir filas e melhorar a qualidade.'
        },
        {
          id: 'B',
          text: 'Privatizar hospitais, buscando mais eficiência na gestão.'
        },
        {
          id: 'C',
          text: 'Aumentar o número de médicos, incluindo programas para trazer profissionais de outros países.'
        }
      ]
    },
    {
      id: 'Q4',
      themeId: 'economia',
      type: 'single',
      text: 'Qual deve ser o caminho para crescimento e equilíbrio fiscal?',
      options: [
        {
          id: 'A',
          text: 'Privatizar o máximo possível (ex.: Petrobras, Correios, Banco do Brasil).'
        },
        {
          id: 'B',
          text: 'Cortar privilégios no setor público (fim de supersalários) e revisar isenções.'
        },
        {
          id: 'C',
          text: 'Aumentar impostos, especialmente para os mais ricos.'
        },
        {
          id: 'E',
          text: 'Investir em economia verde e infraestrutura (transição energética, obras) para impulsionar o crescimento.'
        }
      ]
    },
    {
      id: 'Q5',
      themeId: 'mundo',
      type: 'single',
      text: 'Como o Brasil deve se posicionar no mundo?',
      options: [
        {
          id: 'A',
          text: 'Aproximar-se dos EUA, por serem um parceiro histórico.'
        },
        {
          id: 'B',
          text: 'Aproximar-se da China, por trazer investimentos e desenvolvimento.'
        },
        {
          id: 'C',
          text: 'Manter relação pragmática com ambos, negociando caso a caso conforme o interesse do Brasil.'
        }
      ]
    },
    {
      id: 'Q6',
      themeId: 'educacao',
      type: 'single',
      text: 'Qual deve ser o foco principal na educação?',
      options: [
        {
          id: 'A',
          text: 'Priorizar o ensino básico (ler, escrever e matemática bem feitos).'
        },
        {
          id: 'B',
          text: 'Fortalecer o ensino superior e bolsas (incluindo políticas de inclusão).'
        },
        {
          id: 'C',
          text: 'Focar em valores e controle do currículo (ex.: "escola sem partido").'
        }
      ]
    },
    {
      id: 'Q7',
      themeId: 'priorizacao',
      type: 'multi',
      maxChoices: 3,
      text: 'Quais devem ser as prioridades do governo?',
      options: [
        {
          id: 'A',
          text: 'Acabar com a fome no Brasil.'
        },
        {
          id: 'B',
          text: 'Assistência e programas sociais.'
        },
        {
          id: 'C',
          text: 'Desenvolvimento e industrialização.'
        },
        {
          id: 'D',
          text: 'Segurança pública.'
        },
        {
          id: 'E',
          text: 'Combate à corrupção.'
        },
        {
          id: 'F',
          text: 'Educação.'
        },
        {
          id: 'G',
          text: 'Saúde.'
        }
      ]
    }
  ],

  candidates: [
    {
      id: 'lula',
      displayName: 'Lula',
      fullName: 'Luiz Inácio Lula da Silva',
      party: 'PT',
      office: 'presidencia',
      color: '#CC0000',
      avatar: './assets/img/lula.png',
      shortBio:
        'Presidente em exercício pelo PT. Defende fortalecimento do SUS, programas sociais, multilateralismo e combate à fome e desigualdade.'
    },
    {
      id: 'flavio',
      displayName: 'Flávio Bolsonaro',
      fullName: 'Flávio Bolsonaro',
      party: 'PL',
      office: 'presidencia',
      color: '#1a4fa0',
      avatar: './assets/img/flavio.jpg',
      shortBio:
        'Senador pelo PL e pré-candidato à Presidência. Defende privatizações amplas, segurança linha dura, redução da maioridade penal e alinhamento com os EUA.'
    },
    {
      id: 'zema',
      displayName: 'Romeu Zema',
      fullName: 'Romeu Zema',
      party: 'Novo',
      office: 'presidencia',
      color: '#e85c00',
      avatar: './assets/img/zema.jpg',
      shortBio:
        'Ex-governador de Minas Gerais pelo Partido Novo. Defende privatização de todas as estatais, reforma administrativa profunda e liberalismo econômico radical.'
    },
    {
      id: 'caiado',
      displayName: 'Ronaldo Caiado',
      fullName: 'Ronaldo Caiado',
      party: 'PSD',
      office: 'presidencia',
      color: '#2e7d32',
      avatar: './assets/img/caiado.jpg',
      shortBio:
        'Governador de Goiás pelo PSD. Propõe "nacionalizar" projetos testados em Goiás: segurança integrada, policlínicas e responsabilidade fiscal.'
    },
    {
      id: 'renan',
      displayName: 'Renan Santos',
      fullName: 'Renan Santos',
      party: 'Missão',
      office: 'presidencia',
      color: '#1a1a1a',
      avatar: './assets/img/renan.jpg',
      shortBio:
        'Líder do MBL e pré-candidato pelo Partido Missão. Defende liberalismo econômico, combate rigoroso à corrupção e segurança pública sem concessões.'
    },
    {
      id: 'malta',
      displayName: 'Magno Malta',
      fullName: 'Magno Malta',
      party: 'PL',
      office: 'governador',
      color: '#1a4fa0',
      avatar: './assets/img/malta.jpg',
      shortBio:
        'Ex-senador pelo PL, pré-candidato ao Governo do ES. Agenda conservadora com ênfase em segurança, valores tradicionais e apoio ao agronegócio capixaba.'
    },
    {
      id: 'helder',
      displayName: 'Helder Salomão',
      fullName: 'Helder Salomão',
      party: 'PT',
      office: 'governador',
      color: '#CC0000',
      avatar: './assets/img/helder.jpg',
      shortBio:
        'Ex-prefeito de Cariacica pelo PT, pré-candidato ao Governo do ES. Combina equilíbrio fiscal com ampliação de políticas sociais e educação de qualidade.'
    },
    {
      id: 'pazolini',
      displayName: 'L. Pazolini',
      fullName: 'Lorenzo Pazolini',
      party: 'Republicanos',
      office: 'governador',
      color: '#0d47a1',
      avatar: './assets/img/pazolini.jpg',
      shortBio:
        'Ex-prefeito de Vitória e delegado de carreira. Foco em segurança com tecnologia (cerco inteligente), equilíbrio fiscal modelo Hartung e gestão por resultados.'
    },
    {
      id: 'ferraco',
      displayName: 'Ricardo Ferraço',
      fullName: 'Ricardo Ferraço',
      party: 'MDB',
      office: 'governador',
      color: '#2e7d32',
      avatar: './assets/img/ferraco.jpg',
      shortBio:
        'Atual governador do ES pelo MDB. Foco em segurança, saúde e educação com ênfase em infraestrutura, logística e gestão dos royalties de petróleo.'
    },
    {
      id: 'breno',
      displayName: 'Breno Barcelos',
      fullName: 'Breno Barcelos',
      party: 'Missão',
      office: 'governador',
      color: '#1a1a1a',
      avatar: './assets/img/breno.jpg',
      shortBio:
        'Pré-candidato ao Governo do ES pelo Partido Missão (MBL). Perfil liberal com liberalismo econômico amplo e segurança pública rigorosa.'
    }
  ],

  profiles: {
    lula: { Q1: 'B', Q2: ['B', 'C'], Q3: 'C', Q4: 'C', Q5: 'C', Q6: 'A', Q7: ['A', 'B', 'C'] },
    flavio: { Q1: 'C', Q2: ['A', 'D'], Q3: 'B', Q4: 'A', Q5: 'A', Q6: 'C', Q7: ['D', 'E'] },
    zema: { Q1: 'C', Q2: ['A', 'E'], Q3: 'B', Q4: 'A', Q5: 'A', Q6: 'A', Q7: ['D', 'E', 'C'] },
    caiado: { Q1: 'A', Q2: ['A', 'B'], Q3: 'A', Q4: 'B', Q5: 'C', Q6: 'A', Q7: ['D', 'C'] },
    renan: { Q1: 'C', Q2: ['A', 'E'], Q3: 'A', Q4: 'A', Q5: 'A', Q6: 'C', Q7: ['D', 'E'] },
    malta: { Q1: 'A', Q2: ['A', 'D'], Q3: 'B', Q4: 'A', Q5: 'A', Q6: 'C', Q7: ['D', 'E'] },
    helder: { Q1: 'B', Q2: ['B', 'C'], Q3: 'A', Q4: 'C', Q5: 'C', Q6: 'A', Q7: ['F', 'G', 'A'] },
    pazolini: {
      Q1: 'A',
      Q2: ['A', 'B'],
      Q3: 'A',
      Q4: 'B',
      Q5: 'C',
      Q6: 'A',
      Q7: ['D', 'F', 'G']
    },
    ferraco: { Q1: 'A', Q2: ['A', 'B'], Q3: 'A', Q4: 'B', Q5: 'C', Q6: 'A', Q7: ['D', 'F', 'G'] },
    breno: { Q1: 'C', Q2: ['A', 'E'], Q3: 'A', Q4: 'A', Q5: 'A', Q6: 'C', Q7: ['D', 'E'] }
  }
};
