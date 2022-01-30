export interface Room {
    _id: string
    roomId: Number
    name: string
    description: string
    isBooked: Boolean
    booked_from: Date
    booked_to: Date
    created_at: Date
    updated_at: Date
  }
  
  export interface CreateRoom {
    roomId: Number
    name: string
    description: string
    isBooked: Boolean
    booked_from: Date
    booked_to: Date
  }
  