export class AuthenticationOrganizationLoginnedEvent {
  constructor(
    public readonly displayName: string,
    public readonly email: string
  ) {}
}
