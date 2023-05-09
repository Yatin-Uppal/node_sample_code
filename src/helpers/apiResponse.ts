import responseCode from './response';

class ApiResponse {
	constructor() { }

	public successResponse(res: Response | any, code: string): Promise<Response> {
		var data = {
			status: true,
			code: responseCode[code].code,
			message: responseCode[code].msg
		};
		return res.status(200).json(data);
	};

	public successResponseWithData(res: Response | any, code: string, data: any): Promise<Response> {
		var resData = {
			status: true,
			code: responseCode[code].code,
			message: responseCode[code].msg,
			data: data
		};
		return res.status(200).json(resData);
	};

	public ErrorResponse(res: Response | any, code: string): Promise<Response> {
		var data = {
			status: false,
			code: responseCode[code].code,
			message: responseCode[code].msg
		};
		return res.status(500).json(data);
	};

	public ErrorResponseWithMsg(res: Response | any, code: string, msg: string): Promise<Response> {
		var data = {
			status: false,
			code: responseCode[code].code,
			message: responseCode[code].msg
		};
		return res.status(500).json(data);
	};

	public notFoundResponse(res: Response | any, code: string): Promise<Response> {
		var data = {
			status: false,
			code: responseCode[code].code,
			message: responseCode[code].msg
		};
		return res.status(404).json(data);
	};

	public validationErrorWithData(res: Response | any, code: string, data: any): Promise<Response> {
		var resData = {
			status: false,
			code: responseCode[code].code,
			message: responseCode[code].msg,
			data: data
		};
		return res.status(400).json(resData);
	};

	public unauthorizedResponse(res: Response | any, code: string): Promise<Response> {
		var data = {
			status: false,
			code: responseCode[code].code,
			message: responseCode[code].msg
		};
		return res.status(401).json(data);
	};
}

export default new ApiResponse();
