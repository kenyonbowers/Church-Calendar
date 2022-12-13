import { PlacedEvent } from './../Event';
import PocketBaseClient from '../../api/PocketBaseClient'
import { Event } from '../Event';

export async function getChurchEvents(startDate:Date, endDate:Date, churchID:string){
    var filters = `(dateStart >= "${transformDateFormat(startDate)}" && dateEnd <= "${transformDateFormat(endDate)}") || (dateEnd >= "${transformDateFormat(startDate)}" && dateStart < "${transformDateFormat(endDate)}") && church.id = "${churchID}"`;
    var records = await PocketBaseClient.collection("placed_events").getFullList(200, { filter: filters, expand: "church,event", sort: "dateStart" });
    return await transformEventResponses(records);
}

export const getPlacedEvent = async (id: string) => {
    const response = await PocketBaseClient.collection("placed_events").getOne(id, {})
    return transformEventResponse(response)
}

export const getEvent = async (id: string) => {
    const response = await PocketBaseClient.collection("events").getOne(id, {})
    return transformEventResponse(response)
}
  
export const transformEventResponse = (response: any): PlacedEvent => {
    const event: PlacedEvent = {
        ...response,
        collectionId: response['@collectionId'],
        collectionName: response['@collectionName'],
    }
    
    return event;
}
    
export const transformEventResponses = (responses: any[]) =>
    responses.map(r => transformEventResponse(r));

function transformDateFormat(date: Date){
    var year:any = date.getFullYear();
    var month:any = (date.getMonth()+1);
    var day:any = date.getDate();
    var hour:any = date.getHours();
    var minute:any = date.getMinutes();
    var second:any = date.getSeconds();
    if(month < 10)
        month = `0${month}`;
    if(day < 10)
        day = `0${day}`;
    if(hour < 10)
        hour = `0${hour}`;
    if(minute < 10)
        minute = `0${minute}`;
    if(second < 10)
        second = `0${second}`;
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}