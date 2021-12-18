import {
  DocumentSnapshot,
  endAt,
  endBefore,
  FieldPath,
  limit,
  limitToLast,
  orderBy,
  OrderByDirection,
  QueryConstraint,
  startAfter,
  startAt,
  where,
  WhereFilterOp,
} from 'firebase/firestore';

export class QueryBuilder<T> {
  private queryConstraints: QueryConstraint[] = [];

  endAt(...snapshotOrFieldValues: DocumentSnapshot[] | unknown[]): this {
    return this.addQueryConstraint(endAt(snapshotOrFieldValues));
  }

  endBefore(...snapshotOrFieldValues: DocumentSnapshot[] | unknown[]): this {
    return this.addQueryConstraint(endBefore(snapshotOrFieldValues));
  }

  limit(limitNum: number): this {
    return this.addQueryConstraint(limit(limitNum));
  }

  limitToLast(limitNum: number): this {
    return this.addQueryConstraint(limitToLast(limitNum));
  }

  orderBy(
    fieldPath: keyof T | FieldPath | string,
    directionStr: OrderByDirection = 'asc'
  ): this {
    return this.addQueryConstraint(orderBy(fieldPath as string, directionStr));
  }

  startAfter(...snapshotOrFieldValues: DocumentSnapshot[] | unknown[]): this {
    return this.addQueryConstraint(startAfter(snapshotOrFieldValues));
  }

  startAt(...snapshotOrFieldValues: DocumentSnapshot[] | unknown[]): this {
    return this.addQueryConstraint(startAt(snapshotOrFieldValues));
  }

  where(
    fieldPath: keyof T | FieldPath | string,
    optStr: WhereFilterOp,
    value: unknown
  ): this {
    return this.addQueryConstraint(where(fieldPath as string, optStr, value));
  }

  resetQueryConstraints(): this {
    this.queryConstraints = [];

    return this;
  }

  getQueryConstraints(): QueryConstraint[] {
    return [...this.queryConstraints];
  }

  addQueryConstraint(queryConstraint: QueryConstraint): this {
    this.queryConstraints.push(queryConstraint);

    return this;
  }
}
