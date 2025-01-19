import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    const router = inject(Router);
    const token = localStorage.getItem('token');
    
    if(token){
      const clonedReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });

      return next.handle(clonedReq).pipe(
        catchError((error) => {
          if(error.status == 401){
            router.navigate(['/connect']);
          }

          return throwError(error);
        })
      )
    }

    return next.handle(request);
  }
}