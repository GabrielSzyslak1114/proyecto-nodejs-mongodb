
/** 
 * Requerimos el modelo - schema de la base de datos
*/
const Url = require('../models/Url');

/**
 * nanoid genera un ID 
 */
const {nanoid} = require('nanoid')


/**
 * Esta funcion async busca los datos de la DB y renderiza el archivo Home.hbs
 * pasandole la constante que contiene todos los elemento de la DB para ser mostrados
 * 
 */
const viewUrl = async(req, res)=>{
    try {
        //.lean para recibir un objeto tradicional que hbs pueeda leer sin problemas
        const urls = await Url.find().lean();
        console.log(urls);
        res.render("home",{urls});    
    } catch (error) {
        console.error(error)
    }

};

/**
 * Esta funcion agrega un nuevo dato a la DB
 * Recibe primero un dato que viene a traves del metodo post -req.body-
 * Y se agrega el nuevo dato al igual que se genera el id
 */
const addUrl = async (req, res)=>{
    const {origin} = req.body;
    try {
        const newUrl = new Url({origin: origin, shortURL: nanoid(6)});
        await newUrl.save();
        res.redirect('/')
        
    } catch (error) {
        console.log(" Gab error add form" + error);
        res.send("error en agregar el formulario")
    }
};

/**
 * esta funcion obtiene un id que es recibido a traves del parametro de la ruta.
 * Se llama y elimina el dato gracias al id que se pasa como parametro
 */
const eliminarUrl = async (req, res)=>{
    //parametros de ruta eliminar
    const { id } = req.params
    try {
        await Url.findByIdAndDelete(id);
        res.redirect('/')
        
    } catch (error) {
        console.log('no se pudo elimiar' + error);
        res.send("error al eliminar")
    }
};

const editarURLForm = async (req, res) => {
    const {id} = req.params;
    try{
        const url = await Url.findById(id).lean();
        res.render("home", {url});
    }
    catch{
        console.log("no pudo editar" + error);
    }
}

const editarUrl = async (req, res) => {
    const {id} = req.params;
    const {origin} = req.body;
    try{
        await Url.findByIdAndUpdate(id, {origin: origin});
        res.redirect('/')
    }
    catch{
        console.log("no pudo editar" + error);
    }
}

module.exports = {
    viewUrl,
    addUrl,
    eliminarUrl,
    editarURLForm,
    editarUrl
};