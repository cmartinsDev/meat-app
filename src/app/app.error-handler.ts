import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "./shared/messages/notification.service";
import { LoginService } from "./security/login/login.service";

// import { throwError } from "rxjs/operators";

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler{
    constructor(private notificationService: NotificationService,
                private injector: Injector,
                private zone: NgZone) {
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any){
        if(errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message;
            this.zone.run(()=> {
                switch (errorResponse.status) {
                    case 0:
                        this.notificationService.notify(message || 'Oh No! Parece que a nossa base de dados esta fora. Por favor tente mais tarde.');
                        break;
                    case 401:
                        this.injector.get(LoginService).handleLogin();         
                        break;
                    case 403:
                        this.notificationService.notify(message || 'Não autorizado');
                        break;
                    case 404:
                        this.notificationService.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.');
                        break;
                    default:
                        break;
                }
            })           
        }
        super.handleError(errorResponse);
    }
}