# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

## [Unreleased]

### Added
- `src/components/ui/history-icon.tsx` - Ícone de histórico para tela do vencedor
- `src/components/history-modal.tsx` - Modal com lista de vencedores sorteados
- Estado `winners` no hook `useRaffle` para armazenar histórico de vencedores
- Função `resetRaffle` para reiniciar o sorteio
- Botão "Novo Sorteio" quando todos os prêmios são distribuídos
- Botão de histórico na tela do vencedor (canto inferior direito)

### Changed
- `WinnerScreen` agora exibe botão de histórico e botão de novo sorteio
- Modal de configurações redesenhado seguindo layout do Figma
- Área de upload com estilo dashed verde e ícone customizado

### Previous Changes

#### Modal de Configurações
- `src/components/ui/settings-icon.tsx` - Ícone de engrenagem para configurações
- `src/components/settings-modal.tsx` - Modal de configurações com upload CSV e seleção de prêmios
- Estados `totalPrizes`, `prizesRemaining` e `fileName` no hook `useRaffle`
- Contador de prêmios restantes na tela do vencedor
- Exibição do nome do arquivo carregado na tela inicial
- Removido botão de upload da tela inicial
- Adicionado botão de engrenagem no canto inferior direito da tela inicial
- Upload de CSV movido para dentro do modal de configurações
- Removida quantidade de nomes do botão "SORTEAR VENCEDOR!"
- `WinnerScreen` agora exibe quantos prêmios ainda restam
- `actions.tsx` simplificado, removido `CsvImporter`

#### Refatoração Inicial
- `src/types/index.ts` - Tipos compartilhados (`DataProps`, `Participant`)
- `src/hooks/use-raffle.ts` - Hook customizado com toda lógica de estado do sorteio
- `src/components/layout/Header.tsx` - Componente de cabeçalho
- `src/components/layout/Footer.tsx` - Componente de rodapé com variantes
- `src/components/screens/WinnerScreen.tsx` - Tela de exibição do vencedor
- `src/components/screens/LoadingScreen.tsx` - Tela de contagem regressiva
- `src/components/screens/EditorScreen.tsx` - Tela inicial de configuração
- Refatorado `App.tsx` de 339 linhas para ~55 linhas
- Separação de responsabilidades em componentes específicos
- Extraída lógica de estado para hook `useRaffle`
- Estrutura de pastas organizada por responsabilidade
