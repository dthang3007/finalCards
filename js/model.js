const model = {}
model.createCard = []
model.currentUser = {
    // email: "pdthang.cva@gmail.com",
    // displayName: "Pham Duc Thang",
    // photoUrl: "https://i.pinimg.com/originals/8e/34/e3/8e34e3e4a570228fecaf7ce3c81328f0.jpg",
    // collection: "",
    // card: "",

}
model.cardDelete=[]
model.collectionsUser = undefined
model.cardsUser = undefined
model.currentCollection = undefined
model.loadCollectionUser = async () => {
    model.collectionsUser=[]
    let collections = await firebase.firestore().collection('collections').where("owner", "==", model.currentUser.email).orderBy("createdAt", "desc").get()
    let data = utils.getDataFromDocs(collections.docs)
    model.collectionsUser = data
    console.log(data)
    model.currentUser.collection = model.collectionsUser.length
    view.showCollections()
    view.showInforUser(model.currentUser)
    model.createCard
}
model.loadCardsUser = async (id) => {
    model.cardsUser=[]
    let cards = await firebase.firestore().collection("cards").where("idCollection", '==', id).get()
    let infor = await firebase.firestore().collection("collections").doc(id).get()
    let data = utils.getDataFromDocs(cards.docs)
    let dataInfor = utils.getDataFromDoc(infor)
    model.currentCollection = dataInfor
    model.cardsUser = data
    view.showInforCollection(model.currentCollection, model.cardsUser.length)
    view.showCards()
    console.log(model.cardsUser.length)
    
}
model.createDataCollection = async (infor) => {
    console.log(infor)
    await firebase.firestore().collection("collections").add(infor)
    await model.createDataCard()
    view.setActiveScreen("collectionUserScreen")
}
model.createDataCard = async () => {
    let collections = await firebase.firestore().collection('collections').where("owner", "==", model.currentUser.email).orderBy("createdAt", "desc").get()
    let data = utils.getDataFromDocs(collections.docs)
    model.collectionsUser = data
    console.log(model.collectionsUser[0].id)
    console.log(model.collectionsUser[0])
    for (let oneCard of model.createCard) {
        let link
        link = await model.upload(oneCard.imageVocab)
        let sound
        sound = await model.upload(oneCard.sound)
        console.log(link)
        oneCard.imageVocab = link
        oneCard.sound = sound
        oneCard.idCollection = model.collectionsUser[0].id
        await firebase.firestore().collection("cards").add(oneCard)
    }
    model.createCard = []
}
model.createDataCardUpdate = async (id) => {
    for (let oneCard of model.createCard) {
        let link
        link = await model.upload(oneCard.imageVocab)
        let sound
        sound = await model.upload(oneCard.sound)
        oneCard.imageVocab = link
        oneCard.sound = sound
        oneCard.idCollection =id
        await firebase.firestore().collection("cards").add(oneCard)
    }
    model.createCard = []
}
model.upload = async (file) => {
    let fileName = file.name
    let filePath = `upload/${fileName}`
    let fileRef = firebase.storage().ref().child(filePath)
    await fileRef.put(file)
    let fileLink = model.getFileUrl(fileRef)
    return fileLink
}
model.getFileUrl = (fileRef) => {
    return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`
}
model.upImage = async (fileImage) => {
    let link
    if (fileImage) {
        link = await model.upload(fileImage)
        return link
    } else {
        link = ''
        return link
    }
}
model.loadCardToEdit = async (inforCollection) => {
    let cards = await firebase.firestore().collection("cards").where("idCollection", '==', inforCollection.id).get()
    let infor = await firebase.firestore().collection("collections").doc(inforCollection.id).get()
    let data = utils.getDataFromDocs(cards.docs)
    let dataInfor = utils.getDataFromDoc(infor)
    model.currentCollection = dataInfor
    model.cardsUser = data
    view.showCollectionToEdit(inforCollection)
    view.showCardsToEdit()
}
model.loadCardToQuizz=async (inforCollection) => {
    let cards = await firebase.firestore().collection("cards").where("idCollection", '==', inforCollection.id).get()
    let infor = await firebase.firestore().collection("collections").doc(inforCollection.id).get()
    let data = utils.getDataFromDocs(cards.docs)
    let dataInfor = utils.getDataFromDoc(infor)
    model.currentCollection = dataInfor
    model.cardsUser = data}
model.updateDataCard = async (infor,id) => { 
    if(infor.imageVocab){
        let link
        link = await model.upload(infor.imageVocab)
        infor.imageVocab=link
        console.log(infor.imageVocab)
    }
    if(infor.sound){
        let sound
        sound = await model.upload(infor.sound)
        infor.sound=sound
    }
    await firebase.firestore().collection('cards').doc(id).update(infor)

}
model.updateCollection=async(infor,id)=>{
    if(infor.imageCover){
        let link
        link = await model.upload(infor.imageCover)
        infor.imageCover=link
    }
    await firebase.firestore().collection('collections').doc(id).update(infor)
    await model.createDataCardUpdate(id)
    view.setActiveScreen("collectionUserScreen")
}
model.register = (firstName, lastName, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        firebase.auth().currentUser.sendEmailVerification();
        firebase.auth().currentUser.updateProfile({
            photoUrl: "https://i.pinimg.com/originals/8e/34/e3/8e34e3e4a570228fecaf7ce3c81328f0.jpg",
          displayName: firstName + " " + lastName,
        });
        alert('Register success, please check your email <(")');
        view.setActiveScreen("loginScreen");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  model.login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        if (user.user.emailVerified) {
        //   model.currentUser = {
        //     displayName: user.user.displayName,
        //     email: user.user.email,
        //   };
        //   view.setActiveScreen("collectionUserScreen");
        } else {
          alert("Please verify your email first");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  model.deleteCollection=async(id)=>{
    await firebase.firestore().collection('collections').doc(id).delete()
    let cards = await firebase.firestore().collection("cards").where("idCollection", '==', id).get()
    view.setActiveScreen("collectionUserScreen")
  }
  model.deleteCard=async(id)=>{
    await firebase.firestore().collection('cards').doc(id).delete()
  }
