import { InjectionToken, Type } from '@angular/core';
import webstomp from 'webstomp-client';

export const WEBSOCKET = new InjectionToken<Type<WebSocket>>('WebSocket', { providedIn: 'root', factory: () => WebSocket });
export const WEBSTOMP = new InjectionToken<any>('Webstomp', { providedIn: 'root', factory: () => webstomp });
