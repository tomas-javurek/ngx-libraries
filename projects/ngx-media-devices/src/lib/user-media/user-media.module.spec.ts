import { UserMediaModule } from './user-media.module';

describe('UserMediaModule', () => {
  let userMediaModule: UserMediaModule;

  beforeEach(() => {
    userMediaModule = new UserMediaModule();
  });

  it('should create an instance', () => {
    expect(userMediaModule).toBeTruthy();
  });
});
