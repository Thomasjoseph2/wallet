import { Controller,Get } from '@nestjs/common';


@Controller('')
export class WelcomeController {
    @Get()
    getHellow():string{
        return 'Server started successfully!';
    }
}
