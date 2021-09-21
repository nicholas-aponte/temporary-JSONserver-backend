function getUser(phoneNumber) {
  const url = `http://localhost:3000/users/${phoneNumber}`;
  fetch(url)
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(function (data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      // { "userId": 1, "id": 1, "title": "...", "body": "..." }
      localStorage.setItem("userData", JSON.stringify(data));
      if (Object.keys(data).length === 0) {
        console.log("empty object");
        localStorage.setItem("userCompanies", JSON.stringify([]));
        localStorage.setItem("addedDocuments", JSON.stringify({}));
      } else {
        setExistingPhone(true);
        console.log("in else");
        localStorage.setItem(
          "userCompanies",
          JSON.stringify(data.userCompanies)
        );
        localStorage.setItem(
          "addedDocuments",
          JSON.stringify(data.addedDocuments)
        );
        history.push("/documents");
      }
    });
}
function postNewUser(phoneNumber, values) {
  console.log(values);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: phoneNumber.phone,
      firstName: values.firstname,
      lastName: values.lastname,
      dob: values.dob,
      userDocuments: [],
      addedDocuments: {
        "Driver TLC": false,
        "Vehicle TLC": false,
        "NY Drivers License": false,
        "NJ Drivers License": false,
        "Vehicle Insurance": false,
      },
      userCompanies: [appState.userCompanies[0]],
    }),
  };

  fetch("http://localhost:3000/users/", requestOptions).then((response) =>
    console.log(response.json())
  );
}
