export class AuthenticationLoginnedAccountEvent {
  constructor(
    public readonly displayName: string,
    public readonly email: string
  ) {}
}
