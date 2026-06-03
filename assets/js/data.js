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
        `Figura mais icônica e polarizadora da política brasileira contemporânea. De origem humilde e ex-líder sindical, ele fundou o Partido dos Trabalhadores (PT) e se tornou o primeiro operário a chegar à Presidência da República, cargo que ocupou por dois mandatos (2003-2010) e ao qual retornou em 2023. Sua trajetória é marcada por grandes conquistas sociais, mas também por crises políticas profundas e processos judiciais que o levaram à prisão e, posteriormente, à anulação de suas condenações.
        Na imprensa internacional e nacional, Lula é frequentemente retratado como um negociador nato e um carismático líder de massas, capaz de transitar entre diferentes grupos políticos e econômicos. Enquanto seus apoiadores o veem como o "pai dos pobres" e o defensor da democracia, seus críticos o associam aos escândalos de corrupção que marcaram as gestões petistas. Sua figura transcende a política partidária, sendo um símbolo global do multilateralismo e das lutas sociais.`
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
      shortBio:`Filho mais velho do ex-presidente Jair Bolsonaro e atua como um dos principais articuladores políticos do grupo familiar. Com mandatos como deputado estadual no Rio de Janeiro e, atualmente, como senador da República, ele é visto como o "braço político" do bolsonarismo, responsável por negociar alianças e manter a interlocução com o Congresso. Sua trajetória é marcada pela defesa das pautas de segurança, valores conservadores e liberdade econômica.
      Na imprensa, Flávio é frequentemente citado em investigações judiciais, como o caso das "rachadinhas", o que molda parte da percepção pública sobre sua figura. No entanto, entre os apoiadores de seu pai, ele é visto como um herdeiro político resiliente e um estrategista que ajuda a manter a coesão da direita conservadora no Brasil. Ele é um dos principais nomes do PL para as articulações eleitorais de 2026.`
    },
    {
      id: 'zema',
      displayName: 'Romeu Zema',
      fullName: 'Romeu Zema',
      party: 'Novo',
      office: 'presidencia',
      color: '#e85c00',
      avatar: './assets/img/candidates/zema.jpg',
      instagram: 'https://www.instagram.com/romeuzemaoficial/',
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
      shortBio:`Uma das figuras mais tradicionais e longevas da política brasileira, com uma trajetória que remonta à fundação da União Democrática Ruralista (UDR) nos anos 80, onde se destacou como defensor dos produtores rurais. Médico de formação e herdeiro de uma influente família política de Goiás, ele construiu uma carreira sólida no Congresso Nacional, servindo como deputado federal e senador por vários mandatos, sempre posicionado como uma voz conservadora e defensora da propriedade privada.
        Atualmente em seu segundo mandato como governador de Goiás, Caiado é frequentemente citado na imprensa como um gestor rigoroso e "pulso firme", especialmente na área de segurança pública, que se tornou sua principal marca. Sua imagem pública é a de um político experiente, de temperamento forte e retórica direta, que conseguiu unir o apoio do agronegócio a uma gestão estadual bem avaliada, posicionando-se como um forte nome para a disputa presidencial.`
    },
    {
      id: 'renan',
      displayName: 'Renan Santos',
      fullName: 'Renan Santos',
      party: 'Missão',
      office: 'presidencia',
      color: '#1a1a1a',
      avatar: './assets/img/candidates/renan.jpg',
      instagram: 'https://www.instagram.com/renansantosmbl/',
      shortBio: `Fundadores e o principal estrategista do Movimento Brasil Livre (MBL), grupo que ganhou projeção nacional durante os protestos pelo impeachment de Dilma Rousseff em 2015 e 2016. Conhecido por seu estilo combativo e pelo uso intensivo das redes sociais, ele é visto na imprensa como uma figura central na renovação da direita brasileira, embora frequentemente se envolva em polêmicas e embates com o chamado "bolsonarismo".
      Empresário e ativista, Renan nunca ocupou cargos eletivos, mas atuou nos bastidores de diversas campanhas vitoriosas do MBL. Atualmente, ele preside o Partido Missão, a nova legenda criada pelo movimento para consolidar sua independência política. No cenário público, é descrito como um articulador habilidoso que busca construir uma "terceira via" de direita, focada na formação de novas lideranças e na eficiência administrativa.`
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
      shortBio: `Veterano da política capixaba e nacional, conhecido por sua carreira como cantor gospel e pastor evangélico antes de ingressar na vida pública. Com vários mandatos como senador e deputado, ele se tornou uma das vozes mais proeminentes da bancada evangélica no Congresso. Sua imagem é indissociável da defesa dos valores da família tradicional, do combate às drogas e do endurecimento das penas criminais, tendo presidido CPIs famosas sobre maus-tratos infantis.
      Retratado na imprensa como um orador inflamado e carismático, Malta é um aliado de primeira hora da família Bolsonaro e um dos principais mobilizadores do eleitorado cristão conservador. Embora tenha enfrentado períodos de ostracismo político, seu retorno ao Senado em 2022 reafirmou sua força como um símbolo do conservadorismo religioso e da pauta de costumes no Brasil.`
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
      shortBio: `Professor de filosofia e político de carreira no Espírito Santo, com uma trajetória profundamente ligada às comunidades eclesiais de base e ao movimento sindical. Ele ganhou destaque como prefeito de Cariacica, onde implementou gestões focadas na participação popular e no desenvolvimento social. Como deputado federal, ele é visto como um dos principais quadros do PT no estado, mantendo uma postura de diálogo e defesa ferrenha das políticas públicas de educação e direitos humanos.
      Na imprensa local, Helder é descrito como um político de perfil ético e moderado, respeitado inclusive por adversários por sua coerência ideológica. Ele representa a ala mais orgânica e militante do PT, focada na base social e na defesa do legado das gestões lulistas, sendo uma figura central para a articulação da esquerda no Espírito Santo.`
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
      shortBio: `Carreira técnica e policial, tendo atuado como auditor do Tribunal de Contas e, posteriormente, como delegado da Polícia Civil no Espírito Santo. Ele ganhou notoriedade estadual por seu trabalho na Delegacia de Proteção à Criança e ao Adolescente, o que o catapultou para uma votação expressiva como deputado estadual em 2018. Sua imagem pública é fortemente associada à legalidade e ao combate ao crime.
      Eleito prefeito de Vitória em 2020 e reeleito em 2024, Pazolini é visto como um gestor moderno que busca equilibrar o rigor da segurança pública com a eficiência tecnológica na saúde e na educação. Na imprensa local, é frequentemente descrito como um político que mantém uma postura institucional séria, evitando o populismo exacerbado, mas mantendo uma base fiel de apoio através de entregas concretas na capital capixaba.`
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
      shortBio: `Ricardo Ferraço possui uma das trajetórias mais completas da política capixaba, tendo ocupado cargos em todas as esferas: foi deputado estadual, federal, senador e vice-governador por duas vezes. Filho de um tradicional líder político do sul do estado, ele construiu uma imagem de político técnico e preparador, com forte trânsito no setor produtivo e nas instâncias de decisão em Brasília. Atualmente, exerce o cargo de governador do Espírito Santo após a desincompatibilização de Renato Casagrande.
      Visto na imprensa como um articulador pragmático e um entusiasta da modernização administrativa, Ferraço é o tipo de político que prioriza a estabilidade institucional e o crescimento econômico. Sua figura é associada à continuidade de políticas públicas bem-sucedidas no estado, sendo considerado um gestor experiente que sabe equilibrar as demandas políticas com o rigor fiscal.`
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
      shortBio: `liderança emergente ligada ao Movimento Brasil Livre (MBL) no Espírito Santo. Com um perfil acadêmico e técnico, ele se destaca pela articulação interna e pela formação de novos quadros para o Partido Missão no estado. Diferente de outras figuras do movimento que buscam o confronto direto, Breno é visto como um nome de bastidor e planejamento, focado em construir as bases para a expansão da legenda em território capixaba.
      Na imprensa e nas redes sociais, ele é apresentado como a face capixaba da renovação proposta pelo MBL, defendendo a eficiência na gestão pública e o combate aos privilégios. Como pré-candidato ao governo do estado, sua imagem está sendo construída como uma alternativa jovem e técnica, alinhada aos princípios de Renan Santos e da cúpula nacional do Missão.`
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