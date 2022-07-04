export class BaseLoginnedEvent {
  constructor(
    public readonly displayName: string,
    public readonly email: string
  ) {}
}
