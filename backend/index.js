const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { spawn } = require('child_process');
require('dotenv').config();

app.use(express.json());
app.use(cors());
 
// Database connection mongoDB

mongoose.connect(process.env.MONGO_DB_CONNECTION)

// API creation

app.get("/", (req, res) => {
  res.send("Express app is Running")
});

// image storage engine

const storage = multer.diskStorage({                                                      
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({ storage: storage });                             // Se crea una instancia de multer utilizando la configuración de almacenamiento definida previamente.

// Crating endpoint for images
app.use("/images", express.static("upload/images"))                      
app.post("/upload", upload.single("product"), (req, res) => {             
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
});

// Schema for creating products
const Product = mongoose.model("Product",  {
  id:{
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true
  },
});

app.post("/addproduct", async(req, res) => {

  let products = await Product.find({})
  let id;

  if(products.length > 0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1
  }else{
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  })
  console.log(product)
  await product.save();
  console.log("Saved")
  res.json({
    success: true,
    name: req.body.name
  })
});

// Creating API for deleting products
app.post("/removeproduct", async(req, res) => {
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed")
  res.json({
    success: true,
    name: req.body.name
  })
});

//Creating API for getting all products
app.get("/allproducts", async(req, res) => {
  let products = await Product.find({})
  console.log("All products fetched")
  res.send(products)
});

// Schema Creating for User Model
const User = mongoose.model('User', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating endpoint for registering user
app.post('/signup', async(req, res) => {                      // Endpoint para crear un nuevo usuario
  let check = await User.findOne({email: req.body.email});    
  if(check){                                                 
    return res.status(400).json({
      success: false,
      errors: 'Existing user found with same email',
    });
  }
  let cart = {};                                                  
  for(let i=0; i<300; i++){                                   
    cart[i] = 0
  }
  const user = new User({                                     
    name: req.body.name,                                      
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })

  await user.save();                                          
  const data ={                                               
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom")                 // creamos un jwt en base a ese id     
  res.json({success: true, token})                            // que se devuelve en la respuesta
});

//Creating endpoint for user login
app.post('/login', async(req, res) => {
  let user = await User.findOne({ email: req.body.email})       
  if(user){                                                   
    const passMatch = req.body.password === user.password;    
    if(passMatch){                                            
      const data = {                                          
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");            
      res.json({success: true, token});                       

    }else{
      res.json({success:false, errors: "Wrong Password"});
    }
  }else{
    res.json({success:false, errors: "Wrong Email address"});
  }
});

// Creating endpoint for newcollection data
app.get('/newCollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8); 
  console.log("New Collection fetched")
  res.send(newcollection)
})

// Creating endpoint for popularProducts in clothing
app.get('/popularproducts', async (req, res) => {
  let products = await Product.find({category: 'clothing'});
  let popularproducts = products.slice(0, 4); 
  console.log("Popularproducts fetched")
  res.send(popularproducts)
});


//Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');                                         // Obtiene el token del header
  if (!token) {
    res.status(401).send({ errors: 'please authenticate usirg valid login' })
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");                              
      req.user = data.user;                                                       
      next()                                                                     
    } catch (error) {
      res.status(401).send({errors: "Please authenticate using valid token"})
    }
  }
}

// Creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId)                           
  let userData = await User.findOne({_id: req.user.id});          
  userData.cartData[req.body.itemId] += 1;                         
  await User.findOneAndUpdate({_id:req.user.id}, {cartData: userData.cartData}); 
  res.send("Added")

})


app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId)                                 
  let userData = await User.findOne({ _id: req.user.id });  
  if(userData.cartData[req.body.itemId] > 0)        
  userData.cartData[req.body.itemId] -= 1;                           
  await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData }); 
  res.send("Removed")

})

// Creating endpoint for getting cartdata
app.post('/getcart', fetchUser, async(req, res) => {
  console.log('get Cart')
  let userData = await User.findOne({_id:req.user.id});
  res.json(userData.cartData);
})

app.post('/api/chatbot', (req, res) => {
  const userInput = req.body.message;
  const pythonProcess = spawn('python', ['../data/scripts/chatbot.py', userInput]);

  let chatbotResponse = '';

  pythonProcess.stdout.on('data', (data) => {
    chatbotResponse += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      return res.status(500).json({ error: 'Python script exited with error' });
    }
    res.json({ response: chatbotResponse.trim() });
  });

  pythonProcess.on('error', (err) => {
    console.error(`Failed to start subprocess: ${err}`);
    res.status(500).json({ error: 'Failed to start Python subprocess' });
  });
});


app.listen(port, (error) => {
  if(!error){
    console.log("Server is Running on port:" +port)
  }else{
    console.log("Error: " +error)
  }
})