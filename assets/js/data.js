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
        },
        {
          id: 'D',
          text: 'Aumentar os investimentos(custos) em saúde para ampliar o atendimento e melhorar a qualidade dos serviços.'
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
        },
        {
          id: 'H',
          text: 'Soltar os presos políticos do dia 8 de janeiro.'
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
      avatar: './assets/img/candidates/lula.jpg',
      instagram: 'https://www.instagram.com/lulaoficial/',
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
      avatar: './assets/img/candidates/flavio.jpg',
      instagram: 'https://www.instagram.com/flaviobolsonaro/',
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
      avatar: './assets/img/candidates/zema.jpg',
      instagram: 'https://www.instagram.com/romeu.zema/',
      shortBio: `Empresário de sucesso no setor varejista mineiro antes de surpreender o cenário político em 2018, quando foi eleito governador de Minas Gerais pelo Partido Novo. Sem experiência prévia na vida pública, ele adotou um estilo de gestão empresarial, focando no corte de gastos, na renegociação da dívida do estado e na atração de investimentos. Sua imagem é a do "gestor-cidadão", que utiliza voos comerciais e mantém hábitos simples, contrastando com a pompa tradicional dos cargos políticos.

                Reeleito em primeiro turno em 2022, Zema consolidou-se como uma liderança liberal de resultados. A imprensa frequentemente destaca seu pragmatismo e sua fala mansa, mas direta, que ressoa com um eleitorado cansado da política tradicional. Embora tenha mantido uma relação de apoio crítico ao governo Bolsonaro, ele buscou preservar sua identidade própria, focada na eficiência administrativa e no liberalismo econômico puro.`
    },
    {
      id: 'caiado',
      displayName: 'Ronaldo Caiado',
      fullName: 'Ronaldo Caiado',
      party: 'PSD',
      office: 'presidencia',
      color: '#2e7d32',
      avatar: './assets/img/candidates/caiado.jpg',
      instagram: 'https://www.instagram.com/ronaldocaiado/',
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
      avatar: './assets/img/candidates/renan.jpg',
      instagram: 'https://www.instagram.com/renan_mbl/',
      shortBio:
           'Renan Santos é um dos fundadores e o principal estrategista do Movimento Brasil Livre (MBL), grupo que ganhou projeção nacional durante os protestos pelo impeachment de Dilma Rousseff em 2015 e 2016. Conhecido por seu estilo combativo e pelo uso intensivo das redes sociais, ele é visto na imprensa como uma figura central na renovação da direita brasileira, embora frequentemente se envolva em polêmicas e embates com o chamado "bolsonarismo".   Empresário e ativista, Renan nunca ocupou cargos eletivos, mas atuou nos bastidores de diversas campanhas vitoriosas do MBL. Atualmente, ele preside o Partido Missão, a nova legenda criada pelo movimento para consolidar sua independência política. No cenário público, é descrito como um articulador habilidoso que busca construir uma "terceira via" de direita, focada na formação de novas lideranças e na eficiência administrativa.'

    },
    {
      id: 'malta',
      displayName: 'Magno Malta',
      fullName: 'Magno Malta',
      party: 'PL',
      office: 'governador',
      color: '#1a4fa0',
      avatar: './assets/img/candidates/malta.jpg',
      instagram: 'https://www.instagram.com/magnomaltaoficial/',
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
      avatar: './assets/img/candidates/helder.jpg',
      instagram: 'https://www.instagram.com/heldersalomao/',
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
      avatar: './assets/img/candidates/pazolini.jpg',
      instagram: 'https://www.instagram.com/lorenzopazolini/',
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
      avatar: './assets/img/candidates/ferraco.jpg',
      instagram: 'https://www.instagram.com/ricardoferraco/',
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
      avatar: './assets/img/candidates/breno.jpg',
      instagram: 'https://www.instagram.com/brenobarcelos_/',
      shortBio:
        'Renan Santos é um dos fundadores e o principal estrategista do Movimento Brasil Livre (MBL), grupo que ganhou projeção nacional durante os protestos pelo impeachment de Dilma Rousseff em 2015 e 2016. Conhecido por seu estilo combativo e pelo uso intensivo das redes sociais, ele é visto na imprensa como uma figura central na renovação da direita brasileira, embora frequentemente se envolva em polêmicas e embates com o chamado "bolsonarismo". Empresário e ativista, Renan nunca ocupou cargos eletivos, mas atuou nos bastidores de diversas campanhas vitoriosas do MBL. Atualmente, ele preside o Partido Missão, a nova legenda criada pelo movimento para consolidar sua independência política. No cenário público, é descrito como um articulador habilidoso que busca construir uma "terceira via" de direita, focada na formação de novas lideranças e na eficiência administrativa.'
    }
  ],

  profiles: {
    lula:       { Q1: 'B', Q2: ['B', 'C'], Q3: 'C', Q4: 'C', Q5: 'B', Q6: 'B', Q7: ['A', 'B', 'C'] },
    helder:     { Q1: 'B', Q2: ['B', 'C'], Q3: 'A', Q4: 'C', Q5: 'B', Q6: 'B', Q7: ['B', 'G', 'A'] },
    flavio:     { Q1: 'C', Q2: ['A', 'D'], Q3: 'B', Q4: 'A', Q5: 'A', Q6: 'C', Q7: ['D', 'B', 'H'] },
    zema:       { Q1: 'C', Q2: ['B', 'E'], Q3: 'B', Q4: 'A', Q5: 'A', Q6: 'A', Q7: ['D', 'H', 'C'] },
    caiado:     { Q1: 'A', Q2: ['A', 'B'], Q3: 'A', Q4: 'B', Q5: 'A', Q6: 'A', Q7: ['D', 'C', 'H'] },
    renan:      { Q1: 'A', Q2: ['A', 'E'], Q3: 'A', Q4: 'B', Q5: 'C', Q6: 'A', Q7: ['C', 'D', 'E'] },
    breno:      { Q1: 'A', Q2: ['A', 'E'], Q3: 'A', Q4: 'B', Q5: 'C', Q6: 'A', Q7: ['C', 'D', 'E'] },
    malta:      { Q1: 'C', Q2: ['A', 'D'], Q3: 'B', Q4: 'A', Q5: 'A', Q6: 'C', Q7: ['D', 'B', 'H'] },
    pazolini:   { Q1: 'A', Q2: ['A', 'B'], Q3: 'D', Q4: 'B', Q5: 'A', Q6: 'A', Q7: ['D', 'F', 'G']},
    ferraco:    { Q1: 'B', Q2: ['C', 'B'], Q3: 'D', Q4: 'C', Q5: 'B', Q6: 'A', Q7: ['D', 'F', 'G'] }
    }
};