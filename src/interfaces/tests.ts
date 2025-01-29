export interface Test {
    title: string;
    duration: number;
    positiveMarks: number;
    negativeMarks: number;
    id?:number;
    description:string;
}
 export interface Options{
    options:string;
    qId:number;
    id?:number;
 }
export interface Question {
    question: string;
    answer: number;
    tId: number;
    id?:number;
    description:string;
    options: { option: string }[]; 
}

export interface TestSeries {
    title: string;
    price: number;
    id?:number;
    description:string;
    tests:string;
}