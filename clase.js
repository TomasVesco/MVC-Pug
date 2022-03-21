const fs = require('fs');

class Contenedor {

    constructor( route ) {
        this.route = route;
    }

    async save( fileToAdd ) { 
        try {

            this.getAll()
            .then( newFile => {
                fileToAdd.id = newFile[newFile.length - 1].id + 1;       
                newFile.push( fileToAdd ); 
                fs.writeFileSync( this.route, JSON.stringify( newFile, null, 4 ));
                return newFile[newFile.length - 1].id;
            });

        } catch(error) {
            console.log(error);
        }
    }

    async getById( id ) {
        try {

            const newFile = await this.getAll();
            const IdFile = newFile.find( file => file.id === id );
    
            if ( IdFile ) {
                return IdFile;
            } else {
                return null;
            }

        } catch(error) {
            console.log(error);
        }
    }

    async getAll() {
        try {

            const readFile = await fs.promises.readFile( this.route, 'utf-8' ); 
            return JSON.parse( readFile );         
        } catch(error) {

            fs.writeFileSync( this.route, '1');
            return JSON.parse( '1' );
        }
    }

    async deleteById( id ) {
        const newFile = await this.getAll();
        newFile.splice(newFile.indexOf(newFile[id - 1]), 1);
        fs.promises.writeFile( this.route, JSON.stringify( newFile, null, 4 ));
    }

    async deleteAll() {
        fs.promises.writeFile( this.route, '' );
    }
}

module.exports = Contenedor;