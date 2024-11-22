// Import Dotenv
require('dotenv').config()

// import express
const express = require('express');
const app = express()
app.use(express.json())


const PORT = process.env.PORT;

// --------------Prisma--------------------- 
const {PrismaClient} = require('@prisma/client')
//const {PrismaClientKnownRequestError} = require('@')
const prisma = new PrismaClient()


//-----------Routes-----------------------------
app.get('/',async(req,res)=>{
    const user = await prisma.user.findMany();
    return res.send(user)
});

app.post('/',async(req,res)=>{
    try{
        await prisma.user.create({
            data:{
                name:req.body.name,
                email:req.body.email
            }
        })
        return res.send("Data Save")
    }catch(err){
        return res.send(err)
    }
});

app.listen(PORT,()=>console.log(`App Running On ${PORT}`));










