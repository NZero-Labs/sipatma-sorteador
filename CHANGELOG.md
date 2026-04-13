# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

## [Unreleased]

### Added
- `src/types/index.ts` - Tipos compartilhados (`DataProps`, `Participant`)
- `src/hooks/use-raffle.ts` - Hook customizado com toda lógica de estado do sorteio
- `src/components/layout/Header.tsx` - Componente de cabeçalho
- `src/components/layout/Footer.tsx` - Componente de rodapé com variantes
- `src/components/screens/WinnerScreen.tsx` - Tela de exibição do vencedor
- `src/components/screens/LoadingScreen.tsx` - Tela de contagem regressiva
- `src/components/screens/EditorScreen.tsx` - Tela inicial de configuração

### Changed
- Refatorado `App.tsx` de 339 linhas para ~45 linhas
- Separação de responsabilidades em componentes específicos
- Extraída lógica de estado para hook `useRaffle`
- Atualizado `actions.tsx` para importar tipos de `@/types`
- Atualizado `README.md` com documentação completa do projeto

### Improved
- Estrutura de pastas organizada por responsabilidade
- Melhor manutenibilidade e escalabilidade do código
- Componentes reutilizáveis (Header, Footer)
- Tipos centralizados para consistência
