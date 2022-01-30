export interface News {
    _id: string
    title: string
    description: string
    link: string
    created_at: Date
    updated_at: Date
  }
  
  export interface CreateNews {
    title: string
    description: string
    link: string
  }
  