//require

const express = require('express');
const contacts = require('./modules/contacts');
const bodyParser = require('body-parser');  
const messages = require('./modules/messages');
const calls = require('./modules/calls');

const app = express();

app.listen(3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let actualContacts = contacts.contacts;
let actualMessages = messages.messages;
let actualCalls = calls.calls;
//Endpoints

//Contacts

app.get('/all-contacts', (req, res) => {
    res.send(actualContacts);
});

app.get('/contact/:id', (req, res) => {
    const id = req.params.id;
    const result = actualContacts.find(ac => ac.id == id);
    res.send(result);
});

app.post('/contact', function (req, res) {  
    newContact = {  
        id: actualContacts.length + 1,  
        name: req.body.name,
        alias: req.body.alias,
        number: req.body.number,
        imageurl: req.body.imageurl  
    };
    actualContacts.push(newContact);
    res.send(actualContacts);
 });

app.delete('/contact/:id', (req, res) => {
    const id = req.params.id;
    actualContacts = actualContacts.filter(ac => ac.id != id);
    res.send(actualContacts);
});

//Messages

app.get('/all-messages', (req, res) => {
    res.send(actualMessages);
});

app.get('/message/:id', (req, res) => {
    const id = req.params.id;
    const message = actualMessages.filter(am => am.id = id);
    res.send(message);
});

app.post('/message', (req, res) => {
    
    const contactIdFrom = parseInt(req.body.contactIdFrom);
    const contactIdTo = parseInt(req.body.contactIdTo);

     if(!actualContacts.some(ac => ac.id === contactIdFrom) || !actualContacts.some(ac => ac.id === contactIdTo))
         res.send("Invalid id contact.");

     else {
        newMessage = {
            id: actualMessages.length + 1,
            contactIdFrom: contactIdFrom,
            contactIdTo: contactIdTo,
            date: new Date(),
            text: req.body.text
        }
        actualMessages.push(newMessage);
        res.send(actualMessages);
     }
});

app.delete('/message/:id', (req, res) => {
    const id = req.params.id;
    actualMessages = actualMessages.filter(am => am.id != id);
    res.send(actualMessages);
});

//Calls

app.get('/all-calls', (req, res) => {
    res.send(actualCalls);
});

app.get('/call/:id', (req, res) => {
    const id = req.params.id;
    const call = actualCalls.filter(ac => ac.id == id);
    res.send(call);
});

app.post('/call', (req, res) => {
    const contactIdFrom = parseInt(req.body.contactIdFrom);
    const contactIdTo = parseInt(req.body.contactIdTo);

     if(!actualContacts.some(ac => ac.id === contactIdFrom) || !actualContacts.some(ac => ac.id === contactIdTo))
        res.send("Invalid id contact.");

    else {
        newCall = {
            id: actualCalls.length + 1,
            contactIdFrom: contactIdFrom,
            contactIdTo: contactIdTo,
            date: new Date(),
            duration: req.body.duration,
            type: req.body.type
        };
        actualCalls.push(newCall);
        res.send(actualCalls);
    }
});

app.delete('/call/:id', (req, res) => {
    const id = req.params.id;
    actualCalls = actualCalls.filter(ac => ac.id != id);
    res.send(actualCalls);
});

//Profile

app.get('/profile', (req, res) => {
    res.send(contacts.contacts);
});