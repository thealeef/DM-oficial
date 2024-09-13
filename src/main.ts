import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BarController, Colors, Legend } from 'chart.js';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [provideCharts(withDefaultRegisterables()), provideAnimationsAsync(), provideCharts(withDefaultRegisterables())],
}).catch((err) => console.error(err));

provideCharts({ registerables: [BarController, Legend, Colors] });
