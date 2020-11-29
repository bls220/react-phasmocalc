export default class EvidenceState {
  static Unknown = new EvidenceState("unknown", () => EvidenceState.Found);
  static Found = new EvidenceState("true", () => EvidenceState.Rejected);
  static Rejected = new EvidenceState("false", () => EvidenceState.Unknown);

  value: string;
  next: () => EvidenceState;

  constructor(value: string, next: () => EvidenceState ) {
    this.value = value;
    this.next = next;
  }

  static Create = (value: string): EvidenceState =>
  {
    switch (value.toLowerCase()) {
      case 'true':
        return EvidenceState.Found;
      case 'false':
        return EvidenceState.Rejected;
      default:
        return EvidenceState.Unknown;
    }
  }
}
