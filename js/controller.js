const controller = {}

controller.setIdText = (id, text) => {
    document.getElementById(id).innerText = text;
}
controller.validateInfor = (idError, infor) => {

    for (let i = 0; i < infor.length; i += 2) {
        let condition = infor[i];
        let meassage = infor[i + 1];
        if (!condition) {
            controller.setIdText(idError, meassage);
            return false;
        }
    }
    controller.setIdText(idError, " ");
    return true;
}
controller.check = async () => {
    let collection = document.getElementById('firebase-add')
    let files = collection.imageCollection.files
    let file = files[0]
    let link
    if (file) {
        link = await model.upload(file)
    } else { link = '' }


    let inforCollection = {
        imageCover: link,
        collectionName: collection.content.value,
        owner: model.currentUser.email,
        createdAt: new Date()
    }
    let validateResults = [
        controller.validateInfor(`errorImageCollection`, [inforCollection.imageCover, "Please input image"]),
        controller.validateInfor(`errorContent`, [inforCollection.collectionName, "Please input content"])]

    if (controller.allPassed(validateResults)) {
        if (model.createCard.length >= 4) {
            controller.validateInfor(`errorAmountCard`, [model.createCard.length >= 4, "Card at least 4"])
            await model.createDataCollection(inforCollection)
            return true
        }
        else {
            controller.validateInfor(`errorAmountCard`, [model.createCard.length >= 4, "Card at least 4"])
            return false
        }
    }

    return false
}
controller.checkCard = (infor, id) => {
    let validateResults = [
        controller.validateInfor(`imageCollectionError${id}`, [infor.imageVocab, "Please input image"]),
        controller.validateInfor(`vocabError${id}`, [infor.vocab, "Please input Vocab"]),
        controller.validateInfor(`soundError${id}`, [infor.sound, "Please input sound"]),
        controller.validateInfor(`pronunError${id}`, [infor.pronunciation, "Please input pronun"]),
        controller.validateInfor(`meaningError${id}`, [infor.meaning, "Please input meaning"]),
        controller.validateInfor(`exampleError${id}`, [infor.example, "Please input example"])
    ]
    if (controller.allPassed(validateResults)) {
        return true
    }
    return false

}
controller.allPassed = (vailidateResults) => {
    for (let result of vailidateResults) {
        if (!result) {
            return false
        }
    }
    return true
}
controller.validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  controller.register = (registerInfo) => {
    view.setErrorMessage(
      "error-first-name",
      registerInfo.firstName === "" ? "Please input first name" : ""
    );
    view.setErrorMessage(
      "error-last-name",
      registerInfo.lastName === "" ? "Please input last name" : ""
    );
    if (registerInfo.email === "") {
      view.setErrorMessage("error-email", "Please input email ");
    } else if (controller.validateEmail(registerInfo.email) === false) {
      view.setErrorMessage("error-email", "Please type the right email format");
    } else {
      view.setErrorMessage("error-email", "");
    }
    view.setErrorMessage(
      "error-password",
      registerInfo.password === "" ? "Please input password " : ""
    );
    if (registerInfo.confirmPassword === "") {
      view.setErrorMessage(
        "error-confirm-password",
        "Please input confirm password"
      );
      return;
    } else if (registerInfo.confirmPassword !== registerInfo.password) {
      view.setErrorMessage("error-confirm-password", "Password does not match");
      return;
    } else {
      view.setErrorMessage("error-confirm-password", "");
    }
  
    if (
      registerInfo.firstName !== "" &&
      registerInfo.lastName !== "" &&
      registerInfo.email !== "" &&
      registerInfo.password !== ""
    ) {
      model.register(
        registerInfo.firstName,
        registerInfo.lastName,
        registerInfo.email,
        registerInfo.password
      );
    }
  };
  
  controller.login = (loginInfo) => {
    view.setErrorMessage(
      "error-email",
      loginInfo.email === "" ? "Please input email" : ""
    );
    view.setErrorMessage(
      "error-password",
      loginInfo.password === "" ? "Please input password" : ""
    );
    if (loginInfo.email === "") {
      view.setErrorMessage("error-email", "Please input email ");
    } else if (controller.validateEmail(loginInfo.email) === false) {
      view.setErrorMessage("error-email", "Please type the right email format");
    } else {
      view.setErrorMessage("error-email", "");
    }
    if (loginInfo.email !== "" && loginInfo.password !== "") {
      model.login(loginInfo.email, loginInfo.password);
    }
  };
