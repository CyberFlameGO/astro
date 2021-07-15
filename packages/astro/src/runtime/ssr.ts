import type { CompileOptions } from '../@types/compiler.js';

import fs from 'fs';
import { compileComponent } from '../compiler/index.js';
import { fileURLToPath } from 'url';

interface LoadOptions {
  compileOptions: CompileOptions;
}

export interface RenderOptions {
  request: {
    url: string;
    canonicalURL: string;
  };
  children: any[];
  props: Record<string, any>;
  css: string[];
}

export default {
  async load(filePath: URL, { compileOptions }: LoadOptions): Promise<{ render(options: RenderOptions): Promise<string> }> {
    const contents = await fs.promises.readFile(filePath, 'utf8');
    const result = await compileComponent(contents, {
      compileOptions,
      filename: fileURLToPath(filePath),
      projectRoot: fileURLToPath(compileOptions.astroConfig.projectRoot),
    });
    console.log({ result });

    return {
      async render(options) {
        return `<html></html>`;
      },
    };
  },
};
