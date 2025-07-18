
export function createInput(type, name, placeholder) {
  const inputElement = document.createElement("input");
  inputElement.type = type;
  inputElement.name = name;
  inputElement.placeholder = placeholder;
  inputElement.required = true;
  return inputElement;
}

export function createLabel(forAttribute, textContent) {
  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", forAttribute);
  labelElement.textContent = textContent;
  return labelElement;
}

export function createSelect(name, optionsArray) {
  const selectElement = document.createElement("select");
  selectElement.name = name;
  selectElement.required = true;

  optionsArray.forEach(function(optionValue) {
    const optionElement = document.createElement("option");
    optionElement.value = optionValue;
    optionElement.textContent = optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
    selectElement.appendChild(optionElement);
  });

  return selectElement;
}

export function createButton(text, onClickFunction) {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = text;
  buttonElement.type = "submit";
  if (onClickFunction) {
    buttonElement.addEventListener("click", onClickFunction);
  }
  return buttonElement;
}

export function renderRegistrationForm(onSubmitCallback) {
  const formElement = document.createElement("form");

  const usernameLabel = createLabel("username", "Nom d'utilisateur");
  const usernameInput = createInput("text", "username", "Entrez votre nom d'utilisateur");

  const passwordLabel = createLabel("password", "Mot de passe");
  const passwordInput = createInput("password", "password", "Entrez votre mot de passe");

  const roleLabel = createLabel("role", "Rôle");
  const roleSelect = createSelect("role", ["admin", "author"]);

  const submitButton = createButton("S’inscrire");

  formElement.appendChild(usernameLabel);
  formElement.appendChild(usernameInput);
  formElement.appendChild(passwordLabel);
  formElement.appendChild(passwordInput);
  formElement.appendChild(roleLabel);
  formElement.appendChild(roleSelect);
  formElement.appendChild(submitButton);

  formElement.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
      username: usernameInput.value.trim(),
      password: passwordInput.value,
      role: roleSelect.value
    };

    onSubmitCallback(formData);
  });

  const appDiv = document.getElementById("app");
  appDiv.innerHTML = "";
  appDiv.appendChild(formElement);
}
