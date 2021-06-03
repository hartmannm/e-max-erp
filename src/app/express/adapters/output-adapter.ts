import { AppError } from "../../../domain/shared/error/app-error";
import Result from "../../../domain/shared/use-cases/result";
import JsonResponse from "../../entities/json-response";

export default class OutputAdapter {

  public static jsonAdapt(result: Result<any, AppError>): JsonResponse {
    const response: JsonResponse = {
      timestamp: new Date().getTime()
    }
    if (result.hasError()) {
      console.log(result.getError())
      response.error = result.getError();
    } else {
      response.data = result.getValue();
    }
    return response;
  }

}
