export class AuthenticationSuperAdminLoginnedEvent {
  constructor(
    public readonly displayName: string,
    public readonly email: string
  ) {}
}
