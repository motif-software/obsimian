import { TFile, TFolder } from "obsidian";
import { ObsimianFile, ObsimianFolder } from "src/fakes";
import { pick } from "./util";

const TFolderProps = ["path", "name"];
const TFileProps = TFolderProps.concat("stat", "basename", "extension");

export function TFileToObsimianFile(f: TFile): ObsimianFile {
  return { ...pick(f, TFileProps), parent: TFolderToObsimianFolder(f.parent) };
}

export function TFolderToObsimianFolder(f?: TFolder): ObsimianFolder {
  if (!f) {
    return null;
  }
  return {
    ...pick(f, TFolderProps),
    parent: TFolderToObsimianFolder(f.parent),
  };
}
