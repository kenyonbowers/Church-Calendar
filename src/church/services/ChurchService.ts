import PocketBaseClient from "../../api/PocketBaseClient"
import { Church } from "../Church"

export const getChurch = async (id: string) => {
  const response = await PocketBaseClient.collection("churches").getOne(id, {})
  return transformChurchResponse(response)
}

export const transformChurchResponse = (response: any): Church => {
    const church: Church = {
      ...response,
      collectionId: response['@collectionId'],
      collectionName: response['@collectionName'],
    }
  
    return church
}

export const transformChurchResponses = (responses: any[]) =>
  responses.map(r => transformChurchResponse(r))