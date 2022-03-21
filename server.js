const express = require('express');
const Contenedor = require('./clase');

const app = express();

app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/productos', (req, res) => {
    p.getAll()
    .then ( products => {
        if(products == 1){
            res.render('main', { products, NoHayProductos: true });
        } else {
            res.render('main', { products, NoHayProductos: false });
        }
    });
});

app.post('/productos', (req, res) => {
    const {title, price, image} = req.body;

    const newProduct = {
        title: title,
        price: price,
        image: image
    }

    p.save(newProduct);
    p.getAll()
    .then(products => {
        res.render('main.pug', { products });
    });
});

app.listen(8080);

const p = new Contenedor( './productos.txt' );