  (function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCuc5xxdS2c51twDF5t5DTWuR0jHUumcrE",
    authDomain: "strict-duck.firebaseapp.com",
    databaseURL: "https://strict-duck.firebaseio.com",
    projectId: "strict-duck",
    storageBucket: "strict-duck.appspot.com",
    messagingSenderId: "231062651686"
  };
  firebase.initializeApp(config);

    const authPage = document.getElementById('authPage');
    const mainPage = document.getElementById('mainPage');
    // Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPass = document.getElementById('txtPass');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogOut = document.getElementById('btnLogOut');
    const uid = document.getElementById('uid');
      
    const txtName = document.getElementById('txtName');
    const btnReg = document.getElementById('btnReg');
    const btnLog = document.getElementById('btnLog');
    const login = document.getElementById('login');
    const registerLabel = document.getElementById('registerLabel');
    const loginLabel = document.getElementById('loginLabel');
    const divName = document.getElementById('divName');
      
    var user = firebase.auth().currentUser;
    var database = firebase.database();
    
    const loader = document.getElementById('loader');
    var profilePhoto = document.getElementById('profilePhoto');
    var profile = document.getElementById('profile');
    var reg = false;
      
    //Add login Event
        btnLogin.addEventListener('click', e=>{
        loader.classList.remove('hide');
        //Get email and pass
        const email = txtEmail.value;
        const pass = txtPass.value;
        const auth = firebase.auth();
        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        
    });
      //Add signup event
      btnSignUp.addEventListener('click', e=> {
        loader.classList.remove('hide');
        //Get email and pass
        const email = txtEmail.value;
        const pass = txtPass.value;
        const auth = firebase.auth();
        //Sign in
        const promise  = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        reg=true;
      });
    
          
        
      btnLogOut.addEventListener('click', e=> {
          firebase.auth().signOut();
          reg=false;
      });
      
      // Add a realtime listener
      firebase.auth().onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            if(reg == true)
            {
            //Create database
            database.ref('users/'+ firebaseUser['uid']).update({
            name: txtName.value,
            email: txtEmail.value,
            password: txtPass.value,
            profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/strict-duck.appspot.com/o/user.png?alt=media&token=91caeeb2-e57c-4807-ad32-080a547baa7a'
            });
            };
              
              
            //Change UI
            console.log(firebaseUser);
            loader.classList.add('hide');
            authPage.classList.add('hide');
            mainPage.classList.remove('hide');
            
            firebase.database().ref('users/' + firebaseUser.uid ).once('value').then(function(snapshot){
            profile.innerHTML="<a><img id='profilePhoto'>" + snapshot.val().name + "</a>",
            profilePhoto.src = snapshot.val().profilePhoto
                
            });
             }
          
          
          else{
            //Change UI
            console.log('not logged in');
            loader.classList.add('hide');
            authPage.classList.remove('hide');
            mainPage.classList.add('hide');
          }
      });
      
      btnReg.addEventListener('click', e=>{
          btnReg.classList.add('hide');
          btnLogin.classList.add('hide');
          loginLabel.classList.add('hide');
          
          btnLog.classList.remove('hide');
          btnSignUp.classList.remove('hide');
          registerLabel.classList.remove('hide');
          divName.classList.remove('hide');
          
      });
      
       btnLog.addEventListener('click', e=>{
          btnReg.classList.remove('hide');
          btnLogin.classList.remove('hide');
          loginLabel.classList.remove('hide');          
          
          btnLog.classList.add('hide');
          btnSignUp.classList.add('hide');
          registerLabel.classList.add('hide');
          divName.classList.add('hide');
      });
      
           
      
      
      
      
      
      
  }());