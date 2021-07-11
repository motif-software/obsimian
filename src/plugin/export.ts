import { Plugin, TFile, TFolder } from "obsidian";
import { map, pick, zipObject } from "lodash";
import { mkdirpSync, writeJsonSync } from "fs-extra";
import { dirname } from "path";

function TFileToPojo(f: TFile): any {
  if (!f) {
    return f;
  }
  const pojo = pick(f, [
    "stat",
    "basename",
    "extension",
    "path",
    "name",
    "parent",
  ]);
  pojo.parent = TFolderToPojo(pojo.parent);
  return pojo;
}

function TFolderToPojo(f: TFolder): any {
  if (!f) {
    return f;
  }
  const pojo = pick(f, ["path", "name", "parent"]);
  console.log(pojo);
  pojo.parent = TFolderToPojo(pojo.parent);
  return pojo;
}

/**
 * Dumps the output of Obsidian for testing.
 */
export function exportData(plugin: Plugin, outFile?: string) {
  console.log("dump", plugin);

  // Gather data.
  const mds = plugin.app.vault.getMarkdownFiles();
  const metadatas = mds.map((md) => plugin.app.metadataCache.getFileCache(md));

  // Transform for dump.
  mds.map((md) => ({
    stat: md.stat,
    basename: md.basename,
    extension: md.extension,
    path: md.path,
    name: md.name,
    parent: md.parent,
  }));

  // Collect for dump.
  const data = {
    "plugin.app.vault.getMarkdownFiles()": mds.map(TFileToPojo),
    "plugin.app.metadataCache.getCache(*)": zipObject(
      map(mds, "path"),
      metadatas
    ),
  };
  console.log(data);
  if (outFile) {
    mkdirpSync(dirname(outFile));
    writeJsonSync(outFile, data, { spaces: 2 });
  }
  return data;
}

// (plugin.app.vault.adapter as FileSystemAdapter).getBasePath();
// const files = plugin.app.vault.getMarkdownFiles();
// await Promise.all(files.map(f => plugin.app.vault.read(f)
// const { headings, links, embeds, listItems, frontmatter } = plugin.app.metadataCache.getCache(record.path);
// out.logo = logoLink && plugin.app.metadataCache.getFirstLinkpathDest(logoLink, record.path);
// const vaultDir = (plugin.app.vault.adapter as FileSystemAdapter).getBasePath();
// const linkFile = plugin.app.metadataCache.getFirstLinkpathDest(link, record.path);
// const cache = plugin.app.metadataCache.getFileCache(linkFile);
// const linkFile = plugin.app.metadataCache.getFirstLinkpathDest(link, record.path);
// const cache = plugin.app.metadataCache.getFileCache(linkFile);
// let content = await plugin.app.vault.read(linkFile);
// const target = plugin.app.metadataCache.getFirstLinkpathDest(n.to.substr(5), record.path);
// const slug = plugin.app.metadataCache.getCache(target.path).frontmatter?.slug || target.path;
