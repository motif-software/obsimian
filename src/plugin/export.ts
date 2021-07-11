import { Plugin, TFile, TFolder } from "obsidian";
import { flatten, keyBy, map, merge, pick, zipObject } from "lodash";
import { mkdirp, mkdirpSync, writeJson, writeJsonSync } from "fs-extra";
import { dirname } from "path";
import { ObsimianData } from "src/fakes/Obsimian";

const TFolderProps = ["path", "name"];
const TFileProps = TFolderProps.concat("stat", "basename", "extension");

function TFileToPojo(f: TFile): any {
  return merge({}, pick(f, TFileProps), { parent: TFolderToPojo(f.parent) });
}

function TFolderToPojo(f?: TFolder): any {
  if (!f) {
    return null;
  }
  return merge({}, pick(f, TFolderProps), { parent: TFolderToPojo(f.parent) });
}

/**
 * Dumps the output of Obsidian's APIs into {@code outFile} for testing.
 */
export async function exportData(
  plugin: Plugin,
  outFile: string
): Promise<ObsimianData> {
  const mds = plugin.app.vault.getMarkdownFiles();
  const paths = map(mds, "path");
  const contents = Promise.all(mds.map((md) => plugin.app.vault.read(md)));
  const metadatas = mds.map((md) => plugin.app.metadataCache.getFileCache(md));
  const linkpaths = mds.map((md, i) => {
    const links = map(metadatas[i].links, "link");
    const dests = links.map(
      (link) =>
        plugin.app.metadataCache.getFirstLinkpathDest(link, md.path).path
    );
    return zipObject(links, dests);
  });

  // Collect for dump.
  const data = {
    "vault.getMarkdownFiles()": mds.map(TFileToPojo),
    "vault.read(*)": zipObject(paths, await contents),
    "metadataCache.getFirstLinkpathDest(*)": zipObject(paths, linkpaths),
    "metadataCache.getCache(*)": zipObject(paths, metadatas),
  };

  await mkdirp(dirname(outFile));
  await writeJson(outFile, data, { spaces: 2 });
  return data;
}
