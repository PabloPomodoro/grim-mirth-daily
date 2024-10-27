import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';

export const tokenHttpHeaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const token = sessionStorage.getItem('GMD Token');

  if (!token) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      authorization: 'Bearer ' + token,
    },
  });

  return next(cloned);
};
