const { Place } = require("../models");
const { paginate, pageRows } = require("../pagination/pagination");
const upload = require("../config/upload");
const uploader = require("../uploader/Uploader");

class PlaceController {
	async index(req, res) {
		try {
			const page = req.query.page || 1;
			const places = await Place.findAndCountAll(
				paginate(
					{
						order: [["id", "ASC"]]
					},
					page
				)
			);

			places.pageRows = pageRows;
			places.page = Number(page);

			res.json(places);
		} catch (err) {
			res.json(err);
		}
	}

	async show(req, res) {
		try {
			const place = await Place.findByPk(req.params.id);
			res.json(place);
		} catch (err) {
			res.json(err);
		}
	}

	async create(req, res) {
		try {
			const place = await Place.create({
				title: req.body.title,
				description: req.body.description,
				accceptsCreditCard: req.body.accceptsCreditCard,
				coverImage: req.body.coverImage,
				avatarImage: req.body.avatarImage,
				openHour: req.body.openHour,
				closeHour: req.body.closeHour
			});

			res.json(place);
		} catch (err) {
			res.json(err);
		}
	}

	async update(req, res) {
		try {
			const place = await Place.update(
				{
					title: req.body.title,
					description: req.body.description,
					accceptsCreditCard: req.body.accceptsCreditCard,
					coverImage: req.body.coverImage,
					avatarImage: req.body.avatarImage,
					openHour: req.body.openHour,
					closeHour: req.body.closeHour
				},
				{
					where: {
						id: req.body.id
					}
				}
			);

			res.json(place);
		} catch (err) {
			res.json(err);
		}
	}

	async delete(req, res) {
		try {
			const place = await Place.destroy({
				where: {
					id: req.params.id
				}
			});
			res.json(place);
		} catch (err) {
			res.json(err);
		}
	}

	multerMiddleware() {
		return upload.fields([
			{ name: "avatarImage", maxCount: 1 },
			{ name: "coverImage", maxCount: 1 }
		]);
	}

	async saveImage(req, res, next) {
		const files = ["avatarImage", "coverImage"];
		for (let file of files) {
			if (req.files && req.files[file]) {
				const path = req.files[file][0].path;
				try {
					const urlImage = await uploader(path);
					req.body[file] = urlImage;
				} catch (err) {
					next(err);
				}
			}
		}

		next();
	}
}

module.exports = new PlaceController();
