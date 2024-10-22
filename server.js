import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const PORT = 3000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info:{
            title:"Users API",
            version:"1.0.0",
            description: "A simple Express Users API"
        },
    },
    apis:["./server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () =>{
    console.log(`server is running in http://localhost:${PORT}`);
});

let users = [
    {
        id:1,
        name: "Annie Oakley",
        nationality: "American"
    },
    {
        id:2,
        name: "Bob Marley",
        nationality: "Jamaican"
    },
    {
        id:3,
        name: "Cristiano Ronalso",
        nationality: "Portugese"
    }
];

//Get all the books 
app.get('/users', (req,res) => {
    res.json(users);
});

//POST- add a user
app.post('/users', (req,res) => {
    const newUser = {
        id: users.length+1, 
        name: req.body.name,
        nationality: req.body.nationality,
    }; 

    users.push(newUser);
    res.json({message: "New user added successfully", user:newUser});
});

//PUT- update user information 
app.put('/users/:id', (req,res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (!user){
        return res.status(404).json({message: "User not found"});
    }
    user.name = req.body.name || user.name;
    user.nationality = req.body.nationality || user.nationality;
    res.json({message:"user update successful", user});
});

//DELETE - delete user
app.delete('/users/:id', (req,res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    res.json({message:"User deleted successfully"});
});