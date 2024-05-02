import { IsNotEmpty, IsNumber, IsNumberString, IsString, Min } from "class-validator";

export class WalletDto {

    @IsNumberString()
    //we can set up a valiator @Min(1) for minimum amount if the amount is coming as a number but from postman its coming as a string so not possible 
    amount: string; // Accept as string, but validate as number string
}


