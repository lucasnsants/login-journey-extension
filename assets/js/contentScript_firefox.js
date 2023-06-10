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
 * @returns {{LoginData}} 
 */
function selected(keys, onSuccess, onError) {
  browser.storage.local.get(keys)
    .then(onSuccess, onError);
}

/**
 * Método responsável pela automatização do login completa
 * @param {LoginData} data 
 */
function loginJourney(data) {
  const pathname = window.location.pathname.split('/')[1];
  switch(pathname) {
    case 'login.html':
      document.getElementById('email').value = data?.email;
      document.getElementById('password').value = data?.password;
      document.getElementById('rememberMe').checked = data?.rememberMe;
      document.getElementById('buttonLogin').click();
    default:
      break;
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  selected(['data'], ({ data }) => {
    console.log({ data });
    if (data?.email || data?.password) {
      console.error('Dados não inseridos para automatização da extensão');
      return;
    }
    loginJourney(data);
  }, () => {
    console.error('Erro ao consulta os dados');
  });
});