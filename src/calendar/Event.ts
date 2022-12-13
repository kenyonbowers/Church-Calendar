import { Church } from "../church/Church"

export interface ExpandData {
    church: Church
    event?: Event
}

export interface Event {
    id: string
    name: string
    description?: string
    built_in: boolean
    expand?: ExpandData
}

export interface PlacedEvent {
    startDate: Date
    endDate: Date
    church: Church
    expand: ExpandData
}