import db from "../models/index";
import CRUDservices from "../services/CRUDservices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = async (req, res) => {
  return res.render("Crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDservices.createNewUser(req.body);
  console.log(message);
  return res.send(message);
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDservices.getAllUser();
  return res.render('displayCRUD.ejs', {
    dataTable: data,
  });
}

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservices.getUserById(userId);
    return res.render('editCRUD', {
      User: userData,
    });    
  }
  else {
    return res.send('user not found!');
  }
}

let putCRUD  =  async (req, res) => {
    let data = req.body;
    await CRUDservices.updateUser(data);
    return res.send('Update Done!');
} 

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
};
