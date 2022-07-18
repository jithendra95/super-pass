import { Component } from '@angular/core';
import { ConnectionService } from './services/connection.service';
import { LoaderService } from './services/loader.service';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'super-pass';
  defaultState = navigator.onLine;

  constructor(
    private connectionService: ConnectionService,
    private toastService: ToastService,
    private loadService: LoaderService
  ) {
    this.connectionService.connectionState$.subscribe((status) => {
      if (!status) {
        this.toastService.showToast('You are offline', 'close');
        if (status !== this.defaultState) this.loadService.reload();
      } else if (status && status !== this.defaultState) {
        this.toastService.showToast('You are online', 'close');
        this.loadService.reload();
      }
      this.defaultState = status;
    });
  }
}
