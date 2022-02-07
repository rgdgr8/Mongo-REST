const mongoose = require('mongoose');
const parser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const express = require('express');
const app = express();

app.use(cors());
app.use(parser.json());

mongoose.connect(process.env.CONNECT_RGDGR,
    (err) => {
        if (err) {
            console.log('Connection unsuccessful');
            console.log(err);
        } else {
            console.log('connected to db!');
        }
    });

const Post = require('./models/Post');

app.get('/', (req, res) => { res.send("<h1>You are home</h1>"); });

app.get('/posts', async (req, res) => {
    console.log(req);
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

app.get('/posts/:title', async (req, res) => {
    console.log('To get:');
    console.log(req.params);
    try {
        const post = await Post.find(req.params);
        res.json(post);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

app.delete('/posts/:title', async (req, res) => {
    console.log('To delete:');
    console.log(req.params);
    try {
        const delPost = await Post.deleteOne(req.params);
        res.json(delPost);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

app.post('/posts', (req, res) => {
    console.log('To post:');
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc
    });

    post.save().then((data) => { res.json(data); }).catch((err) => {
        console.log(err);
        res.json(err);
    });
});

app.patch('/posts/:title', async (req, res) => {
    console.log('to patch:');
    console.log(req.params);
    console.log(req.body);
    try {
        const patchedPost = await Post.updateOne(req.params, req.body);
        res.json(patchedPost);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

app.all('*', (req, res) => { res.send('<h1>Not found</h1>'); });

app.listen(5000);