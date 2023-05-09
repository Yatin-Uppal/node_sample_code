import express, {Express} from 'express';
import AuthRouter from './auth';

/* GET home page. */

class Api{
	private authRouter : AuthRouter;

	private app: Express
	constructor(){
		this.app = express();
	 	this.authRouter = new AuthRouter();
	}
	public route(): Express{
        
		this.app.use("/auth", this.authRouter.route());
        
		return this.app;
	}
}

export default Api;
