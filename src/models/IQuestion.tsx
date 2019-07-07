import {IOption} from './IOption';

export interface IQuestion {
    text: string,
    imgSrc: string,
    options: Array<IOption>
}