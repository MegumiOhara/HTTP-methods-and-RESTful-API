import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

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