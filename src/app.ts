import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import {User,Provider,Meter,reading} from './models' ;


const app = express()
const port = 4000

app.use(express.json());
app.use(bodyParser.json());

const findById = (array : any, id : any) => array.find((item:any) => item.id === parseInt(id));
let users : User[] = []; 

//TASK-1
// Return all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Create a user with attributes username, password, email and fullname
app.post('/users', (req: Request, res: Response) => {
    const id = users.length+1;
    const username =  req.body.username;
    const password = req.body.password
    const email = req.body.email;
    const fullname = req.body.fullname;
    const newUser = new User(id,username,password,email,fullname)
    users.push(newUser);
    res.send("User Added Succesfully")
});

// Return a user with parameter id if not exists return message saying `user not found`
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user =findById(users,id)
    if(user){
        console.log(user)
        res.json(user);
    }else{
        res.send("User not found")
    }
});

// update user information for given id 
app.put('/users/:id',(req,res)=>{
    const id = req.params.id;
    let user =findById(users,id)
    if(user){
        console.log(req.body)
        user = {...user,...req.body}
        res.send("Updated succesfully")
    }
    else{
        res.send("User Not found, cant update")
    }
})


// delete user for given id
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(item => item.id === id);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send("User deleted successfully");
    } else {
        res.send("User not found");
    }
});

//TASK-2 , API'S for providers
let providers: Provider[] = []
// providers = [new Provider(providers.length+1,"Electro",5),new Provider(providers.length+1,"Magneto",10)]
app.get('/providers',(req,res)=>{
    res.send(providers)
});
app.get('/providers/:id', (req, res) => {
    const id = req.params.id;
    const provider =findById(providers,id)
    if(provider){
        res.json(provider);
    }else{
        res.send("Provider not found")
    }
});
app.post('/providers',(req,res)=>{
    const id = providers.length+1;
    const name =  req.body.name;
    const charge = req.body.charge
    const newProvider = new Provider(id,name,charge)
    providers.push(newProvider);
    res.send("Provider Added Succesfully")
})
app.put('/providers/:id',(req,res)=>{
    const id = req.params.id;
    const provider =findById(providers,id)
    if(provider){
        const name = req.body.name;
        const charge = req.body.charge;
        if(name){ provider.name = name}
        if(charge){provider.charge}
        res.send("Updated Succesfully")
    }
    else{
        res.send("Provider Not found, cant update")
    }
})
app.delete('/providers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const providerIndex = providers.findIndex(item => item.id === id);

    if (providerIndex !== -1) {
        providers.splice(providerIndex, 1);
        res.send("Provider deleted successfully");
    } else {
        res.send("Provider not found");
    }
});


//TASK3 - USER COOSHING A  PROVIDER -SUBSCRIBING
app.post('/users/:id/providerSubscription',(req,res)=>{
    const id = req.params.id;
    const user =findById(users,id)
    const providerId = req.body.providerId;
    const provider =findById(providers,providerId)
    if(user && provider){
        user.providerId = providerId;
        res.json(user);
    }
    else{
        res.send("Provider or User Not Found");
    }
})


//TASK-4
const meters : Meter[] = []
app.get('/meters',(req,res)=>{
    res.json(meters);
})

app.post('/meters',(req,res)=>{
    const id = meters.length+1;
    const name = req.body.name;
    const newMeter = new Meter(id,name,[]);
    meters.push(newMeter);
    res.send("Meter Created Successfully");
})

app.get('/meters/:id/readdings',(req,res)=>{
    const id = req.params.id;
    const meter =findById(meters,id)
    if(meter){
        res.send(meter.readings)
    }else{
        res.send("meter is not found")
    }
})

app.post('/user/:id/meterSubscription',(req,res)=>{
    const id = req.params.id;
    const user =findById(users,id);
    const meterId = req.body.meterId
    if(user){
        user.meterId = meterId;
        res.send("Updated Meter Succesfully")
    }
    else{
        res.send("User Not Found")
    }
})
app.post('/meters/:id/readings',(req,res)=>{
    const id = req.params.id;
    const meter =findById(meters,id)
    if(meter){
        const units = req.body.units;
        const time = req.body.time;
        const newreadings : reading = {
            units : units,
            time : time,
        } 
        meter.readings.push(newreadings);
        console.log(" Updated Succesfully");
        res.send(meter.readings)
    }
    else{
        res.send("Meter Not Found");
    }
})

//TASK-5
//
app.get('/users/:id/readings', (req, res) => {
    const id = req.params.id;
    const user =findById(users,id)
    if (user) {
        const meter = meters.find(meter=>meter.id===user.meterId)
        if(meter){
            const userReadings = meter.readings
            res.json(userReadings);
        }
    }
    else{
        res.send("Issue with provided ID");
    }

});

app.get('/users/:id/bill',(req,res)=>{
    const id = req.params.id;
    const user =findById(users,id)
    if(user){
        const provider = providers.find(item=>item.id===user.providerId)
        const userMeter = meters.find(meter=>meter.id===user.meterId)
        if(userMeter){
            const userReadings = userMeter.readings
            const totalUnits = userReadings.reduce((sum, reading) => sum + reading.units, 0);
            const amount = totalUnits * (provider ? provider.charge : 0);
            const op={
                "user ID": user.id,
                "amount": amount,
            }
            res.json(op);
        }
        else{
            res.send("User not found");
        }
    }
    else{
        res.send("No user found")
    }
})

app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`)
})


