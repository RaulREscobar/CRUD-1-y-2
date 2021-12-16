const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productsInSale = products.filter(product => product.category === "in-sale")
		let productsVisited = products.filter(product => product.category === "visited")


		res.render('index', {
			sale : productsInSale,
			visited : productsVisited,
			toThousand
		})
	},
	search: (req, res) => {
		let search = req.query.keywords.toLowerCase();
		let result = [];
		products.forEach( product => {
			if(product.name.toLowerCase().includes(search)){
				result.push(product)
			}
		});
		res.render('results', {
			search,
			result,
			toThousand
		})
	},
};

module.exports = controller;
