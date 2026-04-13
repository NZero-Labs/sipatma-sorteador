# Sorteador de Nomes

Aplicação de sorteio de nomes para eventos, desenvolvida com React + TypeScript + Vite.

## Funcionalidades

- Importação de participantes via CSV/XLSX
- Configuração de quantidade de prêmios a sortear
- Sorteio aleatório com animação de contagem regressiva
- Tela de vencedor com efeito de fogos de artifício
- Contador de prêmios restantes
- Histórico de sorteios realizados
- Remoção automática do vencedor da lista para próximos sorteios
- Opção de reiniciar sorteio após todos os prêmios serem distribuídos

## Estrutura do Projeto

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Cabeçalho com logos
│   │   └── Footer.tsx         # Rodapé com informações do evento
│   ├── screens/
│   │   ├── WinnerScreen.tsx   # Tela de exibição do vencedor
│   │   ├── LoadingScreen.tsx  # Tela de contagem regressiva
│   │   └── EditorScreen.tsx   # Tela inicial de configuração
│   ├── ui/                    # Componentes de UI reutilizáveis
│   │   ├── settings-icon.tsx  # Ícone de engrenagem
│   │   └── history-icon.tsx   # Ícone de histórico
│   ├── actions.tsx            # Botões de ação do sorteio
│   ├── settings-modal.tsx     # Modal de configurações
│   ├── history-modal.tsx      # Modal de histórico de sorteios
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

## Configuração do Sorteio

1. Na tela inicial, clique no ícone de engrenagem no canto inferior direito
2. No modal de configurações:
   - Digite a quantidade de prêmios que serão sorteados
   - Arraste ou clique para importar um arquivo CSV/XLSX com os participantes
3. Clique em "Salvar configurações"

## Importação de Participantes

1. No modal de configurações, arraste ou clique na área de upload
2. Selecione um arquivo CSV ou XLSX com as colunas:
   - `name` (obrigatório): Nome do participante
   - `corporation` (opcional): Empresa do participante
3. Mapeie os campos do arquivo para os campos esperados
4. Clique em "Importar"

## Realizando o Sorteio

1. Após configurar os participantes e prêmios, clique em "SORTEAR VENCEDOR!"
2. Aguarde a contagem regressiva de 5 segundos
3. O vencedor será exibido com efeito de fogos de artifício
4. A tela mostrará quantos prêmios ainda restam
5. Para sortear novamente, clique em "SORTEAR NOVAMENTE"

## Histórico de Sorteios

Na tela do vencedor, clique no ícone de histórico (canto inferior direito) para ver a lista de todos os vencedores sorteados.

## Novo Sorteio

Quando todos os prêmios forem distribuídos, um botão "Novo Sorteio" aparecerá permitindo reiniciar a aplicação com novas configurações.

## Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- react-canvas-confetti (efeitos de fogos)
- Radix UI (componentes acessíveis)
