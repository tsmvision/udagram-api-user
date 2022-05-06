import 'dotenv/config';
import express from 'express';
import { sequelize } from './sequelize';
import { UserRouter } from './controllers/v0/users/routes/user.router';
import { V0MODELS } from './controllers/v0/model.index';

(async () => {
  try {
    sequelize.addModels(V0MODELS);
    // await sequelize.sync();
  
    const app = express();
    const port = process.env.PORT || 8080; // default port to listen
    
    app.use(express.json());
  
    // CORS Should be restricted
    app.use(function(req, res, next) {
      // res.header("Access-Control-Allow-Origin", "http://localhost:8100");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      next();
    });
  
    app.use('/', UserRouter)
      
    // Start the Server
    app.listen( port, () => {
        console.log();
        console.log( `server running http://localhost:${ port }` );
        console.log( `press CTRL+C to stop server` );
    } );
  } catch (e) {
    console.log(e);
  }
})();