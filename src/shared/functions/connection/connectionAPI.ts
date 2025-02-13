import axios from "axios";
import { MethodsEnum } from "../../enums/methods.enum";
import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from "../../constants/errosStatus";

export default class ConnectionAPI {
  static async call<T>(url: string, method: string, body?: unknown): Promise<T> {
    switch(method) {
      case MethodsEnum.GET:
        return (await axios.get<T>(url)).data
      case MethodsEnum.DELETE:
        return (await axios.delete<T>(url)).data
      case MethodsEnum.POST:
        return (await axios.post<T>(url, body)).data
      case MethodsEnum.PUT:
        return (await axios.put<T>(url, body)).data
      case MethodsEnum.PATCH:
      default:
        return (await axios.patch<T>(url, body)).data;
    }
  }

  static async connection<T>(url: string, method: string, body?: unknown): Promise<T> {
    return ConnectionAPI.call<T>(url, method, body).catch((error) => {
      if (error.response) {
        switch(error.response.status) {
          case 401:
          case 403:
            throw new Error(ERROR_ACCESS_DANIED)
          default:
            throw new Error(ERROR_CONNECTION)
        }
      }
      throw new Error(ERROR_CONNECTION);
    })
  }

}

export const connectionAPIGet = async<T>(url: string): Promise<T> => {
  return ConnectionAPI.connection<T>(url, MethodsEnum.GET)
}

export const connectionAPIDelete = async<T>(url: string): Promise<T> => {
  return ConnectionAPI.connection<T>(url, MethodsEnum.DELETE)
}

export const connectionAPIPost = async<T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connection<T>(url, MethodsEnum.POST)
}

export const connectionAPIPut = async<T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connection<T>(url, MethodsEnum.PUT)
}

export const connectionAPIPatch = async<T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connection<T>(url, MethodsEnum.PATCH)
}