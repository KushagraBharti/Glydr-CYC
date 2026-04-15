import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendRoot = path.resolve(fileURLToPath(new URL("../../", import.meta.url)));

export class JsonRepository<T> {
  constructor(private readonly relativeFilePath: string) {}

  private get filePath(): string {
    return path.join(backendRoot, this.relativeFilePath);
  }

  async read(): Promise<T> {
    const file = await readFile(this.filePath, "utf8");
    return JSON.parse(file) as T;
  }

  async write(value: T): Promise<void> {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  }
}
