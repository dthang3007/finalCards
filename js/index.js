window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          model.currentUser = {
            displayName: user.displayName,
            email: user.email,
            photoUrl: "https://i.pinimg.com/originals/8e/34/e3/8e34e3e4a570228fecaf7ce3c81328f0.jpg"
          };
          
          view.setActiveScreen("collectionUserScreen");
          console.log(model.currentUser.email)
        }
      } else {
        view.setActiveScreen("loginScreen");
      }
    });
  };
  
