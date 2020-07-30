const view = {}
view.setActiveScreen = (screenName) => {
    switch (screenName) {
        case 'collectionUserScreen':
            document.getElementById('app').innerHTML = components.collectionUserScreen
            let clickNav = document.getElementById('nav-create')
            clickNav.addEventListener('click', () => {
                if (model.currentUser) {
                    view.setActiveScreen("createCardScreen")
                } else {
                    view.setActiveScreen("loginScreen")
                }
            })
            let btnHome = document.getElementById('home')
            btnHome.addEventListener('click', () => {
                    view.setActiveScreen("collectionUserScreen")
                }
            )
            let user=document.getElementById("user")
            user.innerText=model.currentUser.displayName

            //     document.getElementById("name-user").innerHTML = ` 
            //     <i class="fas fa-user"></i>                 
            //   <li class="dropdown">
            //     <div class="dropbtn">${model.currentUser.displayName}</div>
            //     <div class="dropdown-content">
            //       <button type="click" id="log-out">Log out</button>
            //       <button type="click" id="showCollectionOfUser">Collections</button>
            //     </div>
            //   </li>`
            document.getElementById('log-out').addEventListener('click', () => {
                firebase.auth().signOut()
                model.currentUser = ""

            })
            // document.getElementById("showCollectionOfUser").addEventListener('click', () => {
            //     view.setActiveScreen("collectionUserScreen")
            // })
            // document.getElementById("name-user").addEventListener("click", () => {
            //     view.setActiveScreen("loginScreen")
            // })
            model.loadCollectionUser()
            break
        case 'cardsUserScreen':
            document.getElementById('app').innerHTML = components.cardUserScreen

            break
        case 'createCardScreen':
            document.getElementById('app').innerHTML = components.createCards
            $("#collectionCard").change(function () {
                readURL(this, "imageCollectionCard");
            })
            let id = 0
            document.getElementById('button-add-card').addEventListener('click', () => {
                if (view.addFormAddCard(id)) {
                    id++
                }
                console.log(id)
            })
            document.getElementById("firebase-add").addEventListener('submit', (e) => {
                e.preventDefault()
                controller.check()
            })
            break
        case 'editCardsScreen':
            document.getElementById('app').innerHTML = components.editCardsScreen
            let id1 = 0
            document.getElementById('button-add-card-edit').addEventListener('click', () => {
                if (view.addFormAddCard(id1)) {
                    id1++
                }
                console.log(id1)
            })
            break
        case "mainScreen":
            document.getElementById("app").innerHTML = components.mainScreen;
            view.showCurrentUserName();

            break;
        case "homeScreen":
            document.getElementById("app").innerHTML = components.homeScreen
            break;
        case "loginScreen":
            document.getElementById("app").innerHTML = components.loginScreen;
            const loginForm = document.getElementById("form-login");
            const loginBtn = document.getElementById("redirect-to-register");
            const homeBtn = document.getElementById("redirect-to-home");
            // homeBtn.addEventListener("click", function () {
            //     view.setActiveScreen("homeScreen")
            // });
            loginBtn.addEventListener("click", function () {
                view.setActiveScreen("registerScreen");
            });
            loginForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const loginInfo = {
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                };
                controller.login(loginInfo);
            });

            break;
        case "registerScreen":
            document.getElementById("app").innerHTML = components.registerScreen;
            const registerForm = document.getElementById("register-form");
            const btn = document.getElementById("redirect-to-login");
            btn.addEventListener("click", function () {
                view.setActiveScreen("loginScreen");
            });
            // homeBtn.addEventListener("click", function () {
            //   view.setActiveScreen("homeScreen")
            // });
            registerForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const registerInfo = {
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmPassword: registerForm.confirmPassword.value,
                };
                controller.register(registerInfo);
            });
            break;
        case "loading":
            document.getElementById("app").innerHTML=components.loading    
            break
        case "quizzScreen":
            document.getElementById("app").innerHTML = components.quizzScreen;
            const startButton = document.getElementById('start-btn')
            const nextButton = document.getElementById('next-btn')
            const questionContainerElement = document.getElementById('question-container')
            const questionElement = document.getElementById('question')
            const answerButtonsElement = document.getElementById('answer-buttons')

            let questions = [
            ]
            for (let i = 0; i < model.cardsUser.length; i++) {
                console.log(model.cardsUser)
                let temp = []
                let questionTemp = model.cardsUser[i].imageVocab
                let answer = {
                    text: model.cardsUser[i].vocab,
                    correct: true
                }
                temp.push(answer)
                let arrayNumber = []
                for (let j = 0; j < model.cardsUser.length; j++) {
                    arrayNumber.push(j)
                }
                while (temp.length !== 4) {
                    let x = arrayNumber[Math.floor(Math.random() * arrayNumber.length)];
                    console.log(x)
                    if (model.cardsUser[i].id != model.cardsUser[x].id) {
                        temp2 = {
                            text: model.cardsUser[x].vocab,
                            correct: false
                        }
                        temp.push(temp2)
                        arrayNumber.splice(arrayNumber.indexOf(x), 1);
                    }
                    console.log(arrayNumber)
                }
                console.log(temp)
                let temp3 = {
                    question: questionTemp,
                    answers: shuffle(temp)
                }
                questions.push(temp3)
            }
            let shuffledQuestions, currentQuestionIndex
            console.dir(startButton)
            startButton.addEventListener('click', startGame)
            nextButton.addEventListener('click', () => {
                currentQuestionIndex++
                setNextQuestion()
            })

            function startGame() {
                startButton.classList.add('hide')
                shuffledQuestions = questions.sort(() => Math.random() - .5)
                currentQuestionIndex = 0
                questionContainerElement.classList.remove('hide')
                setNextQuestion()
            }

            function setNextQuestion() {
                resetState()
                showQuestion(shuffledQuestions[currentQuestionIndex])
            }

            function showQuestion(question) {
                questionElement.innerHTML = `<img src="${question.question}" alt="" srcset="">`
                question.answers.forEach(answer => {
                    const button = document.createElement('button')
                    button.innerText = answer.text
                    button.classList.add('btn')
                    if (answer.correct) {
                        button.dataset.correct = answer.correct
                    }
                    button.addEventListener('click', selectAnswer)
                    answerButtonsElement.appendChild(button)
                })
            }

            function resetState() {
                clearStatusClass(document.body)
                nextButton.classList.add('hide')
                while (answerButtonsElement.firstChild) {
                    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
                }
            }

            function selectAnswer(e) {
                const selectedButton = e.target
                const correct = selectedButton.dataset.correct
                setStatusClass(document.body, correct)
                Array.from(answerButtonsElement.children).forEach(button => {
                    setStatusClass(button, button.dataset.correct)
                })
                if (shuffledQuestions.length > currentQuestionIndex + 1) {
                    nextButton.classList.remove('hide')
                } else {
                    startButton.innerText = 'Restart'
                    startButton.classList.remove('hide')
                }
            }

            function setStatusClass(element, correct) {
                clearStatusClass(element)
                if (correct) {
                    element.classList.add('correct')
                } else {
                    element.classList.add('wrong')
                }
            }

            function clearStatusClass(element) {
                element.classList.remove('correct')
                element.classList.remove('wrong')
            }
            break

    }
}
view.setErrorMessage = (elementId, message) => {
    document.getElementById(elementId).innerText = message;
};

view.addCollectionUser = (collection) => {
    document.querySelector('.list-collections-card').innerHTML=" "
    const collectionWrapper = document.createElement('div')
    collectionWrapper.classList.add("gallery")
    collectionWrapper.id = collection.id
    collectionWrapper.innerHTML = ` 
    <div class="card">
      <div class="background" style="background: url(${collection.imageCover} ) center center;background-size:cover;height:320px">
      </div>
      <a href="#" class="overlay">
      </a>
      <a class="thumb" href="#">
        <div class="info">
          <div class="foot">
            <i class="line"></i>
            <span class="date">${collection.collectionName}</span>
          </div>
        </div>
      </a>
    </div>
 ` 
    const listCollection = document.querySelector('.list-collections-card')
    listCollection.appendChild(collectionWrapper)
    collectionWrapper.addEventListener("click", () => {
        view.setActiveScreen("cardsUserScreen")
        model.loadCardsUser(collection.id)

    })
}
view.showCollections = () => {
    for (let oneCollection of model.collectionsUser) {
        view.addCollectionUser(oneCollection)

    }
}
view.addCardUser = (card) => {
    const cardWrapper = document.createElement('div')
    cardWrapper.classList.add('card')
    cardWrapper.innerHTML = `
    <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${card.imageVocab}"  style="width:300px;height:300px;border-radius:50px 50px 0px 0px">
      </div>
      <div class="flip-card-back">
          <div class="listNotes" id=${card.id}>
              <h3 class="meaning">Meaning:<p>- ${card.meaning}</p></h3>
              <h3 class="same-meaning">Same meaning: ${card.sameMeaning}</h3>
              <h3>Example: </h3>
              <p>${card.example} </p>
          </div>
      </div>
    </div>
  </div>

              <p class="vocab" style="font-size: 55px;text-align:center">${card.vocab}</p>
              <div class=main-pronun>
              <button id="btn${card.id}"><i class="fas fa-volume-up"></i></button>
              <div class="pronun" style="font-size: 30px;">${card.pronunciation}</div>
              </div>`

    const listCard = document.querySelector('.main-add-card')
    listCard.appendChild(cardWrapper)
    document.getElementById(`btn${card.id}`).addEventListener("click", () => {
        let file = `${card.sound}`
        play(file)
    })
}
view.showCards = () => {
    for (let oneCard of model.cardsUser) {
        view.addCardUser(oneCard)
        // view.showNotes(oneCard)
    }
}
view.addNote = (note, id) => {
    const noteWrapper = document.createElement('p')
    noteWrapper.classList.add('notes')
    noteWrapper.innerText = `${note}`
    const listNotes = document.getElementById(`${id}`)
    listNotes.appendChild(noteWrapper)
}
view.showNotes = (note) => {
    for (let oneNote of note.notes) {
        view.addNote(oneNote, note.id)
    }
}
view.showInforCollection = (infor, number) => {
    const inforCollection = document.querySelector('.infor-collection-card')
    if (model.currentUser.email == infor.owner) {
        inforCollection.innerHTML = `    
        <div class="image-collection-cover">
        <img src="${infor.imageCover}" alt="">
        </div>
        <p>Chủ đề: ${infor.collectionName}</p>
        <p>Số thẻ:${number} </p>
        <p>Của: ${infor.owner}</p>
        <button id="btnToQuizz" >Hoc bo the nay</button>
        <button id="btnToEdit" >Chinh sua bo the</button>
        <button id="btnToDelete" >Xoa bo the</button>`
    } else {
        inforCollection.innerHTML = `    
        <div class="image-collection-cover">
        <img src="${infor.imageCover}" alt="">
        </div>
        <p>Chủ đề: ${infor.collectionName}</p>
        <p>Số thẻ:${number} </p>
        <p>Của: ${infor.owner}</p>
        <button id="btnToQuizz">Hoc bo the nay</button>`
    }
    document.getElementById("btnToEdit").addEventListener("click", () => {
        view.setActiveScreen("editCardsScreen")
        model.loadCardToEdit(infor)
    })
    document.getElementById("btnToDelete").addEventListener("click", () => {
        console.log(infor.id)
        model.deleteCollection(infor.id)
    })
    document.getElementById("btnToQuizz").addEventListener("click", () => {
        view.setActiveScreen("quizzScreen")
        model.loadCardToQuizz(infor)
    })
}
view.showInforUser = (user) => {
    const inforUser = document.getElementById('inforUser')
    inforUser.innerHTML = `
    <div class="ava-user">
    <img src="${user.photoUrl}" alt="">
    </div>
    <div class="infor-user">
    <p>Name: ${user.displayName}</p>
    <p>Bo the: ${user.collection}</p>
    </div>`
}
view.addFormAddCard = (id) => {
    if (id == 0) {
        let formAdd = document.createElement('form')
        formAdd.id = `formCard${id}`
        formAdd.innerHTML = `<div class="card">
    <div class="font-card">
        <div class="image-card">
            <input type="file" name="imageCard" id="inputImageCard${id}">
            <img src="../image/tải xuống.png" alt="" id="imageCard${id}">
            <div class="error" id='imageCollectionError${id}'></div>
        </div>
        <div class="main-vocab">
            <div class="input-vocab">
                <input type="text" name="vocab" placeholder="Add vocab">
                <div class="error" id='vocabError${id}'></div>
            </div>
            <div class="pronuncitaion">
                <div class="sound">
                    <input type="file" name="sound">
                    <i class="fas fa-volume-up"></i>
                    <div class="error" id='soundError${id}'></div>
                </div>
                <div class="input-wrapper">
                    <input type="text" name="pronun" placeholder="Add pronun">
                    <div class="error" id="pronunError${id}"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="back-card">
        <div class="input-wrapper">
            <input type="text" name="meaning" placeholder="Meaning">
            <div class="error" id='meaningError${id}'></div>
        </div>
        <div class="input-wrapper">
            <input type="text" name="samemeaning" placeholder="Same meaning">
            <div class="error" id='sameMeaningError${id}'></div>
        </div>
        <div class="Example" >
            <h3 style="padding-left: 20px ;">Example</h3>
            <input type="text" name="example" placeholder="Add Example">
            <div class="error" id='exampleError${id}'></div>
        </div>        

    </div>
</div>`
        document.querySelector('.card-wrapper').appendChild(formAdd)
        $(`#inputImageCard${id}`).change(function () {
            readURL(this, `imageCard${id}`);
        })
        return id + 1
    } else {
        let formAdd = document.createElement('form')
        formAdd.id = `formCard${id}`
        formAdd.innerHTML = `<div class="card">
    <div class="font-card">
        <div class="image-card">
            <input type="file" name="imageCard" id="inputImageCard${id}">
            <img src="../image/tải xuống.png" alt="" id="imageCard${id}">
            <div class="error" id='imageCollectionError${id}'></div>
        </div>
        <div class="main-vocab">
            <div class="input-vocab">
                <input type="text" name="vocab" placeholder="Add vocab">
                <div class="error" id='vocabError${id}'></div>
            </div>
            <div class="pronuncitaion">
                <div class="sound">
                    <input type="file" name="sound">
                    <i class="fas fa-volume-up"></i>
                    <div class="error" id='soundError${id}'></div>
                </div>
                <div class="input-wrapper">
                    <input type="text" name="pronun" placeholder="Add pronun">
                    <div class="error" id="pronunError${id}"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="back-card">
        <div class="input-wrapper">
            <input type="text" name="meaning" placeholder="Meaning">
            <div class="error" id='meaningError${id}'></div>
        </div>
        <div class="input-wrapper">
            <input type="text" name="samemeaning" placeholder="Same meaning">
            <div class="error" id='sameMeaningError${id}'></div>
        </div>
        <div class="Example" >
            <h3 style="padding-left: 20px ;">Example</h3>
            <input type="text" name="example" placeholder="Add Example">
            <div class="error" id='exampleError${id}'></div>
        </div>        
    </div>
</div>`

        let card = document.getElementById(`formCard${id - 1}`)
        let filesImage = card.imageCard.files
        let fileImage = filesImage[0]
        let filesSound = card.sound.files
        let fileSound = filesSound[0]
        let inforCard = {
            imageVocab: fileImage,
            vocab: card.vocab.value,
            sound: fileSound,
            pronunciation: card.pronun.value,
            meaning: card.meaning.value,
            sameMeaning: card.samemeaning.value,
            idCollection: " ",
            example: card.example.value,
            createdAt: new Date(),
        }
        if (controller.checkCard(inforCard, (id - 1))) {

            document.querySelector('.card-wrapper').appendChild(formAdd)
            $(`#inputImageCard${id}`).change(function () {
                readURL(this, `imageCard${id}`);
            })
            model.createCard.push(inforCard)
            console.log(model.createCard)
            console.log(inforCard.imageVocab)

            return true
        } else {
            return false
        }
    }
}
view.addCardEdit = (card) => {

    let formEdit = document.createElement('form')
    formEdit.id = `formEdit${card.id}`
    formEdit.innerHTML = `
    <div class="card">
    <div class="font-card">
        <div class="image-card">
            <input type="file" name="imageCard" id="inputImageCardEdit${card.id}">
            <img src="${card.imageVocab}" alt="" id="imageCardEdit${card.id}">
            <div class="error" id='imageCollectionErrorEdit'></div>
        </div>
        <div class="main-vocab">
            <div class="input-vocab">
                <input type="text" name="vocab" placeholder="Add vocab" value="${card.vocab}">
                <div class="error" id='vocabErrorEdit'></div>
            </div>
            <div class="pronuncitaion">
                <div class="sound">
                    <input type="file" name="sound">
                    <i class="fas fa-volume-up"></i>
                    <div class="error" id='soundErrorEdit'></div>
                </div>
                <div class="input-wrapper">
                    <input type="text" name="pronun" placeholder="Add pronun" value="${card.pronunciation}" >
                    <div class="error" id="pronunErrorEdit"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="back-card">
        <div class="input-wrapper">
            <input type="text" name="meaning" placeholder="Meaning" value="${card.meaning}">
            <div class="error" id='meaningErrorEdit'></div>
        </div>
        <div class="input-wrapper">
            <input type="text" name="samemeaning" placeholder="Same meaning" value="${card.sameMeaning}">
            <div class="error" id='sameMeaningErrorEdit'></div>
        </div>
        <div class="Example">
            <h3 style="padding-left: 20px ;">Example</h3>
            <input type="text" name="example" placeholder="Add Example" value="${card.example}">
            
            <div class="error" id='exampleErrorEdit'></div>
        </div>
    </div>
    <button id="btnEdit${card.id}" type="submit" > <i class="far fa-check-circle"></i></button>
    <button id="btnDelete${card.id}" type="submit" > <i class="far fa-times-circle"></i></button>
</div>`
    const listCardToEdit = document.querySelector('.edit-card-screen .edit-card-main .main-edit-card .card-wrapper')
    listCardToEdit.appendChild(formEdit)
    $(`#inputImageCardEdit${card.id}`).change(function () {
        readURL(this, `imageCardEdit${card.id}`);
    })
    document.getElementById(`btnDelete${card.id}`).addEventListener('click', () => {
        document.getElementById(`formEdit${card.id}`).innerHTML = ''
        model.deleteCard(card.id)
    })
    document.getElementById(`formEdit${card.id}`).addEventListener('submit', (e) => {
        e.preventDefault()
        let cardUpdate = document.getElementById(`formEdit${card.id}`)
        let filesImage = cardUpdate.imageCard.files
        let fileImage = filesImage[0]
        console.log(fileImage)
        let filesSound = cardUpdate.sound.files
        let fileSound = filesSound[0]
        const dataEdit = {
            vocab: cardUpdate.vocab.value,
            pronunciation: cardUpdate.pronun.value,
            meaning: cardUpdate.meaning.value,
            sameMeaning: cardUpdate.samemeaning.value,
            example: cardUpdate.example.value
        }
        if (fileImage) {
            dataEdit.imageVocab = fileImage
        }
        if (fileSound) {
            dataEdit.sound = fileSound
        }
        model.updateDataCard(dataEdit, card.id)
    })
}
view.showCardsToEdit = () => {
    for (oneCard of model.cardsUser) {
        view.addCardEdit(oneCard)
    }
}
view.showCollectionToEdit = (infor) => {
    let formCollectionEdit = document.getElementById("inforCollectionEdit")
    formCollectionEdit.innerHTML = `
        <form id="collectionUpdate${infor.id}" runat="server">
            <div class="eidt-collection-card">
                <div class="image-colection">
                    <input type="file" name="imageCollectionEdit" id="collectionCardEdit">
                    <img src="${infor.imageCover}" id="imageCollectionCardEdit" alt="">
                    <div class='error' id="errorImageCollectionEdit"></div>
                </div>
                <div class="input-wrapper">
                    <input type="text" placeholder="Content" name='content' value="${infor.collectionName}">
                    <div class="error" id="errorContentEdit${infor.id}"></div>
                </div>
                <button class="btn-create" id="button-submit-collection-edit" type="submit"><i
                        class="fas fa-check" style="color: white;"></i></button>
                <div class="error" id="errorAmountCardEdit"></div>
            </div>
        </form>`
    document.getElementById(`collectionUpdate${infor.id}`).addEventListener('submit', (e) => {
        e.preventDefault()
        let collection = document.getElementById(`collectionUpdate${infor.id}`)
        let files = collection.imageCollectionEdit.files
        let file = files[0]
        let inforUpdate = {
            collectionName: collection.content.value,
        }
        if (file) {
            inforUpdate.imageCover = file
        }
        model.updateCollection(inforUpdate, infor.id)

        // view.setActiveScreen("collectionUserScreen")
    })
}

view.showCurrentUserName = () => {
    document.getElementById(
        ".current-user"
    ).innerHTML = `<i class="fas fa-user-circle"></i>${model.currentUser.displayName}`;
};
//sourcetreeeeeeeeeeeeeeeeeeeeeeee
//sourcetreeeeeeeeeeeeeeeeeeeeeeee
//sourcetreeeeeeeeeeeeeeeeeeeeeeee