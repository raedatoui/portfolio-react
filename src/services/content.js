// @flow

import * as Types from "@src/types";

export async function getProjects(
  contentPath: string
): Promise<Types.ProjectMap> {
  const resp = await fetch(contentPath);
  return await resp.json();
}

export async function getSections(): Promise<Types.SectionMap> {
  const resp = await fetch("/content/sections.json");
  return await resp.json();
}

export async function getList(contentPath: string): Promise<Types.List> {
  const resp = await fetch(contentPath);
  return await resp.json();
}
