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

fetchSignInForm.addEventListener('submit' ,  (e) => SignInFormSubmisson(e))

fetchSignUpForm.addEventListener('submit' ,  (e) => SignUpFormSubmisson(e));

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
    
    }

   }
   catch(error)
   {
    console.log(error);
   }
    
}