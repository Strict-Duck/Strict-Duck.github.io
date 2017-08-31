  (function(){

  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAr_YxvV04UPsL3Th8oU8sXeIoJNlHs7Do",
    authDomain: "kono-f4f2d.firebaseapp.com",
    databaseURL: "https://kono-f4f2d.firebaseio.com",
    projectId: "kono-f4f2d",
    storageBucket: "kono-f4f2d.appspot.com",
    messagingSenderId: "177948466004"
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
            profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/kono-f4f2d.appspot.com/o/user.png?alt=media&token=0d87b984-8a55-4bd9-8b25-dd95f4acbf44'
            });
            };
              
              
            //Change UI
            console.log(firebaseUser);
            loader.classList.add('hide');
            authPage.classList.add('hide');
            mainPage.classList.remove('hide');
            
            firebase.database().ref('users/' + firebaseUser.uid ).once('value').then(function(snapshot){
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