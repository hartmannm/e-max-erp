import { AppError } from "../../domain/shared/error/app-error";

export default interface JsonResponse {

  data?: any;

  error?: AppError;

  timestamp: number;

}
