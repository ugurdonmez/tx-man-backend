import { Controller, Get, Route } from "tsoa";

@Route("ping")
export class HealthController extends Controller {
    @Get()
    public async getHealth(): Promise<string> {
        return "Service is up.";
    }
}
