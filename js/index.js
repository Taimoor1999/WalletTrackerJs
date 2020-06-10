var auth = firebase.auth();
var firestore = firebase.firestore()
// firebase.firestore.setLogLevel('debug')

var fetchSignUpEmail = document.querySelector('.SignUp_Email');
var fetchSignInEmail = document.querySelector('.SignIn_Email');
var fetchSignInPassword = document.querySelector('.SignIn_Password');

var fetchSignUpPassword = document.querySelector('.SignUp_Password');

var fetchSignUpName = document.querySelector('.SignUp_Name');
var fetchSignUpForm  = document.querySelector('.SignUpForm');
var fetchSignInForm  = document.querySelector('.SignInForm');
var fetchGoogleButton = document.querySelector('.GoogleButton');

fetchGoogleButton.addEventListener('click', (e) => GoogleSignIn(e));
fetchSignInForm.addEventListener('submit' ,  (e) => SignInFormSubmisson(e))
fetchSignUpForm.addEventListener('submit' ,  (e) => SignUpFormSubmisson(e));

var GoogleSignIn=  async (e) => {
    e.preventDefault();
    
try{    
var Googleprovider = new firebase.auth.GoogleAuthProvider();
var GoogleSignedInUser = await firebase.auth().signInWithPopup(Googleprovider);
console.log(GoogleSignedInUser);

}
catch(error)
{
console.log(error);
console.log('failed to sign in with google');
}

}


var SignUpFormSubmisson = async (e) => {
 e.preventDefault();
//  console.log('signUp');
    try{
        var name = fetchSignUpName.value;
    var email = fetchSignUpEmail.value;
    var password = fetchSignUpPassword.value;
    if(email && password && name)
    {
        var {user : {uid}} = await auth.createUserWithEmailAndPassword( email, password);
        var SignInUserInfo = {
            name,
            email, 
            createdAt : new Date()
        }

        await firestore.collection('user').doc(uid).set(SignInUserInfo);
        
        console.log('done');    
    
    }
    
}
catch(error)
{
console.log(error);
}

}
var SignInFormSubmisson = async (e) => {
    e.preventDefault();
    // var name = fetchSignUpName.value;
   try{
    var email = fetchSignInEmail.value;
    var password = fetchSignInPassword.value;
    if(email && password)
    {
        var signedIn = await auth.signInWithEmailAndPassword(email,password);
        console.log(signedIn.user.uid);
        var getUserInfo = await firestore.collection('user').doc(signedIn.user.uid).get();
        console.log(getUserInfo.data());
        console.log('data read');
    }

   }
   catch(error)
   {
    console.log(error);
   }
    
}