export class AuthenticationUserLoginnedEvent {
  constructor(
    public readonly displayName: string,
    public readonly email: string
  ) {}
}
