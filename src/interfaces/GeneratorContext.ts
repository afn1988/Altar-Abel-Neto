import IGrid from "../interfaces/grid"
import IPayment from "./payment"

export default interface IGeneratorContext{  
    grid: IGrid | undefined,
    setGrid: (grid: IGrid | undefined) => void
    code: number | undefined,
    setCode: (code: number | undefined) => void
    generate: boolean,
    setGenerate: (generate: boolean) => void,
    timeoutID: any,
    setTimeoutID: (generate: any) => void
    paymentGrid: IPayment[], 
    setPaymentGrid: (grid: IPayment[]) => void 
} 