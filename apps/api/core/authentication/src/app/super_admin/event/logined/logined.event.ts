export class SuperAdminLoginnedEvent {
  constructor(
    public readonly displayName: string,
    public readonly email: string
  ) {}
}
