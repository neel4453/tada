import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  // Separated for testability: tests can spy on this to force insecure-context path
  // without needing to mock window.isSecureContext / window.location (non-configurable).
  isInsecureContext(): boolean {
    if (!('isSecureContext' in globalThis) || (globalThis as any).isSecureContext) {
      return false;
    }
    const host = (globalThis as any).location?.hostname ?? '';
    const isLoopback = host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
    return !isLoopback;
  }

  async getCamera(options: MediaTrackConstraints): Promise<MediaStream> {
    if (this.isInsecureContext()) {
      throw new Error('insecureContext');
    }

    let camera: MediaStream;
    try {
      camera = await navigator.mediaDevices.getUserMedia({audio: false, video: options});
    } catch (e: any) {
      const message: string = e?.message ?? '';
      const name: string = e?.name ?? '';
      // eslint-disable-next-line no-console
      console.error(e);

      // Chrome/Firefox surface permission denial as NotAllowedError regardless of
      // the message string. Safari and older Chrome add "Permission denied".
      if (message.includes('Permission denied') || name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        throw new Error('permissionDenied');
      }
      // Secure-context requirement sometimes surfaces as NotAllowedError or
      // generic SecurityError — already handled above, but keep a fallback.
      if (message.toLowerCase().includes('secure context') || name === 'SecurityError') {
        throw new Error('insecureContext');
      }
      if (name === 'NotFoundError' || name === 'DevicesNotFoundError' || message.includes('not found')) {
        throw new Error('notConnected');
      }
      if (name === 'NotReadableError' || name === 'AbortError') {
        throw new Error('notConnected');
      }
      // Default to permission denied for access-denied style errors from showcase hosting
      if (message.toLowerCase().includes('access denied') || message.toLowerCase().includes('denied')) {
        throw new Error('permissionDenied');
      }
      throw new Error('notConnected');
    }
    if (!camera) {
      throw new Error('notConnected');
    }
    return camera;
  }
}
