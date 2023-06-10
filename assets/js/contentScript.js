/**
 * @typedef {Object} LoginData
 * @property {boolean} enableJourney - Informa se automatização está ativa
 * @property {string} email - E-mail do usuário
 * @property {string} password - Password do usuário
 */

/**
 * Método responsável por recuperar uma ou mais informações
 * salvas no localStorage
 * @param {string[]} keys - Chaves para pesquisas no localStorage
 * @param {Function} onSuccess - Função para ser resolvida com sucesso da promise
 * @param {Function} onError - Função para ser resolvida com erro da promise
 * @returns {LoginData} 
 */
function selected(keys, onSuccess, onError) {
  chrome.storage.local.get(keys)
    .then(onSuccess, onError);
}

/**
 * Método responsável pela automatização do login completa
 * @param {LoginData} data 
 */
function loginJourney(data) {
  const pathname = window.location.pathname.split('/')[2];
  switch(pathname) {
    case 'login.html':
      document.getElementById('email').value = data?.email;
      document.getElementById('password').value = data?.password;
      document.getElementById('rememberMe').checked = data?.rememberMe;
      document.getElementById('buttonLogin').click();
      break;
    case 'security.html':
      const numberRandom = document.getElementById('randomNumber').textContent.split(':')[1].trim();
      document.getElementById('codeSecurity').value = parseInt(numberRandom);
      document.getElementById('buttonSecurity').click();
      break;
    default:
      const alerts = document.getElementsByClassName('alert alert-danger');
      if (alerts.length > 0 && alerts[0]?.textContent.search(/refaça.+?login/)) {
        setTimeout(() => {
          window.location.href = '/login-journey/login.html';
        }, 5000);
      }
      break;
  }
}

window.addEventListener('load', (event) => {
  selected(['data'], ({ data }) => {
    if (!data?.email || !data?.password) {
      console.error('Dados não inseridos para automatização da extensão');
      return;
    }
    loginJourney(data);
  }, () => {
    console.error('Erro ao consulta os dados');
  });
});