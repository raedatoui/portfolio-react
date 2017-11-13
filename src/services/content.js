// @flow

import * as Types from "@src/types";

export async function getWork(contentPath: string): Promise<Types.Work> {
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

export async function getHeader(
  contentPath: string
): Promise<{ nets: Types.List, viewsource: string }> {
  const resp = await fetch(contentPath);
  return await resp.json();
}

export async function getBio(contentPath: string): Promise<Types.Bio> {
  const resp = await fetch(contentPath);
  return await resp.json();
}
