import { createContext } from "react"
import IGrid from "../interfaces/grid"
import IPayment from"../interfaces/payment"
import IGeneratorContext from "../interfaces/GeneratorContext"

export const GeneratorContext = createContext<IGeneratorContext>({
    grid: undefined,
    setGrid: (grid: IGrid | undefined) => {},
    code: undefined,
    setCode: (code: number | undefined) => {},
    generate: false,
    setGenerate: (generate: boolean) => {},
    timeoutID: undefined,
    setTimeoutID: (generate: any) => {},
    paymentGrid: [], 
    setPaymentGrid: (grid: IPayment[]) => {}
})