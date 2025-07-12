//abstract class apenas para servir como um tipo

export abstract class HashingServiceProcol {
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, passwordHash: string): Promise<boolean>

}