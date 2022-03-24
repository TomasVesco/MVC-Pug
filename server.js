const express = require('express');
const Contenedor = require('./clase');

const app = express();

app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/productos', async (req, res) => {
    const products = await p.getAll();
    res.render('main', { products } );
});

app.post('/productos', async (req, res) => {
    let products = await p.getAll();

    const { title, price, image } = req.body;

    const newProduct = {
        title: title,
        price: price,
        image: image
    }

    await p.save(newProduct);

    products = await p.getAll();
    res.render('main', { products });  
});

app.listen(8080);

const p = new Contenedor( './productos.txt' );