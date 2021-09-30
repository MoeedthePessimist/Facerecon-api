import express, { response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import signin from './Controllers/Signin.js';
import register from './Controllers/Register.js';
import profile from './Controllers/Profile.js';
import {handleImage, handleApiCall} from './Controllers/Image.js';


const postg = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '1234',
    database : 'smart-brain'
    }
});


postg.select('*').from('users').then(data => {
    console.log(data);
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com',  
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

// end points
app.post('/signin', (req, res) => signin(req, res, postg, bcrypt));
app.post('/register', (req, res) => register(req, res, postg, bcrypt));
app.get('/profile/:id', (req, res) => profile(req, res));
app.put('/image', (req, res) => handleImage(req, res, postg));
app.post('/imageurl', (req, res) => handleApiCall(req, res));


app.listen(5500, () => {
    console.log('app is running on port 5500');
});


