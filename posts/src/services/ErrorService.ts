import { Service } from 'typedi';
import { HttpStatusCode } from '../api/types';

type HttpErrorType = {
	statusCode: HttpStatusCode, errorMessage: string
}

@Service()
class ErrorService {
	makeHttpError({ statusCode, errorMessage }: HttpErrorType): HttpErrorType {
		return { statusCode, errorMessage }
	}
}

export { ErrorService };
