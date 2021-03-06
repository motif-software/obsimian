import { App, Plugin } from "obsidian";
import { ObsimianData, ObsimianFile } from "src/fakes/Obsimian";
import { TFileToObsimianFile } from "./mapping";
import { fromPairs, zipObject } from "./util";
import path from "path";

/**
 * Dumps the output of Obsidian's APIs into {@code outFile} for testing.
 */
export async function exportData(plugin: Plugin, outFile: string): Promise<ObsimianData> {
  const data = await gatherMarkdownData(plugin.app);
  await writeData(plugin, data, outFile);
  return data;
}

async function gatherMarkdownData(app: App): Promise<ObsimianData> {
  const files = app.vault.getMarkdownFiles();
  const paths = files.map((f) => f.path);

  const markdownContents = await Promise.all(files.map((md) => app.vault.read(md)));
  const metadatas = files.map((md) => app.metadataCache.getFileCache(md));
  const getDest = (link, path) =>
    TFileToObsimianFile(app.metadataCache.getFirstLinkpathDest(link, path));
  const fileLinkpathDests = files.map((md, i) =>
    fromPairs(metadatas[i].links?.map((l) => [l.link, getDest(l.link, md.path)]))
  );

  return {
    "vault.getMarkdownFiles()": files.map(TFileToObsimianFile),
    "vault.read(*)": zipObject(paths, markdownContents),
    "metadataCache.getCache(*)": zipObject(paths, metadatas),
    "metadataCache.getFirstLinkpathDest(*)": zipObject(paths, fileLinkpathDests),
  };
}

async function writeData(
  plugin: Plugin,
  data: ObsimianData,
  outFile: string
): Promise<ObsimianFile> {
  const fs = plugin.app.vault.adapter;
  fs.write(outFile, JSON.stringify(data, null, 2));
  return {
    name: path.basename(outFile),
    path: outFile,
    parent: {
      name: path.dirname(outFile),
      path: path.resolve(outFile, ".."),
    },
  };
}
