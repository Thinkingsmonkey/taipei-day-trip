function getUserInput(method) {
  return method === "signin"
    ? {
        email: nameInputs[1].value,
        password: nameInputs[2].value,
      }
    : {
        name: nameInputs[0].value,
        email: nameInputs[1].value,
        password: nameInputs[2].value,
      };
}
