import type { Content as FrontendContentModel } from "../../src/Models/Content"


export type Content = FrontendContentModel
export type DatabaseContent = Omit<FrontendContentModel, 'id'> & { _id: string }