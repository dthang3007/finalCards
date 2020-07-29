const components={}
components.collectionUserScreen=`
<div class="add-collection-card">
        <div class="create-collection-container">
            <div class="user-container" id="inforUser">
            </div>
            <div class="main-collection-card">
                <div class="title">
                    <h3 style="font-size:40px">Danh sách chủ đề</h3>
                    <h4>Bạn nên tạo các bộ thẻ từ mới theo chủ đề sẽ giúp bạn ghi nhớ lâu hơn</h4>
                </div>
                <div class="list-collections-card">
                        
                    </div>
                </div>
            
            </div>
        </div>
    </div>
`
components.cardUserScreen=`<div class="add-card">
<div class="create-card">
    <div class="infor-collection-card">
    </div>
    <div class="main-add-card">
        
    </div>

</div>
</div>  `
components.createCards=`    <div class="create-card-screen">
<div class="main-create">
        <form id="firebase-add" runat="server">
            <div class=create-collection-card>
                <div class="image-colection">
                    <input type="file" name="imageCollection" id="collectionCard">
                    <img src="../image/tải xuống.png" id="imageCollectionCard" alt="">
                    <div class='error' id="errorImageCollection"></div>
                </div>
                <div class="input-wrapper">
                    <input type="text" placeholder="Content" name='content'>
                    <div class="error" id="errorContent"></div>
                </div>
                <button class="btn-create" id="button-submit-collection" type="submit"><i class="fas fa-check" style="color: white;"></i></button>
                <div class="error" id="errorAmountCard"></div>
            </div>
        </form>    
            <div class="create-card-main">
                <div class="card-wrapper">
                </div>
                    <button class="btn-add-card" id="button-add-card" type="button"><i class="fas fa-plus-circle"></i></button>
                </div>
</div>
`
components.editCardsScreen=`    <div class="edit-card-screen">
<div class="edit-card-main">
    <div class="infor-collection-card-edit" id="inforCollectionEdit">

    </div>
    <div class="main-edit-card">
        <div class="card-wrapper">
            
        </div>
        <button class="btn-add-card" id="button-add-card-edit" type="button"><i
                class="fas fa-plus-circle"></i></button>
    </div>
</div>
</div> 
`
components.homeScreen = `
<div class="about-container">
        <div class="header">
          <a style="text-decoration: none;" href="homepage.html"
            ><h1 class="h1-header">
              <img
                class="img-header"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSb5ELyb-DQy9uXAO9dd2b1SjKOzHneGmTQY_Q4PVWIJUmSoYFc&usqp=CAU"
                alt=""
              />E-Card
            </h1></a
          >
          <div  id="nav-bar"style="position: absolute; right: 5%;">
            <a class="a-header" href="">Introduce</a>
            <a class="a-header" href="">Tutorial</a>
            <a class="a-header" href="">Login</a>
            <a class="signup" href="">Sign up</a>
          </div>
        </div>
        <div class="present">
          <h2 style="text-align: center; padding-top: 5%;">Introduce</h2>
          <div style="width: 90%; margin: auto;">
            <p class="text-word">
              As its name implies, E-Cards is a fun flashcard website that helps
              you memorize anything for free, forever. Our bite-sized lessons
              are the best way to master anything from the Spanish language to
              the Periodic Table. E-cards understands how you learn and reminds
              you when your memory is about to fade, so you’ll never forget a
              thing.
            </p>
            <p class="text-word">
              Feel free to discuss flashcards in the talk page of articles, to
              add new cards, or to work on pending cards. We also encourage you
              to contribute to other articles by visiting the list of "articles
              with flashcards".
            </p>
            <p style="font-size: 18px; text-align: center;">
              Read more about
              <a
                style="text-decoration: none; color: red;"
                href="Term of service.html"
                >Term Of Service</a
              >
              and
              <a style="text-decoration: none; color: red;" href=""
                >Privacy Policy</a
              >.
            </p>
            <br />
          </div>
        </div>
      </div>
`
components.mainScreen = `
<div class="add-collection-card">
    
</div>
`;
components.loginScreen = `
<div class="login">
    
  <div class="form-container">
    
    <form id="form-login">
    <div class="title">Sign in</div>
    <div class="input-wrapper">
    <label>Email</label>
    <input type="text" name="email" placeholder="Email">
    <div class="error" id="error-email"></div>
</div>
<div class="input-wrapper">
    <label>Password</label>
    <input type="password" name="password" placeholder="Password">
    <div class="error" id="error-password"></div>
</div>
<div class="submit-wrapper">
    <div>Don't have an account ? <span class="cursor-pointer"id="redirect-to-register">Register</span></div>
    <button class = "btn"type='submit'>Sign in</button>
</div>
    </form>
  </div>
</div>
</div>

`
components.registerScreen = `
<div class="register"> 

<div class="form-container">
<form id="register-form">
  <div class="title">Register</div>
  <div class="name-wrapper">
      <div class="input-wrapper">
          <input type="text" name="firstName" placeholder="First Name...">
          <div class="error" id="error-first-name"></div>
      </div>
      <div class="input-wrapper">
          <input type="text" name="lastName" placeholder="Last Name...">
          <div class="error" id="error-last-name"></div>
      </div>
  </div>
  <div class="input-wrapper">
      <input type="text" name="email" placeholder="Email">
      <div class="error" id="error-email"></div>
  </div>
  <div class="input-wrapper">
      <input type="password" name="password" placeholder="Password">
      <div class="error" id="error-password"></div>
  </div>
  <div class="input-wrapper">
      <input type="password" name="confirmPassword" placeholder="Confirm Password">
      <div class="error" id="error-confirm-password"></div>
  </div>
  <div class="submit-wrapper">
      <div>Already have an account ? <span class="cursor-pointer"id="redirect-to-login">Login</span></div>
      <button class = "btn" type='submit' id = 'loginChatPage'>Register</button>
  </div>
</form>
  </div>
</div>
</div>
`
components.quizzScreen=`<div class="container-quizz">
<div id="question-container" class="hide">
  <div id="question">asdasdasdkljasdl </div>
  <div id="answer-buttons" class="btn-grid">
    <button class="btn">Answer 1</button>
    <button class="btn">Answer 2</button>
    <button class="btn">Answer 3</button>
    <button class="btn">Answer 4</button>
  </div>
</div>
<div class="controls">
  <button id="start-btn" class="start-btn btn">Start</button>
  <button id="next-btn" class="next-btn btn hide">Next</button>
</div>
</div>`