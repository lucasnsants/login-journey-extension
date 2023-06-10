const enableJourney = document.getElementById("enableJourney");
const email = document.getElementById("email");
const password = document.getElementById("password");
const save = document.getElementById("save");

/**
 * @typedef {Object} LoginData
 * @property {boolean} enableJourney - Informa se automatização está ativa
 * @property {string} email - E-mail do usuário
 * @property {string} password - Password do usuário
 */

/** Salva ou atualiza os dados responsáveis usados na
 * jornada de login
 * @param {LoginData} data
 * @param {Function} onSuccess - Função para ser resolvida com sucesso da promise
 * @param {Function} onError - Função para ser resolvida com erro da promise
 * @returns void
 */
function insertedAndUpdated(data, onSuccess, onError) {
  browser.storage.local.set({ data })
    .then(onSuccess, onError);
}

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

function initialize() {
  selected(['data'], ({ data }) => {
    enableJourney.checked = data.enableJourney;
    email.value = data.email;
    password.value = data.password;
  }, (error) => {
    console.error(error);
  });
}

window.addEventListener('load', () => {
  initialize();
});

save.addEventListener("click", () => {
  if (!email.value || !password.value) {
    alert("Dados em brancos!");
    return;
  }

  insertedAndUpdated({
    enableJourney: enableJourney.checked,
    email: email.value,
    password: password.value
  }, () => {
    alert("Informações salvas!");
  }, () => {
    alert("Error ao salvar as informações");
  });

  initialize();
});
