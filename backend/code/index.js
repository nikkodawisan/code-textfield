//MVC - model, view, controller design pattern
const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.urlencoded({ extended:true })) //for form submission
app.use(express.json()) //json response
app.use(
    cors(
        { origin : "http://localhost:3000" }  //front end
    )
)

const userDB = [
    {
        id: 1,
        username: "admin",
        password: "password123",
        status: 1,
        email: "myTest@yahoo.com"
    },
    {
        id: 2,
        username: "staff",
        password: "123",
        status: 0,
        email: "staff@google.com"
    }

]
//CRUD  create, read, update, delete
// All-Profile & One-Profile
const profileDB = [
    {
        id:1,
        firstname : "James",
        lastname : "Bond",
        phone : "97987",
        address : "New York USA",
        email : "james@yahoo.com",
    },
    {   
        id:2,
        firstname : "Peter",
        lastname : "Pan",
        phone : "97987",
        address : "California USA",
        email : "peter@yahoo.com",
    },
    {
        id:3,
        firstname : "Michael",
        lastname : "Jordan",
        phone : "97987",
        address : "California USA",
        email : "mic@google.com",
    },
    {
        id:4,
        firstname : "Vic",
        lastname : "Saints",
        phone : "9742342987",
        address : "CDO Mindanao",
        email : "vic@google.com",
    },
];

app.get('/all-profiles', (req, res)=>{
    res.json(profileDB)
})

app.get('/one-profile/:id', (req, res)=>{
   const profileId = req.params.id;
   const userFound = profileDB.find( 
            (user)=>{
                return parseInt(profileId) === parseInt(user.id)   
            } 
    )
    if (userFound){
        res.json(userFound);
    } else {
        res.status(400).json("Invalid Id")
    }
})

//---------------------------------------------------------------------------------------
//Contact DB

//---------------------------------------------------------------------------------------
//UPDATE
app.put('/update-user/:userId', (req, res)=>{
    const user_id = req.params.userId;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;

    const updateUserRecord = {
        id: user_id,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        email: email,
    }

   const updateThisRecord =  profileDB.findIndex( (obj) => obj.id == user_id );
   profileDB[updateThisRecord] = updateUserRecord;

   if (profileDB) {
        res.json(
            {
                code : "success",
                msg : "Update Done"
            }
        )
   } else {
      res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while updating"
        }
      )
   }

})

//---------------------------------------------------------------------------------------
//ADD
app.post('/add-user', (req, res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;

    idCount = profileDB.length + 1;
    const newRecord = {
        id: idCount,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        email: email,
    }
    
  const saveStatus = profileDB.push(newRecord);  
   if (saveStatus) {
     res.status(200).json(
        { code: "success", msg:"add successful" }   
     )
   } else {
     res.status(401).json(
        { code: "failed", msg:"add error in saving" }   
     )
   }

})

//---------------------------------------------------------------------------------------
//DELETE
app.get('/delete-user/:userId', (req, res)=>{
    const user_id = req.params.userId;
    const indexValue =  profileDB.findIndex( (obj) => obj.id == user_id );
    profileDB.splice(indexValue, 1);

    if (profileDB) {
        res.json(
            {
                code : "success",
                msg : "Delete Done"
            }
        )
   } else {
      res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while deleting"
        }
      )
   }
    
})

//----------------------------------------------------------------------------------------
//DELETE CONTACT

app.get('/delete-user2/:userId', (req, res)=>{
    const user_id2 = req.params.userId;
    const indexValue =  contactDB.findIndex( (obj) => obj.id2 == user_id2 );
    contactDB.splice(indexValue, 1);

    if (contactDB) {
        res.json(
            {
                code : "success",
                msg : "Delete Done"
            }
        )
   } else {
      res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while deleting"
        }
      )
   }
    
})

//---------------------------------------------------------------------------------------
//REGISTER
app.post('/registration', (req, res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;

    idCoount = profileDB.length + 1;
    const newRecord = {
        id: idCoount,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        address: address,
        email: email,
    }
    
  const saveStatus = profileDB.push(newRecord);  
   if (saveStatus) {
     res.status(200).json(
        { code: "success", msg:"registration successful" }   
     )
   } else {
     res.status(401).json(
        { code: "failed", msg:"registration error in saving" }   
     )
   }

})

//---------------------------------------------------------------------------------------
//LOGIN VALIDATION
app.post('/login-validation', (req, res)=>{
    let username_login = req.body.username;
    let password_login = req.body.password;

   const user = userDB.find(
        (ob)=>{
          return ob.username === username_login && ob.password === password_login 
        }
    );
    
    if (user) {

        res.status(200).json(
           { code: "success", msg : "Username and Password matched a record", loginUser : user }   
        )

    } else {
       res.status(401).json({ code: "failed", msg:"Incorrect Username and Password testing"}) 
    }


})

//-----------------------------------------
//CONTACT US Database

const contactDB = [
    {
        id2:1,
        fullname : "Berto",
        email2 : "Bond@gmail.com",
        message : "97987 sample"
    },

    {   
        id2:2,
        fullname : "Jim",
        email2 : "Bonda@gmail.com",
        message : "sample 97987"
    },

    {
        id2:3,
        fullname : "Berting",
        email2 : "Bondi@gmail.com",
        message : "97987 sample"
    },

    {
        id2:1,
        fullname : "Berta",
        email2 : "Bondu@gmail.com",
        message : "97987 sample"
    },
];

app.get('/all-profiles2', (req, res)=>{
    res.json(contactDB)
})

app.get('/one-profile2/:id', (req, res)=>{
   const profileId2 = req.params.id;
   const userFound2 = contactDB.find( 
            (user)=>{
                return parseInt(profileId) === parseInt(user.id)   
            } 
    )
    if (userFound){
        res.json(userFound);
    } else {
        res.status(400).json("Invalid Id")
    }
})

//-----------------------------------------
//CONTACT US

app.post('/contact-us', (req, res)=>{
    let fullname = req.body.fullname;
    let email2 = req.body.email2;
    let message = req.body.message;

    idCount2 = contactDB.length + 1;
    const newRecord = {
        id2: idCount2,
        fullname: fullname,
        email2: email2,
        message: message
    }
    
  const saveStatus = contactDB.push(newRecord);  
   if (saveStatus) {
     res.status(200).json(
        { code: "success", msg:"add successful" }   
     )
   } else {
     res.status(401).json(
        { code: "failed", msg:"add error in saving" }   
     )
   }

})
//-----------------------------------------
//From New

const pageContent = [
    {
        id:'home',
        content:'sample content for home page'
    },
    {
        id:'about',
        content:'sample content for about'
    },

    {
        id:'contact',
        content:'sample content for contact'
    }
]

app.post('/page-content', (req, res)=>{
   
   let pageId = req.body.pageContent; 
   let actualContent = req.body.contentValue;

   newObject = {
        id: pageId,
        content:actualContent,
   } 
    
   const contentIndex =  pageContent.findIndex( (obj) => obj.id === pageId );
   pageContent[contentIndex] = newObject;

   if (pageContent) {
    res.json(
        {
            code : "success",
            msg : "Saving Done",
            //obj: pageContent
        }
    )
    } else {
    res.status(400).json(
        {
            code : "failed",
            msg : "Error encountered while saving home page content"
        }
    )
    }

})


app.get('/page-content/:id', (req, res)=>{
    const pageId = req.params.id;

    const pageFound = pageContent.find( 
             (page) => {
                 return pageId === page.id  
             } 
     )
     if (pageFound){
         res.json(pageFound.content);
     } else {
         res.status(400).json("Invalid Id")
     }
 })

//-----------------------------------------


//HTTP METHODS
//GET, POST, PUT, HEAD, DELETE, PATCH
app.get('/test/:num1/:num2', (req, res) => {
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    //database query

    const twoNumbers = [
        {
           id : num1,
           name: "Odeth",
           signal: true, 
        },
        {
            id : num2,
            name: "Odeth",
            signal: true,   
        }
    ]

    let sample = [num1, num2]

    let z = parseInt(num1);

    let m = "Hello WD95P";

    res.json(twoNumbers);
    
}
);


app.post('/save-data', (req, res) => {
    let fname = req.body.firstname;
    let lname = req.body.lastname;

    res.json([fname, lname])

})

app.put('/put-data/:id', (req, res) => {
     let fname = req.body.firstname;
    //let lname = req.body.lastname;

    let id = req.params.id;
   //update change firstname where id = id

    res.json([num1, fname])
})

app.delete('/delete/record/:id', (req, res)=>{
  
})

app.listen(5000)
console.log('Server is running in port 5000')