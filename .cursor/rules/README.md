# Regras de Desenvolvimento - GM Tools

Este diretório contém todas as regras de desenvolvimento organizadas por assunto para facilitar a gestão e escalabilidade do projeto.

## 📁 Estrutura de Arquivos

```
.cursor/rules/
├── index.mdc                    # Arquivo principal que referencia todos os outros
├── profile.mdc                  # Perfil do especialista
├── analysis-process.mdc         # Processo de análise de solicitações
├── code-structure.mdc           # Estilo de código e convenções TypeScript
├── react-nextjs.mdc            # Melhores práticas React 19 e Next.js 15
├── validation-zod.mdc           # Validação de dados com Zod v4
├── communication-workflow.mdc   # Comunicação e fluxo de trabalho
├── automation-dx.mdc           # Automação e experiência do desenvolvedor
├── testing-playwright.mdc       # Testes e verificação com Playwright (alwaysApply: false)
└── README.md                    # Este arquivo de documentação
```

## 🎯 Objetivos da Organização

### ✅ Benefícios Alcançados
- **Modularidade**: Cada arquivo foca em um assunto específico
- **Escalabilidade**: Fácil adicionar novas regras sem afetar outras categorias
- **Manutenibilidade**: Mudanças isoladas por contexto
- **Clareza**: Estrutura intuitiva e fácil navegação
- **Reutilização**: Regras podem ser referenciadas individualmente

### 🔧 Como Funciona
- A maioria dos arquivos têm `alwaysApply: true` para aplicação automática
- O arquivo `testing-playwright.mdc` tem `alwaysApply: false` (aplicação manual)
- O arquivo `index.mdc` serve como ponto de entrada principal
- Cada categoria é independente mas complementar
- Estrutura permite crescimento futuro sem reorganização

## 📝 Convenções de Nomenclatura

- **Arquivos**: `kebab-case` com sufixo `.mdc`
- **Seções**: Títulos em português com emojis para identificação visual
- **Código**: Sempre em inglês
- **Comentários**: Em português para explicações

## 🚀 Adicionando Novas Regras

### Para Nova Categoria
1. Crie arquivo `nova-categoria.mdc`
2. Adicione metadados YAML com `alwaysApply: true`
3. Atualize `index.mdc` com nova seção
4. Documente neste README

### Para Categoria Existente
1. Edite arquivo da categoria específica
2. Mantenha estrutura e convenções
3. Teste aplicação das regras

## 🔄 Migração do Arquivo Original

O arquivo original `gm-rules.mdc` foi dividido e reorganizado em:
- ✅ **profile.mdc**: Perfil do especialista
- ✅ **analysis-process.mdc**: Processo de análise de solicitações
- ✅ **code-structure.mdc**: Estilo de código e TypeScript
- ✅ **react-nextjs.mdc**: React e Next.js
- ✅ **validation-zod.mdc**: Validação com Zod
- ✅ **communication-workflow.mdc**: Comunicação e workflow
- ✅ **automation-dx.mdc**: Automação e experiência do desenvolvedor
- ✅ **testing-playwright.mdc**: Testes com Playwright (aplicação manual)

## ⚙️ Configurações Especiais

### 🧪 Testing Playwright
- **Configuração**: `alwaysApply: false` (aplicação manual)
- **Motivo**: Evita execução automática desnecessária do Playwright
- **Uso**: Aplicar apenas quando necessário para verificação de interface
- **Verificação**: Inclui verificação se o servidor já está rodando antes de acessar

## 📋 Checklist de Manutenção

- [ ] Revisar regras mensalmente
- [ ] Atualizar documentação quando necessário
- [ ] Verificar consistência entre arquivos
- [ ] Testar aplicação das regras
- [ ] Manter histórico de mudanças importantes
- [ ] Verificar configurações de `alwaysApply` conforme necessário

---

*Esta estrutura foi criada para melhorar a organização e manutenibilidade das regras de desenvolvimento do projeto GM Tools.*
