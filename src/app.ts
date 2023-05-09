import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import IndexRouter from './routes/index';
import ApiRouter from './routes/api';
import apiResponse from './helpers/apiResponse';
class App {

	public app: Express;
	private indexRoute: IndexRouter = new IndexRouter();
	private apiRouter: ApiRouter = new ApiRouter();

	constructor() {
		this.app = express(); //run the express instance and store in app
		this.config();
	}
	private config(): void | any{

		if (process.env.NODE_ENV !== "test") {
			this.app.use(morgan("dev"));
		}

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cookieParser());

		let setOfOriginAllow = process.env.ALLOW_ORIGINS.split(",");
		
		//To allow cross-origin requests
		const corsOpts = {
			origin: setOfOriginAllow,
			methods: ["GET", "POST","PUT","DELETE","OPTIONS"],
			allowedHeaders: ["Content-Type", "guid"],
			credentials: true,
		};
			
		this.app.use(cors(corsOpts));
		
		//Route Prefixes
		this.app.use("/", this.indexRoute.route());
		

		this.app.use(`/api/${process.env.APP_VERSION}/`, this.apiRouter.route());

		// throw 404 if URL not found
		this.app.use("*", function (req: Request, res: Response) {
			return apiResponse.notFoundResponse(res, 'GEN0001');
		});

		this.app.use((err: any, req: Request, res: Response) => {
			if (err.name == "UnauthorizedError") {
				return apiResponse.unauthorizedResponse(res, 'GEN0002');
			}
		});
	}

}

export default new App().app;