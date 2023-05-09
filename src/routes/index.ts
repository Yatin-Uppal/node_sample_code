import express, {Router, Request, Response} from 'express';

import bodyParser from "body-parser";
/* GET home page. */

class Index{

	private router: Router;

	constructor(){
		this.router = express.Router();
	}

	public route(): any{

		this.router.get("/",function(req: Request, res: Response) {
			res.status(200).json({status:false,message:`Welcome to ${process.env.APP_NAME} api.`});
		});
		

		return this.router;
	}
}

export default Index;
