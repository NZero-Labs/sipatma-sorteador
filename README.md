# Sorteador de Nomes

Aplicação de sorteio de nomes para eventos, desenvolvida com React + TypeScript + Vite.

## Funcionalidades

- Importação de participantes via CSV
- Sorteio aleatório com animação de contagem regressiva
- Tela de vencedor com efeito de fogos de artifício
- Remoção automática do vencedor da lista para próximos sorteios

## Estrutura do Projeto

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Cabeçalho com logos
│   │   └── Footer.tsx      # Rodapé com informações do evento
│   ├── screens/
│   │   ├── WinnerScreen.tsx   # Tela de exibição do vencedor
│   │   ├── LoadingScreen.tsx  # Tela de contagem regressiva
│   │   └── EditorScreen.tsx   # Tela inicial de configuração
│   ├── ui/                    # Componentes de UI reutilizáveis
│   ├── actions.tsx            # Botões de ação do sorteio
│   ├── csv-importer.tsx       # Importador de CSV
│   └── file-uploader.tsx      # Upload de arquivos
├── hooks/
│   ├── use-raffle.ts          # Lógica de estado do sorteio
│   ├── use-event-listener.ts  # Hook para eventos do DOM
│   └── use-parse-csv.ts       # Parser de CSV
├── types/
│   └── index.ts               # Tipos compartilhados
├── lib/
│   └── utils.ts               # Utilitários
├── App.tsx                    # Componente principal
└── main.tsx                   # Entry point
```

## Como Usar

### Instalação

```bash
yarn install
```

### Desenvolvimento

```bash
yarn dev
```

### Build

```bash
yarn build
```

## Importação de Participantes

1. Clique no botão de upload na tela inicial
2. Selecione um arquivo CSV com as colunas:
   - `name` (obrigatório): Nome do participante
   - `corporation` (opcional): Empresa do participante
3. Mapeie os campos do CSV para os campos esperados
4. Clique em "Importar"

## Realizando o Sorteio

1. Após importar os participantes, clique em "SORTEAR VENCEDOR!"
2. Aguarde a contagem regressiva de 5 segundos
3. O vencedor será exibido com efeito de fogos de artifício
4. Para sortear novamente, clique em "SORTEAR NOVAMENTE"

## Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- react-canvas-confetti (efeitos de fogos)
- Radix UI (componentes acessíveis)
