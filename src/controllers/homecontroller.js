
import db from '../models/index';
import bodyParser from "body-parser";
import { request } from 'express';
import createNewUser from "../services/CRUDService";
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (e) {
        console.log(e)
    }


}
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    console.log(req.body);
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('abcedddddd')
}

let displayCRUD = async (req, res) => {

    let data = await CRUDService.getAllUsers()
    console.log('----------------------');
    console.log(data);
    console.log('----------------------');

    return res.render('displayCRUD',{datatable: data})
}

let editcrud = async(req, res) => {
    let userid = req.query.id;
    if (userid) {
        let userData = await CRUDService.getUserInfoById(userid);
        
        
        return res.render('editcrud', { userData: userData })
    } else {
        return res.send("user not found")
    }
    
    console.log(req.query.id);
    //return res.send("Edit CRUD PAGE")
}
let deletecrud = async (req, res) => {
    let id = req.query.id;
    let data = await CRUDService.deleteUser(id)
    return res.render('displayCRUD', { datatable: data })
}
let putcrud = async (req, res) => {
    let data =  req.body;
    let result = await CRUDService.updateUser(data);
    if (result) {
        return await displayCRUD(req , res)
    } else {
        return res.send('update')
    }
    
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editcrud: editcrud,
    deletecrud: deletecrud,
    putcrud: putcrud,
}