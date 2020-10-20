export async function fetch(contentIDs: string[]): Promise<[string, any][]> {
  return contentIDs.map(contentID => [contentID, { todo: 'Implement me' }])
}
