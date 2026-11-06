import {TestBed} from '@angular/core/testing';

import {NavigatorService} from './navigator.service';

describe('NavigatorService', () => {
  let service: NavigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigatorService);
    // Ensure isSecureContext check doesn't interfere with other tests (Karma runs on http://localhost)
    spyOn(service, 'isInsecureContext').and.returnValue(false);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if permission is denied', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.rejectWith(new Error('Permission denied'));

    await expectAsync(service.getCamera({})).toBeRejectedWithError('permissionDenied');
  });

  it('should handle NotAllowedError as permission denied', async () => {
    const err = new DOMException('Permission denied', 'NotAllowedError');
    spyOn(navigator.mediaDevices, 'getUserMedia').and.rejectWith(err);

    await expectAsync(service.getCamera({})).toBeRejectedWithError('permissionDenied');
  });

  it('should handle access denied message as permission denied', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.rejectWith(new Error('Access denied while showcase'));

    await expectAsync(service.getCamera({})).toBeRejectedWithError('permissionDenied');
  });

  it('should throw an error if the camera is not connected', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.resolve(null as any));

    await expectAsync(service.getCamera({})).toBeRejectedWithError('notConnected');
  });

  it('should return a MediaStream if the camera is connected', async () => {
    const mockMediaStream = new MediaStream();
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.resolve(mockMediaStream));

    const result = await service.getCamera({});
    expect(result).toBeDefined();
    expect(result).toEqual(mockMediaStream);
  });

  it('any random error should reject with device is not connected', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.reject(new Error('bla')));

    await expectAsync(service.getCamera({})).toBeRejectedWithError('notConnected');
  });

  it('should return a MediaStream if the camera is connected (duplicate check)', async () => {
    const mockMediaStream = new MediaStream();
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.resolve(mockMediaStream));

    const result = await service.getCamera({});
    expect(result).toBeDefined();
    expect(result).toEqual(mockMediaStream);
  });

  it('should throw insecureContext when on insecure LAN host', async () => {
    (service.isInsecureContext as jasmine.Spy).and.returnValue(true);
    const spy = spyOn(navigator.mediaDevices, 'getUserMedia');

    await expectAsync(service.getCamera({})).toBeRejectedWithError('insecureContext');
    expect(service.isInsecureContext).toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it('isInsecureContext returns false on secure context', () => {
    const fresh = new NavigatorService();
    // In Karma (localhost, secure), it should be false
    expect(fresh.isInsecureContext()).toBeFalse();
  });
});
