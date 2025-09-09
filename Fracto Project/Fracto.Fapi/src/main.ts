import { platformBrowser } from "@angular/platform-browser";
import { AppModule } from './app/app-module';
import { environment } from "./environments/environment";

platformBrowser()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

