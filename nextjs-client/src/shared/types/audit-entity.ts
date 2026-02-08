export interface IdEntity<T> {
  id?: T;
}

export interface AuditEntity<T> extends IdEntity<T> {
  createdAt?: string;
  updatedAt?: string;
}
