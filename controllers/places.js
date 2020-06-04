const { Place } = require("../models");
const { paginate, pageRows} = require("../pagination/pagination");

class PlaceController{
    async index(req, res){
        try{
            const page = req.query.page || 1;
            const places = await Place.findAndCountAll(
                paginate({
                    order: [["id", "ASC"]]
                },
                page
                )
            );

            places.pageRows = pageRows;
            places.page = Number(page);

            res.json(places);
        } catch(err){
            res.json(err);
        }
    }   

    async show(req, res){        
        try{
            const place = await Place.findByPk(req.params.id);     
            res.json(place);       
        } catch(err){
            res.json(err);
        }
    }

    async create(req, res){
        try{
            const place = await Place.create({
                title : req.body.title,
                description: req.body.description,
                accceptsCreditCard: req.body.accceptsCreditCard,
                coverImage: req.body.coverImage,
                avatarImage: req.body.avatarImage,
                openHour: req.body.openHour,
                closeHour: req.body.closeHour
            });            
            res.json(place);
        } catch(err){
            res.json(err);
        }
    }

    async update(req, res){
        try{

            const place = await Place.update(
            {
                title : req.body.title,
                description: req.body.description,
                accceptsCreditCard: req.body.accceptsCreditCard,
                coverImage: req.body.coverImage,
                avatarImage: req.body.avatarImage,
                openHour: req.body.openHour,
                closeHour: req.body.closeHour
            }, 
            {
                where:{
                    id: req.body.id
                }
            });

            res.json(place);
        } catch(err){
            res.json(err);
        }
    }

    async delete(req, res){
        try{
            const place = await Place.destroy({
                where:{
                    id: req.params.id
                }
            });          
            res.json(place);
        }catch(err){
            res.json(err);
        }
    }
}

module.exports = new PlaceController();

/*module.exports = {
    index: function (req, res) {
        Place.findAll({
            order: [["id", "DESC"]]
        }).then(places => res.json(places))
        .catch(err => res.json(err));
    },
    create: function(req, res){
        Place.create({
            title : req.body.title,
            description: req.body.description,
            accceptsCreditCard: req.body.accceptsCreditCard,
            coverImage: req.body.coverImage,
            avatarImage: req.body.avatarImage,
            openHour: req.body.openHour,
            closeHour: req.body.closeHour
        }).then(result => res.json(result))
        .catch(err => res.json(err));
    },
    update: function(req, res){
        Place.update({
            title : req.body.title,
            description: req.body.description,
            accceptsCreditCard: req.body.accceptsCreditCard,
            coverImage: req.body.coverImage,
            avatarImage: req.body.avatarImage,
            openHour: req.body.openHour,
            closeHour: req.body.closeHour,
        },{
            where:{
                id: req.body.id
            }
        }).then(result => res.json(result))
        .catch(err => res.json(err));
    },
    delete: function(req,res){
        console.log("idd: "+req.params.id)
        Place.destroy({
            where:{
                id: req.params.id
            }
        }).then(result => res.json(result))
        .catch(err => res.json(err));
    }
}*/