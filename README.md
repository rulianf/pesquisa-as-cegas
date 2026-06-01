# Pesquisa Cega 🔍

Um aplicativo web interativo que permite aos usuários responder perguntas sobre políticas públicas **sem ver nomes ou partidos**, e descobrir quais candidatos pensam mais parecido com eles.

## 🎯 Características

- **7 perguntas** sobre temas políticos importantes
- **Pesquisa cega**: Respostas sem identificação de candidatos
- **10 candidatos**: 5 para Presidência + 5 para Governo do ES
- **Resultado detalhado**: Compatibilidade por tema + Top 3 candidatos
- **Sem cadastro**: Dados não são coletados
- **Responsivo**: Funciona em mobile e desktop

## 🚀 Como Usar

1. Abra `index.html` em um navegador
2. Clique em "Começar agora"
3. Responda as 7 perguntas
4. Visualize seus resultados
5. Clique nos candidatos para ver perfil completo

## 📁 Estrutura do Projeto

```
pesquisa-as-cegas/
├── index.html              # Arquivo principal (HTML limpo)
├── assets/
│   ├── css/                # Estilos organizados por responsabilidade
│   │   ├── variables.css   # Design tokens (cores, spacing, fontes)
│   │   ├── global.css      # Reset e estilos globais
│   │   ├── screens.css     # Estilos das telas (landing, quiz, result)
│   │   └── components.css  # Componentes reutilizáveis (buttons, cards)
│   └── js/                 # Scripts modularizados
│       ├── data.js         # Dataset (perguntas, candidatos, perfis)
│       ├── utils.js        # Utilidades e ícones
│       ├── scoring.js      # Lógica de pontuação
│       ├── ui.js           # Renderização de interfaces
│       └── main.js         # Orquestração e estado global
├── docs/
│   └── STRUCTURE.md        # Documentação da arquitetura
└── README.md
```

**Veja [docs/STRUCTURE.md](docs/STRUCTURE.md) para arquitetura detalhada.**

## 🎨 Tecnologias

- **HTML5** - Semântico e acessível
- **CSS3** - Variables, Grid, Flexbox, Responsivo
- **Vanilla JavaScript** - Sem dependências
- **Google Fonts** - Syne + DM Sans

## 🧮 Algoritmo de Compatibilidade

- **Perguntas single-choice**: Comparação direta (0 ou 1)
- **Perguntas multi-choice**: Jaccard similarity (interseção / união)
- **Score final**: Média de todos os temas

Resultado: Percentual de compatibilidade com cada candidato.

## 📊 Dataset

| Elemento | Qtd |
|----------|-----|
| Temas | 7 |
| Perguntas | 7 |
| Candidatos | 10 |
| Opções por pergunta | 3-7 |

## 🔒 Privacidade

✅ **Sem coleta de dados**
✅ **Sem rastreamento**
✅ **Sem cookies**
✅ **Tudo executado localmente**

## 📱 Compatibilidade

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Desenvolvimento

### Adicionar Nova Pergunta

1. Edite `assets/js/data.js`
2. Adicione pergunta em `DATASET.questions[]`
3. Adicione respostas dos candidatos em `DATASET.profiles[]`

### Customizar Cores

Edite `assets/css/variables.css`:
```css
--navy: #0b1e3d;      /* Cor principal */
--teal-accent: #5ce8c5; /* Cor destaque */
```

### Estrutura de Código

| Arquivo | Responsabilidade |
|---------|-----------------|
| data.js | Dataset estruturado |
| utils.js | DOM helpers + utilidades |
| scoring.js | Lógica de pontuação |
| ui.js | Renderização de interfaces |
| main.js | Orquestração da aplicação |

## 📄 Licença

MIT - Livre para usar, modificar e distribuir.

---

**Versão**: 1.0 | **Dataset**: Hash 960e8395 | **Atualizado**: junho/2026
