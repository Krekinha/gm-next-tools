// =============================================
// SCRIPT DE TESTE DE LOGIN - GM TOOLS
// =============================================
// 
// INSTRUÇÕES:
// 1. Abra o navegador e vá para http://localhost:3000
// 2. Abra o Console do navegador (F12 > Console)
// 3. Cole e execute este script
// 4. Observe os resultados
//
// =============================================

console.log('🧪 Iniciando teste de login do GM Tools...');

// Função para testar o login
async function testLogin() {
  try {
    console.log('📋 Verificando elementos da página...');
    
    // Verificar se estamos na página de login
    if (!window.location.href.includes('/auth/login')) {
      console.error('❌ Não estamos na página de login. URL atual:', window.location.href);
      return;
    }
    
    // Aguardar um pouco para garantir que a página carregou
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Buscar elementos do formulário
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('button[type="submit"]');
    
    console.log('🔍 Elementos encontrados:');
    console.log('- Email input:', !!emailInput);
    console.log('- Password input:', !!passwordInput);
    console.log('- Submit button:', !!submitButton);
    
    if (!emailInput || !passwordInput || !submitButton) {
      console.error('❌ Elementos do formulário não encontrados');
      return;
    }
    
    console.log('✅ Formulário encontrado com sucesso!');
    
    // Preencher dados de login
    console.log('📝 Preenchendo dados de login...');
    emailInput.value = 'krekmg@gmail.com';
    passwordInput.value = 'Da123456';
    
    // Disparar eventos de input para validação
    emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    console.log('✅ Dados preenchidos:');
    console.log('- Email:', emailInput.value);
    console.log('- Senha:', passwordInput.value);
    
    // Aguardar um pouco
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar se o botão está habilitado
    if (submitButton.disabled) {
      console.warn('⚠️ Botão de submit está desabilitado');
    } else {
      console.log('✅ Botão de submit está habilitado');
    }
    
    // Clicar no botão de submit
    console.log('🔄 Enviando formulário...');
    submitButton.click();
    
    // Aguardar resposta
    console.log('⏳ Aguardando resposta...');
    
    // Monitorar mudanças na URL e erros
    let attempts = 0;
    const maxAttempts = 10;
    
    const checkResult = () => {
      attempts++;
      console.log(`📊 Verificação ${attempts}/${maxAttempts}:`);
      console.log('- URL atual:', window.location.href);
      console.log('- Título da página:', document.title);
      
      // Verificar se houve redirecionamento
      if (!window.location.href.includes('/auth/login')) {
        console.log('🎉 Redirecionamento detectado! Login pode ter sido bem-sucedido.');
        console.log('📍 Nova URL:', window.location.href);
        return;
      }
      
      // Verificar se há mensagens de erro
      const errorElements = document.querySelectorAll('[class*="destructive"], [class*="error"]');
      if (errorElements.length > 0) {
        console.log('❌ Erros encontrados na página:');
        errorElements.forEach((el, index) => {
          console.log(`  ${index + 1}.`, el.textContent);
        });
      }
      
      // Verificar se há toasts de notificação
      const toastElements = document.querySelectorAll('[data-sonner-toast]');
      if (toastElements.length > 0) {
        console.log('📢 Toasts encontrados:');
        toastElements.forEach((el, index) => {
          console.log(`  ${index + 1}.`, el.textContent);
        });
      }
      
      if (attempts < maxAttempts) {
        setTimeout(checkResult, 2000);
      } else {
        console.log('⏰ Tempo limite atingido. Verificação final:');
        console.log('- Status final:', window.location.href.includes('/auth/login') ? 'Ainda na página de login' : 'Redirecionado');
      }
    };
    
    setTimeout(checkResult, 2000);
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
  }
}

// Função para testar navegação após login
async function testNavigation() {
  console.log('🧭 Testando navegação pelas páginas...');
  
  const pages = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Documentos', url: '/documents' },
    { name: 'Relatório Técnico', url: '/reports/technical' },
    { name: 'Perfil', url: '/profile' },
    { name: 'Configurações', url: '/settings' }
  ];
  
  for (const page of pages) {
    try {
      console.log(`🔗 Testando acesso a: ${page.name} (${page.url})`);
      
      // Tentar navegar para a página
      window.location.href = page.url;
      
      // Aguardar carregamento
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log(`📄 ${page.name}:`);
      console.log('  - URL:', window.location.href);
      console.log('  - Título:', document.title);
      
      // Verificar se foi redirecionado para login
      if (window.location.href.includes('/auth/login')) {
        console.log(`  ❌ Acesso negado - redirecionado para login`);
      } else {
        console.log(`  ✅ Acesso permitido`);
      }
      
      // Voltar para o dashboard
      if (page.url !== '/dashboard') {
        window.location.href = '/dashboard';
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
    } catch (error) {
      console.error(`❌ Erro ao testar ${page.name}:`, error);
    }
  }
}

// Executar teste de login
console.log('🚀 Executando teste de login...');
testLogin();

// Executar teste de navegação após 30 segundos (tempo para login)
setTimeout(() => {
  console.log('🧭 Executando teste de navegação...');
  testNavigation();
}, 30000);

console.log('📋 Script de teste iniciado!');
console.log('⏰ O teste de navegação será executado em 30 segundos...');
console.log('💡 Monitore o console para ver os resultados em tempo real.');
