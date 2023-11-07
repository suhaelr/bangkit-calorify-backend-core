const { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } = require('firebase/auth');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const config = require('../../config');

const initialize = initializeApp(config.firebaseConfig);
const auth = getAuth(initialize);
const firestore = getFirestore(initialize);

const register =  async (req, res) => {
  try {
    const { email, password, confirmPassword, birthday, gender, height, weight, activitylevel } = req.body;

    if (!email || !password || !confirmPassword || !birthday || !gender || !height || !weight || !activitylevel) {
      res.status(400).json({ 
        code: 400,
        status: "Bad Request",
        error: 'Must fill all fields!' 
      });
      return;
    }
    if (password !== confirmPassword) {
      res.status(400).json({
        code: 400,
        status: "Bad Request",
        error:'Passwords not match! '
      });
      return;
    }
    // register users
    const {user} = await createUserWithEmailAndPassword(auth, email, password);

    const currentDate = new Date();
    const birthDate = new Date(birthday);
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // input data to users collection
    const users = doc(firestore, 'users', user.uid);
    await setDoc(users, {
      email,
      age,
      gender,
      height,
      weight,
      activitylevel,
      created_at: new Date()
    });
    res.status(200).json({ 
      code: 200,
      status: "OK",
      message: `User with ID ${user.uid} has been registered!` 
    });
    console.log('User registered:', user.uid);

  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error!",
      error: error.message
    });
  }
};

const oauthGoogle = async (req, res) => {
  // try {
  
  //   const provider = new GoogleAuthProvider();
  //   const googleUserCredential = await signInWithPopup(auth, provider);
  //   const googleUser = googleUserCredential.user;

  //   const { displayName, email, photoURL } = googleUser;


  //   res.status(200).json({ message: 'Google sign-in successful' });
  //   console.log('Google user:', googleUser.uid);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};

module.exports = { register, oauthGoogle};