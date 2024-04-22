import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';

export const tokenHttpHeaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('GMD Token');
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: 'Bearer ' + token,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
