window.onload = () => {   
   firebase.auth().onAuthStateChanged(function (user) {
  if (user && user.emailVerified) {
      
      model.currentUser = {
          displayName: user.displayName,
          email: user.email,
          photoUrl: "https://i.pinimg.com/originals/8e/34/e3/8e34e3e4a570228fecaf7ce3c81328f0.jpg"
      };
      console.log(user.email)
      view.setActiveScreen('collectionUserScreen')
  } else {

      view.setActiveScreen('loginScreen')
  }})}
  
